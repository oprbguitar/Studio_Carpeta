"use strict";

const DEFAULT_ALLOWED_MODELS = [
  "openrouter/free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "qwen/qwen3-coder:free",
  "qwen/qwen3.6-plus-preview:free"
];

const SOURCE_CATALOG = [
  { label: "Diario Oficial El Peruano", url: "https://elperuano.pe/" },
  { label: "SPIJ / MINJUSDH", url: "https://spij.minjus.gob.pe/" },
  { label: "Tribunal Constitucional del Perú", url: "https://www.tc.gob.pe/jurisprudencia/" },
  { label: "Poder Judicial - Jurisprudencia Sistematizada", url: "https://jurisprudencia.pj.gob.pe/" },
  { label: "Congreso de la República - leyes", url: "https://www.congreso.gob.pe/leyes/" },
  { label: "MEF - presupuesto y finanzas públicas", url: "https://www.mef.gob.pe/" },
  { label: "OSCE - contrataciones públicas", url: "https://www.gob.pe/osce" },
  { label: "SERVIR - servicio civil y empleo público", url: "https://www.gob.pe/servir" },
  { label: "SUNAT - tributario y aduanero", url: "https://www.sunat.gob.pe/" },
  { label: "INDECOPI - consumidor, competencia y propiedad intelectual", url: "https://www.gob.pe/indecopi" }
];

const MODE_DEFINITIONS = {
  default_orchestrated_analysis: {
    label: "Análisis inicial orquestado",
    maxTokens: 1300,
    instruction: `Ejecuta internamente estos roles en UNA sola respuesta:
1. Document Classifier: clasifica el texto como legal_case, administrative_document, legal_reference, general_document o unreadable_or_insufficient.
2. Document Analyst: extrae contenido clave, finalidad, hechos, partes, fechas, riesgos y vacíos según corresponda.
3. Peruvian Legal Contrast Agent: sugiere áreas o normas peruanas posibles SOLO como "referencia a verificar"; no inventes citas exactas si no están respaldadas por el documento.
4. Output Composer: escribe para usuarios no técnicos, con español formal, simple y legible.

Devuelve SOLO JSON válido con esta forma:
{
  "classification": "",
  "classificationLabel": "",
  "analysis": "",
  "shouldBuildCanvas": false,
  "canvas": null,
  "sourceSuggestions": [],
  "limitations": []
}

Si classification es legal_case, incluye un canvas simple dentro de "canvas" con:
{
  "keyFacts": [],
  "parties": [],
  "centralProblem": "",
  "evidence": [],
  "risks": [],
  "workingTheory": "",
  "nextStep": ""
}

Si NO es legal_case, "shouldBuildCanvas" debe ser false y "canvas" debe ser null.

Estructuras por clasificación:
legal_case:
1. Tipo de documento detectado
2. Resumen claro
3. Hechos relevantes
4. Personas, entidades o partes mencionadas
5. Problema jurídico o controversia
6. Evidencias o documentos relevantes
7. Riesgos, contradicciones o vacíos
8. Normas peruanas posiblemente relacionadas, cada una marcada como "referencia a verificar"
9. Próximos pasos sugeridos
10. Limitaciones del análisis

administrative_document:
1. Tipo de documento detectado
2. Resumen administrativo
3. Finalidad probable del documento
4. Puntos importantes
5. Riesgos documentales, presupuestales, procedimentales o de gestión
6. Normas peruanas posiblemente relacionadas, cada una marcada como "referencia a verificar"
7. Qué podría hacerse primero
8. Qué información falta
9. Limitaciones del análisis

legal_reference:
1. Tipo de texto detectado
2. Resumen normativo o jurídico
3. Temas regulados
4. Ámbito posible de aplicación
5. Relación con normativa peruana, marcada como "referencia a verificar"
6. Riesgos de interpretación
7. Preguntas útiles para aplicar el texto a un caso concreto
8. Limitaciones del análisis

general_document:
1. Tipo de documento detectado
2. Resumen simple
3. Ideas principales
4. Puntos que podrían tener relevancia legal o administrativa
5. Recomendación básica
6. Limitaciones

unreadable_or_insufficient:
analysis debe empezar con "No se pudo extraer contenido suficiente para un análisis confiable." y sugerir PDF con texto seleccionable, DOCX/TXT, copiar contenido principal o reducir archivo.`
  },
  extract_facts: {
    label: "Extraer hechos",
    maxTokens: 800,
    instruction: "Extrae hechos, eventos, fechas y actuaciones en orden lógico o cronológico. Separa lo que el documento dice de lo que se infiere. Devuelve JSON con analysis."
  },
  detect_risks: {
    label: "Detectar riesgos",
    maxTokens: 850,
    instruction: "Detecta riesgos, contradicciones, vacíos, información faltante y puntos débiles documentales, administrativos o legales. Devuelve JSON con analysis."
  },
  build_case_canvas: {
    label: "Crear teoría del caso",
    maxTokens: 900,
    instruction: `Construye o actualiza un canvas simple de teoría del caso. Devuelve SOLO JSON válido con:
{
  "classification": "legal_case",
  "classificationLabel": "Este documento parece un caso.",
  "analysis": "",
  "shouldBuildCanvas": true,
  "canvas": {
    "keyFacts": [],
    "parties": [],
    "centralProblem": "",
    "evidence": [],
    "risks": [],
    "workingTheory": "",
    "nextStep": ""
  },
  "sourceSuggestions": [],
  "limitations": []
}`
  },
  source_verification_suggestions: {
    label: "Fuentes para verificar",
    maxTokens: 700,
    instruction: "Sugiere fuentes oficiales donde verificar normas o criterios. No digas que algo ya fue verificado. Devuelve JSON con sourceSuggestions y analysis breve."
  },
  export_summary: {
    label: "Resumen exportable",
    maxTokens: 750,
    instruction: "Genera un resumen breve y formal del análisis actual. Devuelve JSON con analysis."
  }
};

const SYSTEM_PROMPT = `Eres un asistente peruano legal, fiscal, administrativo y documental para usuarios no técnicos.
Usa español formal, claro y simple.
Analiza solo información proporcionada por el usuario o extraída del documento.
No inventes leyes, jurisprudencia, plazos, instituciones, números de caso, fechas, nombres ni hechos.
Separa siempre:
A. Lo que el documento dice
B. Lo que puede inferirse
C. Lo que debe verificarse
Usa expresiones prudentes: "Podría estar relacionado con...", "Debe verificarse en fuente oficial...", "No se advierte en el documento...", "Con la información disponible...".
No digas "aplica la norma X" salvo que el documento lo sustente claramente o la fuente haya sido verificada.
Toda norma sugerida debe marcarse como "referencia a verificar".
Si mencionas estándares internacionales, di: "Solo como referencia internacional a verificar, no como norma peruana aplicable directamente."
No brindes asesoría legal definitiva. Brinda orientación documental, procedimental y analítica.`;

function isFreeModel(model) {
  return model === "openrouter/free" || model.endsWith(":free");
}

function parseAllowedModels() {
  const configured = (process.env.AI_ALLOWED_MODELS || "").split(",").map(model => model.trim()).filter(Boolean);
  const models = configured.length ? configured : DEFAULT_ALLOWED_MODELS;
  return models.filter(isFreeModel);
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
  const message = typeof upstreamError?.message === "string" ? upstreamError.message.toLowerCase() : "";
  if (status === 402 || status === 429 || message.includes("quota") || message.includes("rate limit")) {
    return { statusCode: 429, code: "quota_exceeded", message: "La cuota del servicio gratuito fue excedida o no esta disponible temporalmente." };
  }
  if (status === 503 || status === 504 || message.includes("unavailable") || message.includes("overloaded")) {
    return { statusCode: 503, code: "provider_unavailable", message: "El servicio de IA no esta disponible en este momento. Intenta nuevamente en unos minutos." };
  }
  return { statusCode: 502, code: "provider_error", message: "El servicio de IA no pudo completar la solicitud." };
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks.map(chunk => Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))).toString("utf8"));
}

function parseProviderJson(answer) {
  const clean = String(answer || "").trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  try {
    const parsed = JSON.parse(clean);
    if (parsed && typeof parsed === "object") return parsed;
  } catch (error) {
    return null;
  }
  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendError(res, 405, "method_not_allowed", "Usa POST para consultar el análisis.");
  }

  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) return sendError(res, 500, "missing_api_key", "Falta configurar AI_API_KEY en Vercel.");

  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    return sendError(res, 400, "invalid_json", "El cuerpo de la solicitud no es JSON valido.");
  }

  const mode = typeof body.mode === "string" && body.mode.trim() ? body.mode.trim() : "default_orchestrated_analysis";
  const modeDefinition = MODE_DEFINITIONS[mode];
  if (!modeDefinition) return sendError(res, 400, "unsupported_mode", "Modo de análisis no compatible.");

  const allowedModels = parseAllowedModels();
  const defaultModel = process.env.AI_MODEL_DEFAULT || "openrouter/free";
  const requestedModel = allowedModels.includes(defaultModel) ? defaultModel : allowedModels[0] || "openrouter/free";
  if (!isFreeModel(requestedModel)) return sendError(res, 400, "invalid_model", "Solo se permiten modelos gratuitos.");

  const question = typeof body.question === "string" ? body.question.trim().slice(0, 2000) : "";
  const extractedDocumentText = typeof body.extractedDocumentText === "string" ? body.extractedDocumentText.trim().slice(0, 25000) : "";
  const currentAnalysis = body.currentAnalysis && typeof body.currentAnalysis === "object" ? JSON.stringify(body.currentAnalysis).slice(0, 6000) : "";
  const currentCanvas = body.currentCanvas && typeof body.currentCanvas === "object" ? JSON.stringify(body.currentCanvas).slice(0, 4000) : "";

  if (!question && !extractedDocumentText && !currentAnalysis && !currentCanvas) {
    return sendError(res, 400, "empty_question", "Agrega un documento o una pregunta para iniciar el análisis.");
  }

  const userContent = [
    `Modo interno: ${modeDefinition.label}`,
    `Instrucción:\n${modeDefinition.instruction}`,
    `Catalogo de fuentes oficiales disponibles para sugerir, no para afirmar verificación:\n${JSON.stringify(SOURCE_CATALOG)}`,
    extractedDocumentText ? `Texto extraído del documento:\n${extractedDocumentText}` : "",
    question ? `Pregunta opcional del usuario:\n${question}` : "",
    currentAnalysis ? `Análisis actual:\n${currentAnalysis}` : "",
    currentCanvas ? `Canvas actual:\n${currentCanvas}` : ""
  ].filter(Boolean).join("\n\n");

  const baseUrl = process.env.AI_BASE_URL || "https://openrouter.ai/api/v1";
  const configuredMax = Number.parseInt(process.env.AI_MAX_TOKENS || "", 10);
  const maxTokens = Number.isFinite(configuredMax) && configuredMax > 0
    ? Math.min(configuredMax, modeDefinition.maxTokens)
    : modeDefinition.maxTokens;

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
        temperature: 0.15,
        max_tokens: maxTokens
      })
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      const mapped = pickError(upstream.status, data.error);
      return sendError(res, mapped.statusCode, mapped.code, mapped.message);
    }

    const answer = data?.choices?.[0]?.message?.content?.trim();
    if (!answer) return sendError(res, 502, "empty_provider_response", "El servicio de IA respondio sin contenido util.");

    const parsed = parseProviderJson(answer);
    const payload = parsed && typeof parsed === "object"
      ? parsed
      : {
          classification: "general_document",
          classificationLabel: "Este documento no parece requerir teoría del caso.",
          analysis: answer,
          shouldBuildCanvas: false,
          canvas: null,
          sourceSuggestions: SOURCE_CATALOG,
          limitations: ["La respuesta no llegó en JSON estructurado."]
        };

    return sendJson(res, 200, {
      ...payload,
      sourceSuggestions: Array.isArray(payload.sourceSuggestions) && payload.sourceSuggestions.length ? payload.sourceSuggestions : SOURCE_CATALOG,
      answer
    });
  } catch (error) {
    return sendError(res, 503, "provider_unavailable", "No se pudo conectar con el servicio de IA en este momento.");
  }
};
