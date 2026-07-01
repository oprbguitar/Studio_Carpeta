"use strict";

const DEFAULT_ALLOWED_MODELS = [
  "openrouter/free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "qwen/qwen3-coder:free",
  "qwen/qwen3.6-plus-preview:free"
];

const MODE_DEFINITIONS = {
  default_document_analysis: {
    label: "Análisis automático",
    instruction: `Analiza el documento cargado de forma general. Responde con esta estructura exacta:
1. Resumen ejecutivo
2. Hechos relevantes
3. Sujetos o partes mencionadas
4. Problema jurídico/documental
5. Evidencias o documentos relevantes
6. Riesgos, contradicciones o vacíos
7. Próxima acción recomendada
8. Limitaciones del análisis`
  },
  case_theory_canvas: {
    label: "Generar teoría del caso",
    instruction: `Construye un Canvas de teoría del caso a partir del documento. Devuelve SOLO JSON válido, sin markdown, con esta forma:
{
  "caseTitle": "",
  "summary": "",
  "facts": [],
  "subjects": [],
  "timeline": [],
  "mainTheory": "",
  "alternativeTheory": "",
  "evidence": [],
  "elementsToProve": [],
  "risks": [],
  "missingInformation": [],
  "nextActions": [],
  "followUpQuestions": []
}`
  },
  extract_facts: {
    label: "Extraer hechos",
    instruction: "Extrae hechos y eventos relevantes en orden cronológico cuando sea posible. Distingue contenido del documento de inferencias."
  },
  extract_evidence: {
    label: "Extraer evidencias",
    instruction: "Identifica evidencias, documentos, declaraciones, fechas, referencias y soportes mencionados en el texto."
  },
  find_risks: {
    label: "Detectar riesgos",
    instruction: "Detecta contradicciones, vacíos, información faltante, debilidades documentales y riesgos procesales o probatorios."
  },
  next_actions: {
    label: "Próximas acciones",
    instruction: "Propón siguientes acciones documentales, procesales o investigativas. Marca como referencia a verificar cualquier consecuencia legal incierta."
  },
  executive_summary: {
    label: "Resumen ejecutivo",
    instruction: "Genera un resumen ejecutivo formal, breve y claro, apto para revisión fiscal o documental."
  }
};

const SYSTEM_PROMPT = `Eres un asistente peruano de análisis legal, fiscal y documental.
Trabajas solo con información aportada por el usuario o extraída del documento cargado.
No inventes leyes, jurisprudencia, fechas, instituciones, hechos ni contenido documental.
Debes distinguir contenido documental de interpretación.
Si una norma, plazo o consecuencia legal es incierta, etiquétala como "referencia a verificar".
Si falta información, indica qué falta.
Si el documento no menciona algo, di que no fue encontrado en el texto cargado.
No brindes asesoría legal definitiva; brinda apoyo documental, procesal y analítico.`;

function parseAllowedModels() {
  const configured = (process.env.AI_ALLOWED_MODELS || "")
    .split(",")
    .map(model => model.trim())
    .filter(Boolean);
  const models = configured.length ? configured : DEFAULT_ALLOWED_MODELS;
  return models.filter(isFreeModel);
}

function isFreeModel(model) {
  return model === "openrouter/free" || model.endsWith(":free");
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function sendError(res, statusCode, code, message) {
  sendJson(res, statusCode, { error: { code, message } });
}

function pickError(status, upstreamError) {
  const rawMessage = typeof upstreamError?.message === "string" ? upstreamError.message : "";
  const lowerMessage = rawMessage.toLowerCase();

  if (status === 402 || status === 429 || lowerMessage.includes("quota") || lowerMessage.includes("rate limit")) {
    return {
      statusCode: 429,
      code: "quota_exceeded",
      message: "La cuota del proveedor fue excedida o el modelo gratuito no esta disponible temporalmente."
    };
  }

  if (status === 503 || status === 504 || lowerMessage.includes("unavailable") || lowerMessage.includes("overloaded")) {
    return {
      statusCode: 503,
      code: "provider_unavailable",
      message: "El proveedor de IA no esta disponible en este momento. Intenta nuevamente en unos minutos."
    };
  }

  return {
    statusCode: 502,
    code: "provider_error",
    message: "El proveedor de IA no pudo completar la solicitud."
  };
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks.map(chunk => Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))).toString("utf8"));
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendError(res, 405, "method_not_allowed", "Usa POST para consultar la IA.");
  }

  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    return sendError(res, 500, "missing_api_key", "Falta configurar AI_API_KEY en Vercel.");
  }

  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    return sendError(res, 400, "invalid_json", "El cuerpo de la solicitud no es JSON valido.");
  }

  const mode = typeof body.mode === "string" && body.mode.trim() ? body.mode.trim() : "default_document_analysis";
  const modeDefinition = MODE_DEFINITIONS[mode];
  if (!modeDefinition) {
    return sendError(res, 400, "unsupported_mode", "Modo de análisis no compatible.");
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";

  const allowedModels = parseAllowedModels();
  const defaultModel = process.env.AI_MODEL_DEFAULT || "openrouter/free";
  const clientModel = typeof body.model === "string" ? body.model.trim() : "";

  if (clientModel && (!isFreeModel(clientModel) || !allowedModels.includes(clientModel))) {
    return sendError(res, 400, "invalid_model", "Modelo no permitido. Solo se aceptan openrouter/free o modelos que terminan en :free.");
  }

  const requestedModel = allowedModels.includes(defaultModel) ? defaultModel : allowedModels[0] || "openrouter/free";

  const baseUrl = process.env.AI_BASE_URL || "https://openrouter.ai/api/v1";
  const maxTokens = Number.parseInt(process.env.AI_MAX_TOKENS || "1200", 10);
  const context = typeof body.context === "string" ? body.context.trim().slice(0, 4000) : "";
  const extractedDocumentText = typeof body.extractedDocumentText === "string"
    ? body.extractedDocumentText.trim().slice(0, 20000)
    : "";
  const caseData = body.caseData && typeof body.caseData === "object"
    ? JSON.stringify(body.caseData).slice(0, 3000)
    : "";
  const notes = Array.isArray(body.notes)
    ? body.notes.filter(note => typeof note === "string" && note.trim()).slice(0, 20).join("\n- ").slice(0, 3000)
    : "";
  const currentCanvas = body.currentCanvas && typeof body.currentCanvas === "object"
    ? JSON.stringify(body.currentCanvas).slice(0, 6000)
    : "";
  const caseId = typeof body.caseId === "string" ? body.caseId.trim().slice(0, 160) : "";

  if (!question && !extractedDocumentText && !currentCanvas) {
    return sendError(res, 400, "empty_question", "Agrega un documento o una pregunta para iniciar el análisis.");
  }

  const userContent = [
    `Modo solicitado: ${modeDefinition.label}`,
    `Instrucción interna:\n${modeDefinition.instruction}`,
    caseId ? `Caso/asunto:\n${caseId}` : "",
    context ? `Contexto disponible:\n${context}` : "",
    caseData ? `Datos del caso:\n${caseData}` : "",
    notes ? `Notas disponibles:\n- ${notes}` : "",
    currentCanvas ? `Canvas actual editable:\n${currentCanvas}` : "",
    extractedDocumentText ? `Texto extraído del documento temporal:\n${extractedDocumentText}` : "No se adjuntó texto documental legible en esta consulta.",
    question ? `Pregunta adicional del usuario:\n${question}` : ""
  ].filter(Boolean).join("\n\n");

  try {
    const upstream = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://studio-carpeta.vercel.app/",
        "X-Title": "Studio Carpeta"
      },
      body: JSON.stringify({
        model: requestedModel,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent }
        ],
        temperature: 0.2,
        max_tokens: Number.isFinite(maxTokens) && maxTokens > 0 ? maxTokens : 1200
      })
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      const mapped = pickError(upstream.status, data.error);
      return sendError(res, mapped.statusCode, mapped.code, mapped.message);
    }

    const answer = data?.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      return sendError(res, 502, "empty_provider_response", "El proveedor de IA respondio sin contenido util.");
    }

    return sendJson(res, 200, {
      answer,
      model: requestedModel,
      usage: data.usage || null
    });
  } catch (error) {
    return sendError(res, 503, "provider_unavailable", "No se pudo conectar con el proveedor de IA en este momento.");
  }
};
