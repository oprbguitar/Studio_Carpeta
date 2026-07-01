"use strict";

const STORAGE_KEY = "studioCarpeta.savedAnalyses.v2";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_EXTRACTED_TEXT = 25000;
const SUPPORTED_EXTENSIONS = ["pdf", "docx", "txt", "csv"];

const CLASS_LABELS = {
  legal_case: "Este documento parece un caso.",
  administrative_document: "Este documento parece administrativo.",
  legal_reference: "Este documento parece normativo o de referencia legal.",
  general_document: "Este documento no parece requerir teoría del caso.",
  unreadable_or_insufficient: "No se encontró texto suficiente para analizar."
};

const SOURCE_FALLBACK = [
  { label: "Diario Oficial El Peruano", url: "https://elperuano.pe/" },
  { label: "SPIJ / MINJUSDH", url: "https://spij.minjus.gob.pe/" },
  { label: "Tribunal Constitucional del Perú", url: "https://www.tc.gob.pe/jurisprudencia/" },
  { label: "Poder Judicial - Jurisprudencia Sistematizada", url: "https://jurisprudencia.pj.gob.pe/" },
  { label: "Congreso de la República - leyes", url: "https://www.congreso.gob.pe/leyes/" },
  { label: "MEF", url: "https://www.mef.gob.pe/" },
  { label: "OSCE", url: "https://www.gob.pe/osce" },
  { label: "SERVIR", url: "https://www.gob.pe/servir" },
  { label: "SUNAT", url: "https://www.sunat.gob.pe/" },
  { label: "INDECOPI", url: "https://www.gob.pe/indecopi" }
];

const appState = {
  fileName: "",
  temporaryText: "",
  textWasTruncated: false,
  question: "",
  status: "",
  error: "",
  isBusy: false,
  result: null,
  canvas: null,
  sourceSuggestions: [],
  savedAnalyses: [],
  activeSavedId: "",
  notes: "",
  aiConnectionWarning: ""
};

function $(selector) {
  return document.querySelector(selector);
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function normalizeText(text) {
  return String(text || "").replace(/\u0000/g, "").replace(/[ \t]+\n/g, "\n").replace(/\n{4,}/g, "\n\n").trim();
}

function getExtension(file) {
  return file.name.split(".").pop().toLowerCase();
}

function loadSavedAnalyses() {
  localStorage.removeItem("bibliotecaFiscalInteligente.v1");
  localStorage.removeItem("bibliotecaFiscalInteligente.savedCases.v1");
  localStorage.removeItem("bibliotecaFiscalInteligente.aiModel");
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    appState.savedAnalyses = Array.isArray(saved) ? saved : [];
  } catch (error) {
    appState.savedAnalyses = [];
  }
}

function persistSavedAnalyses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.savedAnalyses));
}

function showToast(message, type = "") {
  const region = $("#toasts");
  if (!region) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  region.append(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function setStatus(status) {
  appState.status = status;
  renderApp();
}

function clearFileInput() {
  const input = $("#file-input");
  if (input) input.value = "";
}

async function loadPdfLib() {
  if (window.pdfjsLib) return window.pdfjsLib;
  const lib = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs");
  window.pdfjsLib = lib;
  return lib;
}

async function loadMammoth() {
  if (window.mammoth) return window.mammoth;
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/mammoth@1.8.0/mammoth.browser.min.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("No se pudo cargar el lector DOCX de la demo."));
    document.head.append(script);
  });
  return window.mammoth;
}

async function extractPdfText(file) {
  const pdfjsLib = await loadPdfLib();
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";
  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map(item => item.str || "").join(" "));
  }
  const text = normalizeText(pages.join("\n\n"));
  if (text.length < 25) throw new Error("El PDF parece escaneado o sin texto seleccionable. Esta demo aún no incluye OCR.");
  return text;
}

async function extractDocxText(file) {
  const mammoth = await loadMammoth();
  const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return normalizeText(result.value || "");
}

async function extractText(file) {
  const extension = getExtension(file);
  if (!SUPPORTED_EXTENSIONS.includes(extension)) throw new Error("Sube un archivo PDF, DOCX, TXT o CSV.");
  if (file.size > MAX_FILE_SIZE) throw new Error("El archivo supera el límite de 10 MB para esta demo.");
  if (extension === "txt" || extension === "csv") return normalizeText(await file.text());
  if (extension === "pdf") return extractPdfText(file);
  if (extension === "docx") return extractDocxText(file);
  return "";
}

function truncateForDemo(text) {
  if (text.length <= MAX_EXTRACTED_TEXT) return { text, truncated: false };
  return { text: text.slice(0, MAX_EXTRACTED_TEXT), truncated: true };
}

async function askAI(mode, extra = {}) {
  let response;
  try {
    response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode,
        question: appState.question,
        extractedDocumentText: appState.temporaryText,
        currentAnalysis: appState.result,
        currentCanvas: appState.canvas,
        ...extra
      })
    });
  } catch (error) {
    const networkError = new Error("La interfaz está activa, pero la conexión IA no respondió en este momento. Intenta nuevamente en unos minutos.");
    networkError.code = "network_error";
    throw networkError;
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(formatAIError(data?.error));
    error.code = data?.error?.code || "ai_request_failed";
    throw error;
  }
  appState.aiConnectionWarning = "";
  return normalizeAIResponse(data);
}

function formatAIError(error) {
  if (error?.code === "missing_api_key") {
    return "La interfaz está activa, pero falta configurar la conexión IA en Vercel.";
  }
  if (error?.code === "provider_unavailable" || error?.code === "provider_error" || error?.code === "quota_exceeded") {
    return "La interfaz está activa, pero la conexión IA no respondió en este momento. Intenta nuevamente en unos minutos.";
  }
  return error?.message || "No se pudo completar el análisis.";
}

function parseJsonLike(value) {
  if (!value) return null;
  if (typeof value === "object") return value;
  const clean = String(value).trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  try {
    return JSON.parse(clean);
  } catch (error) {
    return null;
  }
}

function normalizeCanvas(canvas) {
  if (!canvas || typeof canvas !== "object") return null;
  return {
    keyFacts: toLines(canvas.keyFacts || canvas.hechosClave || canvas.facts),
    parties: toLines(canvas.parties || canvas.sujetosPartes || canvas.subjects),
    centralProblem: toText(canvas.centralProblem || canvas.problemaCentral),
    evidence: toLines(canvas.evidence || canvas.evidenciasMencionadas),
    risks: toLines(canvas.risks || canvas.riesgosVacios),
    workingTheory: toText(canvas.workingTheory || canvas.hipotesisTrabajo),
    nextStep: toText(canvas.nextStep || canvas.proximoPaso)
  };
}

function normalizeAIResponse(data) {
  const parsed = parseJsonLike(data.answer) || data;
  const classification = parsed.classification || "general_document";
  const classificationLabel = parsed.classificationLabel || CLASS_LABELS[classification] || CLASS_LABELS.general_document;
  const analysis = parsed.analysis || data.answer || "";
  const canvas = normalizeCanvas(parsed.canvas);
  return {
    classification,
    classificationLabel,
    analysis,
    shouldBuildCanvas: Boolean(parsed.shouldBuildCanvas || canvas),
    canvas,
    sourceSuggestions: normalizeSources(parsed.sourceSuggestions),
    limitations: Array.isArray(parsed.limitations) ? parsed.limitations.map(String) : []
  };
}

function toText(value) {
  if (Array.isArray(value)) return value.map(String).join("\n");
  return String(value || "").trim();
}

function toLines(value) {
  if (Array.isArray(value)) return value.map(item => typeof item === "string" ? item : JSON.stringify(item)).filter(Boolean);
  return String(value || "").split(/\n+/).map(line => line.replace(/^[-*]\s*/, "").trim()).filter(Boolean);
}

function normalizeSources(value) {
  const items = Array.isArray(value) && value.length ? value : (window.STUDIO_LEGAL_SOURCES || SOURCE_FALLBACK);
  return items.map(item => {
    if (typeof item === "string") return { label: item, url: "" };
    return { label: item.label || item.name || "Fuente oficial", url: item.url || "" };
  }).slice(0, 10);
}

async function handleFile(files) {
  const file = Array.from(files || [])[0];
  if (!file || appState.isBusy) return;
  resetCurrent({ keepSaved: true });
  appState.fileName = file.name;
  appState.isBusy = true;
  appState.error = "";
  setStatus("Leyendo documento...");
  try {
    const extracted = normalizeText(await extractText(file));
    if (extracted.length < 25) {
      throw new Error("No se pudo extraer contenido suficiente para un análisis confiable.");
    }
    const truncated = truncateForDemo(extracted);
    appState.temporaryText = truncated.text;
    appState.textWasTruncated = truncated.truncated;
    setStatus("Clasificando contenido...");
    await new Promise(resolve => window.setTimeout(resolve, 180));
    setStatus("Generando análisis...");
    const result = await askAI("default_orchestrated_analysis");
    appState.result = result;
    appState.canvas = result.shouldBuildCanvas ? result.canvas : null;
    appState.sourceSuggestions = result.sourceSuggestions;
    appState.isBusy = false;
    appState.status = "";
    clearFileInput();
    renderApp();
  } catch (error) {
    appState.isBusy = false;
    appState.status = "";
    appState.error = error.message || "No se pudo leer el documento.";
    if (error.code) appState.aiConnectionWarning = appState.error;
    clearFileInput();
    renderApp();
    showToast(appState.error, "warn");
  }
}

async function runFocused(mode) {
  if (appState.isBusy) return;
  if (!appState.temporaryText && !appState.result) return showToast("Primero sube y analiza un documento.", "warn");
  appState.isBusy = true;
  appState.error = "";
  setStatus(mode === "source_verification_suggestions" ? "Preparando fuentes para verificar..." : "Generando análisis...");
  try {
    const result = await askAI(mode);
    if (mode === "build_case_canvas") {
      appState.canvas = result.canvas || normalizeCanvas(parseJsonLike(result.analysis));
      appState.result = { ...appState.result, shouldBuildCanvas: Boolean(appState.canvas) };
    } else if (mode === "source_verification_suggestions") {
      appState.sourceSuggestions = result.sourceSuggestions.length ? result.sourceSuggestions : normalizeSources();
    } else {
      appState.result = { ...appState.result, analysis: result.analysis || appState.result?.analysis || "", sourceSuggestions: appState.sourceSuggestions };
    }
    appState.isBusy = false;
    appState.status = "";
    renderApp();
  } catch (error) {
    appState.isBusy = false;
    appState.status = "";
    appState.error = error.message || "No se pudo completar la acción.";
    if (error.code) appState.aiConnectionWarning = appState.error;
    renderApp();
  }
}

function resetCurrent({ keepSaved = true } = {}) {
  appState.fileName = "";
  appState.temporaryText = "";
  appState.textWasTruncated = false;
  appState.question = "";
  appState.status = "";
  appState.error = "";
  appState.isBusy = false;
  appState.result = null;
  appState.canvas = null;
  appState.sourceSuggestions = [];
  appState.notes = "";
  appState.activeSavedId = "";
  appState.aiConnectionWarning = "";
  if (!keepSaved) appState.savedAnalyses = [];
}

function saveAnalysis() {
  if (!appState.result) return showToast("No hay análisis para guardar.", "warn");
  const item = {
    id: appState.activeSavedId || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    classification: appState.result.classification,
    classificationLabel: appState.result.classificationLabel,
    analysis: appState.result.analysis,
    canvas: appState.canvas,
    filename: appState.fileName,
    timestamp: new Date().toLocaleString("es-PE"),
    notes: appState.notes
  };
  appState.savedAnalyses = [item, ...appState.savedAnalyses.filter(saved => saved.id !== item.id)].slice(0, 20);
  appState.activeSavedId = item.id;
  persistSavedAnalyses();
  renderApp();
  showToast("Análisis guardado en este navegador.", "success");
}

function loadAnalysis(id) {
  const item = appState.savedAnalyses.find(saved => saved.id === id);
  if (!item) return;
  resetCurrent({ keepSaved: true });
  appState.activeSavedId = item.id;
  appState.fileName = item.filename || "";
  appState.notes = item.notes || "";
  appState.result = {
    classification: item.classification || "general_document",
    classificationLabel: item.classificationLabel || CLASS_LABELS.general_document,
    analysis: item.analysis || "",
    shouldBuildCanvas: Boolean(item.canvas),
    canvas: item.canvas || null,
    sourceSuggestions: normalizeSources(),
    limitations: []
  };
  appState.canvas = item.canvas || null;
  appState.sourceSuggestions = normalizeSources();
  renderApp();
}

function deleteActiveSaved() {
  if (!appState.activeSavedId) return showToast("Selecciona un análisis guardado primero.", "warn");
  appState.savedAnalyses = appState.savedAnalyses.filter(item => item.id !== appState.activeSavedId);
  appState.activeSavedId = "";
  persistSavedAnalyses();
  renderApp();
}

function exportAnalysis() {
  if (!appState.result) return showToast("No hay análisis para exportar.", "warn");
  const payload = {
    classification: appState.result.classification,
    classificationLabel: appState.result.classificationLabel,
    analysis: appState.result.analysis,
    canvas: appState.canvas,
    filename: appState.fileName,
    timestamp: new Date().toISOString(),
    notes: appState.notes
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "studio-carpeta-analisis.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

function exportTextReport() {
  if (!appState.result) return showToast("No hay análisis para exportar.", "warn");
  const sections = [
    "STUDIO CARPETA - INFORME DOCUMENTAL",
    "",
    `Archivo: ${appState.fileName || "Sin nombre registrado"}`,
    `Clasificación: ${appState.result.classificationLabel}`,
    `Fecha: ${new Date().toLocaleString("es-PE")}`,
    "",
    "RESULTADO DEL ANÁLISIS",
    appState.result.analysis || "",
    "",
    appState.canvas ? "CANVAS SIMPLE DE TEORÍA DEL CASO" : "",
    appState.canvas ? canvasToText(appState.canvas) : "",
    "",
    "FUENTES OFICIALES DONDE VERIFICAR",
    normalizeSources(appState.sourceSuggestions).map(source => `- ${source.label}${source.url ? `: ${source.url}` : ""}`).join("\n"),
    "",
    "LIMITACIONES",
    "La IA no reemplaza criterio legal. Las fuentes sugeridas deben verificarse oficialmente."
  ].filter(section => section !== "").join("\n");
  const blob = new Blob([sections], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "studio-carpeta-informe.txt";
  link.click();
  URL.revokeObjectURL(link.href);
}

function canvasToText(canvas) {
  const rows = [
    ["Hechos clave", canvas.keyFacts],
    ["Sujetos/partes", canvas.parties],
    ["Problema central", canvas.centralProblem],
    ["Evidencias mencionadas", canvas.evidence],
    ["Riesgos o vacíos", canvas.risks],
    ["Hipótesis de trabajo", canvas.workingTheory],
    ["Próximo paso", canvas.nextStep]
  ];
  return rows.map(([label, value]) => `${label}:\n${Array.isArray(value) ? value.join("\n") : value || "Sin información"}`).join("\n\n");
}

async function copyResult() {
  if (!appState.result?.analysis) return showToast("No hay resultado para copiar.", "warn");
  try {
    await navigator.clipboard.writeText(appState.result.analysis);
    showToast("Resultado copiado.", "success");
  } catch (error) {
    showToast("No se pudo copiar automáticamente.", "warn");
  }
}

function renderApp() {
  const app = $("#app");
  app.innerHTML = `<main class="app-shell">
    <section class="hero-card">
      ${renderHero()}
      ${renderProcessStrip()}
      ${renderFunctionalStatus()}
      ${renderUploader()}
      ${renderProgressOrError()}
      ${renderResult()}
      ${renderSources()}
      ${renderActions()}
      ${renderPersistence()}
    </section>
  </main>`;
}

function renderHero() {
  return `<header class="hero-layout">
    <div class="hero-copy">
      <p class="eyebrow">Asistente legal y documental</p>
      <h1>Analizador jurídico-documental</h1>
      <p>Sube un documento legal, administrativo o de referencia. La IA lo clasifica, resume y señala riesgos documentales sin reemplazar tu criterio legal.</p>
    </div>
    <div class="legal-visual" aria-hidden="true">
      <svg viewBox="0 0 420 280" role="img">
        <defs>
          <linearGradient id="folderGrad" x1="0" x2="1">
            <stop offset="0" stop-color="#edf2e8"/>
            <stop offset="1" stop-color="#fff9ef"/>
          </linearGradient>
        </defs>
        <rect x="38" y="82" width="310" height="162" rx="18" fill="url(#folderGrad)" stroke="#d7c6ad" stroke-width="2"/>
        <path d="M58 82h96l25 25h169" fill="#f8eedc" stroke="#d7c6ad" stroke-width="2"/>
        <rect x="82" y="52" width="154" height="184" rx="12" fill="#fffdf9" stroke="#dfd2bf" stroke-width="2"/>
        <line x1="108" y1="94" x2="205" y2="94" stroke="#287b82" stroke-width="5" stroke-linecap="round"/>
        <line x1="108" y1="124" x2="198" y2="124" stroke="#b9ad9d" stroke-width="4" stroke-linecap="round"/>
        <line x1="108" y1="150" x2="214" y2="150" stroke="#b9ad9d" stroke-width="4" stroke-linecap="round"/>
        <line x1="108" y1="176" x2="184" y2="176" stroke="#b9ad9d" stroke-width="4" stroke-linecap="round"/>
        <circle cx="306" cy="121" r="38" fill="#f0eaf7" stroke="#cdbbe2" stroke-width="2"/>
        <path d="M306 78v92M267 103h78M282 103l-22 45h44l-22-45M330 103l-22 45h44l-22-45" fill="none" stroke="#7658a8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="244" y="186" width="104" height="34" rx="17" fill="#287b82"/>
        <circle cx="268" cy="203" r="6" fill="#fffdf9"/>
        <circle cx="296" cy="203" r="6" fill="#fffdf9"/>
        <circle cx="324" cy="203" r="6" fill="#fffdf9"/>
      </svg>
    </div>
  </header>`;
}

function renderProcessStrip() {
  const steps = ["Subir documento", "Clasificar contenido", "Analizar riesgos", "Construir teoría/canvas si corresponde", "Guardar o exportar"];
  return `<section class="process-strip" aria-label="Flujo de trabajo">${steps.map((step, index) => `<div><span>${index + 1}</span><strong>${step}</strong></div>`).join("")}</section>`;
}

function renderFunctionalStatus() {
  const warning = appState.aiConnectionWarning || (appState.error && appState.error.includes("conexión IA") ? appState.error : "");
  const chips = [
    ["PDF text reader", true],
    ["DOCX reader", true],
    ["AI analysis", !warning],
    ["Local save", true],
    ["Official source suggestions", true]
  ];
  return `<section class="status-panel">
    <div>
      <h2>Estado funcional</h2>
      <p>Lectura local del documento, análisis asistido y guardado en este navegador.</p>
    </div>
    <div class="status-chips">${chips.map(([label, ok]) => `<span class="${ok ? "ok" : "warn"}">${escapeHTML(label)}</span>`).join("")}</div>
    ${warning ? `<p class="ai-warning">${escapeHTML(warning)}</p>` : ""}
  </section>`;
}

function renderUploader() {
  const disabled = appState.isBusy ? "disabled" : "";
  return `<section class="upload-panel" aria-labelledby="upload-title">
    <h2 id="upload-title">Subir documento</h2>
    <label class="drop-zone" id="drop-zone">
      <span class="upload-icon" aria-hidden="true">+</span>
      <strong>${appState.fileName ? escapeHTML(appState.fileName) : "Selecciona o arrastra tu archivo"}</strong>
      <small>PDF con texto seleccionable, DOCX, TXT o CSV. Máximo 10 MB.</small>
      <input id="file-input" type="file" accept=".pdf,.docx,.txt,.csv" ${disabled}>
    </label>
    <label class="question-label" for="question-input">Pregunta opcional sobre el documento</label>
    <div class="question-row">
      <input id="question-input" value="${escapeHTML(appState.question)}" placeholder="Ej.: ¿qué riesgos debo revisar primero?" ${disabled}>
      <button class="primary-btn" data-action="analyze" ${disabled || !appState.temporaryText ? "disabled" : ""}>Analizar documento</button>
    </div>
    <p class="privacy-note">Modo demo: el archivo no se almacena. Solo se guarda el análisis si presionas Guardar.</p>
    <p class="helper-note">La IA no reemplaza criterio legal; organiza, resume y señala riesgos documentales. Las fuentes sugeridas deben verificarse oficialmente.</p>
    ${appState.textWasTruncated ? `<p class="notice">El documento fue recortado para esta demo. Se analizó la parte inicial más relevante.</p>` : ""}
  </section>`;
}

function renderProgressOrError() {
  if (appState.isBusy) {
    return `<section class="state-card" aria-live="polite"><h2>${escapeHTML(appState.status || "Procesando...")}</h2><p>Esto suele tardar unos segundos.</p><div class="loading-bar"><span></span></div></section>`;
  }
  if (appState.error) {
    return `<section class="state-card error-card"><h2>No se pudo analizar</h2><p>${escapeHTML(appState.error)}</p><ul><li>Sube PDF con texto seleccionable.</li><li>Sube DOCX o TXT.</li><li>Copia y pega el contenido principal en un archivo TXT.</li><li>Reduce el archivo si es demasiado grande.</li></ul><button class="secondary-btn" data-action="clear">Limpiar e intentar de nuevo</button></section>`;
  }
  return "";
}

function renderResult() {
  if (!appState.result) {
    return `<section class="info-grid">
      <article class="empty-card"><h2>No hay caso activo.</h2><p>Sube un documento para iniciar. La app no usa casos ficticios ni números simulados.</p></article>
      <article class="capability-card"><h2>Qué puede hacer esta herramienta</h2><ul><li>Clasificar documentos.</li><li>Resumir contenido.</li><li>Detectar riesgos.</li><li>Extraer hechos.</li><li>Sugerir fuentes oficiales para verificar.</li><li>Construir canvas si parece caso.</li></ul></article>
    </section>`;
  }
  return `<section class="result-card">
    <div class="classification-card">
      <span>Clasificación del documento</span>
      <strong>${escapeHTML(appState.result.classificationLabel)}</strong>
    </div>
    <article class="analysis-card">
      <h2>Resultado del análisis</h2>
      <div class="analysis-body">${escapeHTML(appState.result.analysis)}</div>
    </article>
    ${renderSuggestedActions()}
    ${renderCanvas()}
  </section>`;
}

function renderSuggestedActions() {
  const classification = appState.result?.classification;
  const hasFacts = ["legal_case", "administrative_document", "general_document"].includes(classification);
  const riskReady = ["legal_case", "administrative_document"].includes(classification);
  const canConvert = ["administrative_document", "general_document"].includes(classification);
  return `<section class="suggested-actions">
    <h2>Acciones sugeridas</h2>
    <div class="button-grid">
      ${hasFacts ? `<button class="secondary-btn" data-mode="extract_facts">Extraer hechos</button>` : ""}
      ${riskReady ? `<button class="secondary-btn" data-mode="detect_risks">Detectar riesgos</button>` : ""}
      ${appState.result?.classification === "legal_case" && !appState.canvas ? `<button class="secondary-btn" data-mode="build_case_canvas">Crear teoría del caso</button>` : ""}
      ${canConvert ? `<button class="secondary-btn" data-mode="build_case_canvas">Convertir en caso</button>` : ""}
      <button class="secondary-btn" data-mode="source_verification_suggestions">Ver fuentes para verificar</button>
      <button class="secondary-btn" data-mode="export_summary">Generar resumen ejecutivo</button>
    </div>
  </section>`;
}

function renderCanvas() {
  if (!appState.canvas) return "";
  const fields = [
    ["keyFacts", "Hechos clave"],
    ["parties", "Sujetos/partes"],
    ["centralProblem", "Problema central"],
    ["evidence", "Evidencias mencionadas"],
    ["risks", "Riesgos o vacíos"],
    ["workingTheory", "Hipótesis de trabajo"],
    ["nextStep", "Próximo paso"]
  ];
  return `<section class="canvas-card">
    <h2>Canvas simple de teoría del caso</h2>
    <div class="canvas-grid">${fields.map(([field, label]) => `<label><span>${label}</span><textarea data-canvas-field="${field}">${escapeHTML(Array.isArray(appState.canvas[field]) ? appState.canvas[field].join("\n") : appState.canvas[field] || "")}</textarea></label>`).join("")}</div>
  </section>`;
}

function renderActions() {
  if (!appState.result) return "";
  return `<section class="save-actions">
    <button class="secondary-btn" data-action="copy">Copiar resultado</button>
    <button class="primary-btn" data-action="save">Guardar análisis</button>
    <button class="secondary-btn" data-action="clear">Limpiar</button>
    <button class="secondary-btn" data-action="export">Exportar JSON</button>
    <button class="secondary-btn" data-action="export-txt">Exportar informe TXT</button>
  </section>`;
}

function renderSources() {
  if (!appState.result) return "";
  const sources = normalizeSources(appState.sourceSuggestions);
  return `<section class="sources-card">
    <h2>Fuentes oficiales donde verificar</h2>
    <p>Ninguna fuente ha sido verificada automáticamente. Usa estos enlaces como punto de partida.</p>
    <div class="source-list">${sources.map(source => source.url ? `<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener">${escapeHTML(source.label)}</a>` : `<span>${escapeHTML(source.label)}</span>`).join("")}</div>
  </section>`;
}

function renderPersistence() {
  const saved = appState.savedAnalyses;
  return `<section class="local-card">
    <div>
      <h2>Análisis guardados</h2>
      <p>Solo se conserva el análisis, clasificación, canvas si existe, nombre del archivo, fecha y notas.</p>
    </div>
    <label class="notes-label">Notas del usuario
      <textarea id="notes-input" placeholder="Notas privadas de esta sesión">${escapeHTML(appState.notes)}</textarea>
    </label>
    ${saved.length ? `<div class="saved-list">${saved.map(item => `<button data-load-id="${escapeHTML(item.id)}" class="${item.id === appState.activeSavedId ? "active" : ""}"><strong>${escapeHTML(item.filename || "Análisis guardado")}</strong><small>${escapeHTML(item.classificationLabel || "")} · ${escapeHTML(item.timestamp || "")}</small></button>`).join("")}</div>` : `<p class="muted">Aún no hay análisis guardados.</p>`}
    <button class="secondary-btn" data-action="delete-saved" ${appState.activeSavedId ? "" : "disabled"}>Borrar guardado seleccionado</button>
  </section>`;
}

function bindEvents() {
  document.addEventListener("change", event => {
    if (event.target.id === "file-input") handleFile(event.target.files);
  });

  document.addEventListener("input", event => {
    if (event.target.id === "question-input") appState.question = event.target.value;
    if (event.target.id === "notes-input") appState.notes = event.target.value;
    if (event.target.matches("[data-canvas-field]") && appState.canvas) {
      const field = event.target.dataset.canvasField;
      appState.canvas[field] = ["keyFacts", "parties", "evidence", "risks"].includes(field)
        ? toLines(event.target.value)
        : event.target.value.trim();
    }
  });

  document.addEventListener("click", event => {
    const modeButton = event.target.closest("[data-mode]");
    if (modeButton) return runFocused(modeButton.dataset.mode);
    const loadButton = event.target.closest("[data-load-id]");
    if (loadButton) return loadAnalysis(loadButton.dataset.loadId);
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    if (action === "analyze") runFocused("default_orchestrated_analysis");
    if (action === "save") saveAnalysis();
    if (action === "clear") { resetCurrent({ keepSaved: true }); clearFileInput(); renderApp(); }
    if (action === "export") exportAnalysis();
    if (action === "export-txt") exportTextReport();
    if (action === "copy") copyResult();
    if (action === "delete-saved") deleteActiveSaved();
  });

  document.addEventListener("dragover", event => {
    const zone = event.target.closest("#drop-zone");
    if (!zone) return;
    event.preventDefault();
    zone.classList.add("dragging");
  });
  document.addEventListener("dragleave", event => event.target.closest("#drop-zone")?.classList.remove("dragging"));
  document.addEventListener("drop", event => {
    const zone = event.target.closest("#drop-zone");
    if (!zone) return;
    event.preventDefault();
    zone.classList.remove("dragging");
    handleFile(event.dataTransfer.files);
  });
}

function initApp() {
  loadSavedAnalyses();
  bindEvents();
  renderApp();
}

window.handleFile = handleFile;
window.renderApp = renderApp;
document.addEventListener("DOMContentLoaded", initApp, { once: true });
