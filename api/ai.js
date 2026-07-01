"use strict";

const DEFAULT_ALLOWED_MODELS = [
  "openrouter/free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "qwen/qwen3-coder:free",
  "qwen/qwen3.6-plus-preview:free"
];

const SYSTEM_PROMPT = `Eres un asistente peruano de análisis legal, fiscal y documental.
Trabajas con derecho peruano, investigación fiscal, expedientes, documentos y estrategia probatoria.
No inventes leyes, jurisprudencia, fechas, instituciones, hechos ni contenido documental.
Si falta información o no puedes verificar algo con el contexto entregado, dilo claramente.
No des por existente ningun documento, prueba, norma, sentencia o dato que no este en la consulta o en el contexto.
Responde siempre en español claro y profesional, con esta estructura exacta:
1. Resumen ejecutivo
2. Contenido relevante del documento
3. Análisis jurídico/documental
4. Riesgos, contradicciones o vacíos
5. Próxima acción recomendada
6. Limitaciones del análisis`;

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

  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) {
    return sendError(res, 400, "empty_question", "Escribe una pregunta para iniciar el analisis.");
  }

  const allowedModels = parseAllowedModels();
  const defaultModel = process.env.AI_MODEL_DEFAULT || "openrouter/free";
  const clientModel = typeof body.model === "string" ? body.model.trim() : "";

  if (clientModel && (!isFreeModel(clientModel) || !allowedModels.includes(clientModel))) {
    return sendError(res, 400, "invalid_model", "Modelo no permitido. Solo se aceptan openrouter/free o modelos que terminan en :free.");
  }

  const requestedModel = allowedModels.includes(defaultModel) ? defaultModel : allowedModels[0] || "openrouter/free";

  const baseUrl = process.env.AI_BASE_URL || "https://openrouter.ai/api/v1";
  const maxTokens = Number.parseInt(process.env.AI_MAX_TOKENS || "900", 10);
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

  const userContent = [
    context ? `Contexto disponible:\n${context}` : "",
    caseData ? `Datos del caso:\n${caseData}` : "",
    notes ? `Notas disponibles:\n- ${notes}` : "",
    extractedDocumentText ? `Texto extraído del documento temporal:\n${extractedDocumentText}` : "No se adjuntó texto documental legible en esta consulta.",
    `Pregunta:\n${question}`
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
        max_tokens: Number.isFinite(maxTokens) && maxTokens > 0 ? maxTokens : 900
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
