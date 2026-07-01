"use strict";

const STORAGE_KEY = "bibliotecaFiscalInteligente.v1";
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const MAX_EXTRACTED_TEXT = 20000;
const SUPPORTED_EXTENSIONS = ["txt", "pdf", "docx", "csv"];
const SAVED_CASES_KEY = "bibliotecaFiscalInteligente.savedCases.v1";
const PROMPT_MODES = {
  extract_facts: "Extraer hechos",
  extract_evidence: "Extraer evidencias",
  find_risks: "Detectar riesgos",
  next_actions: "Próximas acciones",
  executive_summary: "Resumen ejecutivo"
};
const EMPTY_CANVAS = {
  caseTitle: "",
  summary: "",
  facts: [],
  subjects: [],
  timeline: [],
  mainTheory: "",
  alternativeTheory: "",
  evidence: [],
  elementsToProve: [],
  risks: [],
  missingInformation: [],
  nextActions: [],
  followUpQuestions: [],
  freeText: "",
  parseWarning: ""
};
const DEFAULT_NOTES = [
  "Inconsistencias en cadena de custodia.",
  "Jurisprudencia favorable sobre testigos.",
  "Verificar actualización del dictamen pericial."
];

const DEFAULT_NODES = [
  { id: "hecho", type: "fact", label: "Hecho", detail: "Ingreso al establecimiento y sustracción bajo amenaza.", x: 8, y: 18 },
  { id: "sujeto", type: "person", label: "Sujeto", detail: "Juan Pérez López, investigado principal.", x: 37, y: 10 },
  { id: "evidencia", type: "evidence", label: "Evidencia", detail: "Video de cámara y acta de incautación.", x: 68, y: 18 },
  { id: "norma", type: "rule", label: "Norma", detail: "Código Penal, artículos 188 y 189.", x: 14, y: 62 },
  { id: "riesgo", type: "risk", label: "Riesgo", detail: "Cuestionamiento de identificación y cadena de custodia.", x: 43, y: 58 },
  { id: "accion", type: "action", label: "Acción", detail: "Validar pericia y preparar solicitud de formalización.", x: 72, y: 64 }
];

const CASE_DATA = {
  id: "MP-2024-01567",
  crime: "Robo Agravado",
  updated: "Hoy, 10:45 a. m.",
  stage: "Formalización",
  prosecutor: "Doctor",
  subjects: "Juan Pérez López (investigado); María Fernanda Ruiz (agraviada).",
  pending: "Validar extracción celular, actualizar pericia y solicitar formalización.",
  alerts: "Revisar continuidad de cadena de custodia y consistencia de la identificación."
};

const appState = {
  activeSection: "inicio",
  activeCase: "MP-2024-01567",
  uploadedFiles: [],
  notes: [...DEFAULT_NOTES],
  history: [],
  activeStudyStep: 1,
  activeWorkspacePanel: "dashboard",
  caseMapNodes: DEFAULT_NODES.map(node => ({ ...node })),
  selectedMapNode: "hecho",
  lastAI: null,
  searchQuery: "",
  sidebarOpen: false,
  temporaryDocument: null,
  documentStatus: "idle",
  documentNotice: "",
  isAnalyzing: false,
  analysisError: "",
  analysisStatus: "",
  documentName: "",
  canvas: { ...EMPTY_CANVAS },
  modeHistory: [],
  savedCases: [],
  selectedSavedCaseId: ""
};

const navItems = [
  ["inicio", "Inicio", "i-home"],
  ["biblioteca", "Biblioteca IA", "i-book"],
  ["analisis", "Análisis del caso", "i-folder"],
  ["notas", "Notas", "i-note"],
  ["historial", "Historial", "i-history"]
];

function icon(name, label = "") {
  return `<span class="sprite ${name}"${label ? ` role="img" aria-label="${escapeHTML(label)}"` : ""}></span>`;
}

function asset(name) {
  return window.BFI_IMAGES?.[name] || "assets/favicon.svg";
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function createEmptyCanvas() {
  return JSON.parse(JSON.stringify(EMPTY_CANVAS));
}

function loadSavedCases() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVED_CASES_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function loadState() {
  try {
    localStorage.removeItem("bibliotecaFiscalInteligente.aiModel");
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    appState.savedCases = loadSavedCases();
    if (!saved || typeof saved !== "object") return;
    Object.assign(appState, saved);
    appState.notes = Array.isArray(saved.notes) ? saved.notes : [...DEFAULT_NOTES];
    appState.history = Array.isArray(saved.history) ? saved.history : [];
    appState.uploadedFiles = [];
    appState.caseMapNodes = Array.isArray(saved.caseMapNodes) && saved.caseMapNodes.length ? saved.caseMapNodes : DEFAULT_NODES.map(node => ({ ...node }));
    appState.temporaryDocument = null;
    appState.documentStatus = "idle";
    appState.documentNotice = "";
    appState.isAnalyzing = false;
    appState.analysisError = "";
    appState.lastAI = null;
    appState.analysisStatus = "";
    appState.documentName = "";
    appState.canvas = createEmptyCanvas();
    appState.modeHistory = [];
    delete appState.aiModels;
    delete appState.selectedModel;
    saveState();
  } catch (error) {
    console.warn("No se pudo recuperar la sesión local.", error);
  }
}

function saveState() {
  const { temporaryDocument, documentStatus, documentNotice, isAnalyzing, analysisError, analysisStatus, uploadedFiles, lastAI, canvas, modeHistory, savedCases, aiModels, selectedModel, ...persistable } = appState;
  const snapshot = { ...persistable, sidebarOpen: false, uploadedFiles: [], lastAI: null };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

function addHistoryEvent(event) {
  const item = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    action: event.action || "Actividad registrada",
    timestamp: new Date().toLocaleString("es-PE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }),
    section: event.section || appState.activeSection,
    description: event.description || "Interacción dentro de la biblioteca fiscal."
  };
  appState.history.unshift(item);
  appState.history = appState.history.slice(0, 80);
  saveState();
}

function showToast(message, type = "") {
  const region = document.getElementById("toasts");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  region.append(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function buildAIContext() {
  return [
    `Caso activo: ${CASE_DATA.id}`,
    `Delito o materia: ${CASE_DATA.crime}`,
    `Etapa: ${CASE_DATA.stage}`,
    `Sujetos procesales registrados: ${CASE_DATA.subjects}`,
    `Pendientes: ${CASE_DATA.pending}`,
    `Alertas: ${CASE_DATA.alerts}`
  ].join("\n");
}

async function askAI({ mode = "default_document_analysis", question = "" } = {}) {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode,
      question,
      extractedDocumentText: appState.temporaryDocument?.text || "",
      currentCanvas: appState.canvas,
      caseId: appState.canvas.caseTitle || CASE_DATA.id,
      caseData: CASE_DATA,
      notes: appState.notes,
      context: buildAIContext()
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || "No se pudo completar el análisis con IA.";
    const error = new Error(message);
    error.code = data?.error?.code;
    throw error;
  }
  return data;
}

function setDocumentStatus(status, notice = "") {
  appState.documentStatus = status;
  appState.documentNotice = notice;
  renderApp();
}

function clearTemporaryDocument({ render = true } = {}) {
  appState.uploadedFiles = [];
  appState.temporaryDocument = null;
  appState.documentStatus = "idle";
  appState.documentNotice = "";
  appState.documentName = "";
  const fileInput = document.getElementById("file-input");
  const libraryFileInput = document.getElementById("library-file-input");
  if (fileInput) fileInput.value = "";
  if (libraryFileInput) libraryFileInput.value = "";
  saveState();
  if (render) renderApp();
}

function clearFileInputs() {
  const fileInput = document.getElementById("file-input");
  const libraryFileInput = document.getElementById("library-file-input");
  if (fileInput) fileInput.value = "";
  if (libraryFileInput) libraryFileInput.value = "";
}

function truncateExtractedText(text) {
  if (text.length <= MAX_EXTRACTED_TEXT) return { text, truncated: false };
  return { text: text.slice(0, MAX_EXTRACTED_TEXT), truncated: true };
}

function getFileExtension(file) {
  return file.name.split(".").pop().toLowerCase();
}

function normalizeExtractedText(text) {
  return String(text || "").replace(/\u0000/g, "").replace(/[ \t]+\n/g, "\n").replace(/\n{4,}/g, "\n\n\n").trim();
}

async function extractTextFromFile(file) {
  const ext = getFileExtension(file);
  if (ext === "txt" || ext === "csv") return normalizeExtractedText(await file.text());
  if (ext === "pdf") return extractTextFromPDF(file);
  if (ext === "docx") return extractTextFromDocx(file);
  throw new Error("Formato no compatible. Usa PDF, DOCX, TXT o CSV.");
}

async function waitForGlobal(name, message) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (window[name]) return window[name];
    await new Promise(resolve => window.setTimeout(resolve, 100));
  }
  throw new Error(message);
}

async function extractTextFromPDF(file) {
  const pdfjsLib = await waitForGlobal("pdfjsLib", "No se pudo cargar el lector PDF de la demo.");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map(item => item.str || "").join(" "));
  }
  const text = normalizeExtractedText(pages.join("\n\n"));
  if (!text || text.length < 20) {
    throw new Error("Este PDF parece escaneado o sin texto seleccionable. La demo aún no tiene OCR.");
  }
  return text;
}

async function extractTextFromDocx(file) {
  const mammoth = await waitForGlobal("mammoth", "No se pudo cargar el lector DOCX de la demo.");
  const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return normalizeExtractedText(result.value || "");
}

function arrayFromCanvasValue(value) {
  if (Array.isArray(value)) return value.map(item => typeof item === "string" ? item : JSON.stringify(item)).filter(Boolean);
  if (typeof value === "string" && value.trim()) return value.split(/\n+/).map(item => item.replace(/^[-*]\s*/, "").trim()).filter(Boolean);
  return [];
}

function parseCanvasResponse(answer) {
  const clean = String(answer || "").trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  try {
    const parsed = JSON.parse(clean);
    return {
      ...createEmptyCanvas(),
      caseTitle: String(parsed.caseTitle || parsed.title || "").trim(),
      summary: String(parsed.summary || "").trim(),
      facts: arrayFromCanvasValue(parsed.facts),
      subjects: arrayFromCanvasValue(parsed.subjects),
      timeline: arrayFromCanvasValue(parsed.timeline),
      mainTheory: String(parsed.mainTheory || "").trim(),
      alternativeTheory: String(parsed.alternativeTheory || "").trim(),
      evidence: arrayFromCanvasValue(parsed.evidence),
      elementsToProve: arrayFromCanvasValue(parsed.elementsToProve),
      risks: arrayFromCanvasValue(parsed.risks),
      missingInformation: arrayFromCanvasValue(parsed.missingInformation),
      nextActions: arrayFromCanvasValue(parsed.nextActions),
      followUpQuestions: arrayFromCanvasValue(parsed.followUpQuestions)
    };
  } catch (error) {
    return { ...createEmptyCanvas(), freeText: answer || "", parseWarning: "El canvas se generó en texto libre. Puedes editarlo manualmente." };
  }
}

function canvasFieldToText(field) {
  const value = appState.canvas[field];
  return Array.isArray(value) ? value.join("\n") : String(value || "");
}

function updateCanvasField(field, value) {
  const arrayFields = ["facts", "subjects", "timeline", "evidence", "elementsToProve", "risks", "missingInformation", "nextActions", "followUpQuestions"];
  appState.canvas[field] = arrayFields.includes(field)
    ? value.split(/\n+/).map(item => item.replace(/^[-*]\s*/, "").trim()).filter(Boolean)
    : value.trim();
}

function persistSavedCases() {
  localStorage.setItem(SAVED_CASES_KEY, JSON.stringify(appState.savedCases));
}

function setActiveNav(sectionName) {
  appState.activeSection = sectionName;
  appState.sidebarOpen = false;
  saveState();
}

function renderSidebar() {
  return `<aside class="sidebar ${appState.sidebarOpen ? "open" : ""}" aria-label="Navegación principal">
    <button class="sidebar-toggle" data-action="toggle-sidebar" aria-label="${appState.sidebarOpen ? "Cerrar menú" : "Abrir menú"}" aria-expanded="${appState.sidebarOpen}">${appState.sidebarOpen ? "×" : "☰"}</button>
    <div class="brand">
      <img class="brand-logo" src="${asset("logo")}" alt="Libro abierto con balanza de la justicia">
      <strong>Biblioteca Fiscal</strong><span>Inteligente</span>
    </div>
    <nav class="nav-list">${navItems.map(([id, label, iconName]) => `<button class="nav-btn ${appState.activeSection === id ? "active" : ""}" data-section="${id}" aria-current="${appState.activeSection === id ? "page" : "false"}"><span class="nav-icon">${icon(iconName)}</span><span class="nav-label">${label}</span></button>`).join("")}</nav>
    <img class="sidebar-art" src="${asset("leaves")}" alt="" aria-hidden="true">
    <div class="author"><strong>Elaborado por Pierre R.</strong>Correo: peru.labs.pe@gmail.com</div>
  </aside>`;
}

function renderTopbar() {
  return `<header class="topbar">
    <button class="mobile-menu-trigger" data-action="toggle-sidebar" aria-label="Abrir menú" aria-expanded="${appState.sidebarOpen}">${icon("i-book")}</button>
    <div class="greeting"><h1>${appState.activeSection === "inicio" ? "Bienvenido, Doctor" : sectionTitle(appState.activeSection)}</h1><p>${sectionSubtitle(appState.activeSection)}</p></div>
    <div class="search-wrap">${icon("i-search", "Buscar")}<input id="global-search" class="global-search" type="search" value="${escapeHTML(appState.searchQuery)}" placeholder="Buscar casos, documentos, jurisprudencia, autores..." aria-label="Buscar en la biblioteca"><span class="search-hint">Ctrl K</span></div>
    <button class="user-menu" data-action="user-menu" aria-label="Menú del usuario"><span class="avatar">D</span><strong>Doctor</strong><span class="chevron">⌄</span></button>
  </header>`;
}

function sectionTitle(section) {
  return ({ inicio: "Inicio", biblioteca: "Biblioteca IA", analisis: "Análisis del caso", notas: "Mis notas", historial: "Historial" })[section] || "Biblioteca Fiscal";
}

function sectionSubtitle(section) {
  return ({
    inicio: "Tu espacio de análisis y estudio asistido por IA.",
    biblioteca: "Fuentes, documentos y lecturas para fortalecer tu investigación.",
    analisis: "Organiza hechos, evidencia, riesgos y próximos pasos del caso.",
    notas: "Captura hallazgos y líneas de trabajo mientras estudias.",
    historial: "Consulta la trazabilidad de tu actividad reciente."
  })[section];
}

function renderMobileBar() {
  return `<nav class="mobile-bar" aria-label="Navegación móvil">${navItems.map(([id, label, iconName]) => `<button class="mobile-nav ${appState.activeSection === id ? "active" : ""}" data-section="${id}" aria-label="${label}">${icon(iconName)}</button>`).join("")}</nav>`;
}

function renderApp() {
  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-shell">${renderSidebar()}<main class="main-shell">${renderTopbar()}<div class="content">${renderSection(appState.activeSection)}</div></main>${renderMobileBar()}</div>`;
  handleSearch(appState.searchQuery, false);
}

function renderSection(sectionName) {
  if (sectionName === "biblioteca") return renderLibrarySection();
  if (sectionName === "analisis") return renderAnalysisSection();
  if (sectionName === "notas") return renderNotes();
  if (sectionName === "historial") return renderHistory();
  return renderDashboard();
}

function renderDashboard() {
  const hasPrimaryResult = Boolean(appState.lastAI?.answer || appState.isAnalyzing || appState.analysisError);
  return `<div class="dashboard-grid ${hasPrimaryResult ? "has-result" : ""}">
    <section class="card library-card ${hasPrimaryResult ? "result-mode" : ""}">
      <div class="library-head"><div class="library-title"><span class="round-icon">${icon("i-book")}</span><div><h2>Analizador jurídico-documental</h2><p>Organiza fuentes, profundiza en argumentos y estudia tu caso con apoyo inteligente.</p></div></div></div>
      <img class="library-visual" src="${asset("study")}" alt="Libros jurídicos, lámpara y libro abierto">
      ${renderDropZone()}
      <form class="ai-question" id="ai-form"><label for="ai-input">${icon("i-ai")} Pregunta opcional para enfocar el análisis</label><div class="ai-row"><input id="ai-input" autocomplete="off" placeholder="Ej.: prioriza riesgos procesales o puntos débiles." value="" ${appState.isAnalyzing ? "disabled" : ""}><button class="send-btn" type="submit" aria-label="Analizar documento" ${appState.isAnalyzing ? "disabled" : ""}>${icon("i-open")}</button></div>${renderAIStatus()}</form>
      ${renderPrimaryResultPanel()}
      ${renderCanvas()}
      ${renderFocusActions()}
      <div class="workspace-output" id="workspace-output">${renderWorkspaceOutput()}</div>
    </section>
    <aside class="right-column">${renderCaseCard()}<div class="support-panels">${renderSavedCasesCard()}${renderNotesCard()}</div></aside>
    ${renderStudyRoute()}
  </div>`;
}

function renderDropZone() {
  const hasDocument = Boolean(appState.temporaryDocument);
  const analyzed = Boolean(appState.lastAI?.answer);
  const panel = analyzed && hasDocument
    ? `<div class="document-temp-panel discreet-temp-panel"><strong>Documento procesado temporalmente.</strong><p>Disponible solo para reanálisis en esta sesión. No se muestra ni se almacena el archivo.</p><button class="secondary-btn" data-action="clear-document" type="button">Limpiar documento</button></div>`
    : (hasDocument || appState.documentNotice ? `<div class="document-temp-panel"><strong>${escapeHTML(appState.documentNotice || "Documento listo para análisis.")}</strong>${hasDocument ? `<p>${escapeHTML(appState.temporaryDocument.summary)}</p>` : ""}<button class="secondary-btn" data-action="clear-document" type="button">Limpiar documento</button></div>` : "");
  return `<div class="upload-wrap"><label class="drop-zone ${hasDocument && !analyzed ? "has-temp-file" : ""}" id="drop-zone">${icon("i-upload", "Cargar archivos")}<span><strong>${hasDocument && !analyzed ? "Documento temporal en memoria" : "Subir documento"}</strong><small>PDF, DOCX, TXT o CSV · Máx. 4 MB</small><small class="privacy-note">Modo demo: el archivo no se almacena. Solo se guarda el análisis si presionas Guardar caso.</small></span><input id="file-input" type="file" accept=".pdf,.docx,.txt,.csv" aria-label="Seleccionar documento" ${appState.isAnalyzing ? "disabled" : ""}></label>${panel}</div>`;
}

function renderAIStatus() {
  const statusText = appState.analysisStatus || (appState.temporaryDocument ? "Documento listo para reanálisis" : "Sube un documento para iniciar");
  return `<div class="ai-status-row"><span>${escapeHTML(statusText)}</span><small>Modo demo gratuito</small></div>`;
}

function renderPrimaryResultPanel() {
  if (appState.isAnalyzing) {
    return `<section class="analysis-result-card loading-result" aria-live="polite"><div class="result-title-row"><div><h2>${escapeHTML(appState.analysisStatus || "Analizando contenido...")}</h2><p>Esto puede tardar unos segundos.</p></div></div><div class="typing large-typing">Procesando la consulta <i></i><i></i><i></i></div></section>`;
  }
  if (appState.analysisError) {
    return `<section class="analysis-result-card error-result" aria-live="polite"><div class="result-title-row"><div><h2>Resultado del análisis</h2><p>No se pudo completar el análisis.</p></div><div class="answer-actions"><button class="secondary-btn compact-btn" data-action="clear-analysis" type="button">Limpiar análisis</button><button class="secondary-btn compact-btn" data-action="new-analysis" type="button">Nuevo análisis</button></div></div><p class="result-content">${escapeHTML(appState.analysisError)}</p></section>`;
  }
  if (appState.lastAI?.answer) return renderAnalyticalResponse(appState.lastAI);
  return "";
}

function renderCanvas() {
  const hasCanvas = Boolean(appState.canvas.freeText || appState.canvas.summary || appState.canvas.caseTitle || appState.canvas.facts.length || appState.lastAI?.answer);
  if (!hasCanvas) return "";
  const fields = [
    ["caseTitle", "Caso / asunto"],
    ["summary", "Resumen del caso"],
    ["facts", "Hechos relevantes"],
    ["subjects", "Sujetos o partes"],
    ["timeline", "Línea de tiempo"],
    ["mainTheory", "Hipótesis principal"],
    ["alternativeTheory", "Hipótesis alternativa"],
    ["evidence", "Evidencias identificadas"],
    ["elementsToProve", "Elementos por acreditar"],
    ["risks", "Riesgos o contradicciones"],
    ["missingInformation", "Información faltante"],
    ["nextActions", "Próxima acción recomendada"],
    ["followUpQuestions", "Preguntas para profundizar"]
  ];
  return `<section class="case-canvas card"><div class="canvas-head"><div><h2>Canvas de teoría del caso</h2><p>Edita y completa cada campo según tu criterio profesional.</p></div></div>${appState.canvas.parseWarning ? `<p class="canvas-warning">${escapeHTML(appState.canvas.parseWarning)}</p>` : ""}${appState.canvas.freeText ? `<label class="canvas-field canvas-free-text"><span>Análisis generado</span><textarea data-canvas-field="freeText">${escapeHTML(appState.canvas.freeText)}</textarea></label>` : ""}<div class="canvas-grid">${fields.map(([field, label]) => `<label class="canvas-field"><span>${label}</span><textarea data-canvas-field="${field}">${escapeHTML(canvasFieldToText(field))}</textarea></label>`).join("")}</div></section>`;
}

function renderFocusActions() {
  const disabled = appState.isAnalyzing || !appState.temporaryDocument?.text;
  return `<div class="action-zone"><div class="quick-actions focus-actions">${Object.entries(PROMPT_MODES).map(([mode, label]) => `<button class="action-btn" data-ai-mode="${mode}" ${disabled ? "disabled" : ""}>${icon(mode === "find_risks" ? "i-scale" : mode === "extract_evidence" ? "i-search" : "i-document")}<span>${label}</span></button>`).join("")}</div><div class="case-actions"><button class="primary-btn" data-action="save-case" type="button">Guardar caso</button><button class="secondary-btn" data-action="clear-case" type="button">Limpiar caso</button><button class="secondary-btn" data-action="export-analysis" type="button">Exportar análisis</button></div></div>`;
}

function renderWorkspaceOutput() {
  if (appState.lastAI?.answer || appState.isAnalyzing || appState.analysisError) return "";
  if (appState.activeWorkspacePanel === "dashboard" && !appState.lastAI) return `<div class="output-grid"><div class="output-item"><strong>Flujo principal</strong><p>Sube un documento y el análisis empezará automáticamente.</p></div><div class="output-item"><strong>Privacidad demo</strong><p>El archivo y el texto extraído no se guardan localmente.</p></div><div class="output-item"><strong>Canvas editable</strong><p>La teoría del caso se generará después del análisis.</p></div><div class="output-item"><strong>Reanálisis</strong><p>Usa modos enfocados solo después de cargar un documento legible.</p></div></div>`;
  if (appState.activeWorkspacePanel === "typing") return `<div class="typing">Analizando el caso <i></i><i></i><i></i></div>`;
  if (appState.activeWorkspacePanel === "ai" && appState.lastAI) return renderAnalyticalResponse(appState.lastAI);
  return "";
}

async function runFocusedMode(mode) {
  if (!PROMPT_MODES[mode]) return showToast("Modo no compatible.", "warn");
  if (!appState.temporaryDocument?.text) return showToast("Sube un documento legible para reanalizar.", "warn");
  if (appState.isAnalyzing) return showToast("El análisis ya está en curso.", "warn");
  appState.isAnalyzing = true;
  appState.analysisError = "";
  appState.analysisStatus = PROMPT_MODES[mode];
  renderApp();
  try {
    const result = await askAI({ mode, question: `Ejecuta el modo: ${PROMPT_MODES[mode]}.` });
    appState.lastAI = { question: PROMPT_MODES[mode], answer: result.answer, createdAt: Date.now(), documentWasTemporary: true, mode };
    appState.modeHistory.push({ mode, label: PROMPT_MODES[mode], timestamp: new Date().toLocaleString("es-PE") });
    appState.isAnalyzing = false;
    appState.analysisStatus = "";
    saveState();
    renderApp();
    showToast(`${PROMPT_MODES[mode]} completado.`, "success");
  } catch (error) {
    appState.isAnalyzing = false;
    appState.analysisStatus = "";
    appState.analysisError = error.message || "No se pudo completar el modo solicitado.";
    saveState();
    renderApp();
    showToast(appState.analysisError, "warn");
  }
}

function clearCase() {
  clearTemporaryDocument({ render: false });
  appState.lastAI = null;
  appState.analysisError = "";
  appState.analysisStatus = "";
  appState.canvas = createEmptyCanvas();
  appState.modeHistory = [];
  appState.selectedSavedCaseId = "";
  saveState();
  renderApp();
}

function saveCurrentCase() {
  if (!appState.lastAI?.answer && !appState.canvas.caseTitle && !appState.canvas.summary) {
    return showToast("No hay análisis para guardar.", "warn");
  }
  const timestamp = new Date().toLocaleString("es-PE");
  const item = {
    id: appState.selectedSavedCaseId || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    caseTitle: appState.canvas.caseTitle || appState.documentName || "Caso documental",
    answer: appState.lastAI?.answer || "",
    canvas: appState.canvas,
    timestamp,
    originalFilename: appState.documentName || "",
    modeHistory: appState.modeHistory
  };
  appState.savedCases = [item, ...appState.savedCases.filter(saved => saved.id !== item.id)].slice(0, 20);
  appState.selectedSavedCaseId = item.id;
  persistSavedCases();
  renderApp();
  showToast("Caso guardado localmente.", "success");
}

function loadSavedCase(id) {
  const item = appState.savedCases.find(saved => saved.id === id);
  if (!item) return showToast("No se encontró el caso guardado.", "warn");
  clearTemporaryDocument({ render: false });
  appState.selectedSavedCaseId = item.id;
  appState.documentName = item.originalFilename || "";
  appState.lastAI = { answer: item.answer, question: "Caso guardado", createdAt: Date.now(), documentWasTemporary: true };
  appState.canvas = { ...createEmptyCanvas(), ...(item.canvas || {}) };
  appState.modeHistory = Array.isArray(item.modeHistory) ? item.modeHistory : [];
  appState.analysisError = "";
  saveState();
  renderApp();
}

function deleteSelectedSavedCase() {
  if (!appState.selectedSavedCaseId) return showToast("Selecciona un caso guardado primero.", "warn");
  appState.savedCases = appState.savedCases.filter(item => item.id !== appState.selectedSavedCaseId);
  appState.selectedSavedCaseId = "";
  persistSavedCases();
  renderApp();
  showToast("Caso local borrado.", "success");
}

function exportAnalysis() {
  const payload = {
    caseTitle: appState.canvas.caseTitle || "Caso documental",
    timestamp: new Date().toISOString(),
    originalFilename: appState.documentName || "",
    analysis: appState.lastAI?.answer || "",
    canvas: appState.canvas,
    modeHistory: appState.modeHistory
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "studio-carpeta-analisis.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

function outputPanel(items) {
  return `<div class="output-grid">${items.map(item => { const [title, text] = item.split("|"); return `<div class="output-item"><strong>${title}</strong><p>${text}</p></div>`; }).join("")}</div>`;
}

function renderAnalyticalResponse(result) {
  return `<section class="analysis-result-card answer-card" data-searchable="${escapeHTML(result.answer || "")}"><div class="result-title-row"><div><h2>Resultado del análisis</h2><p>Documento procesado temporalmente. No fue almacenado.</p></div><div class="answer-actions"><button class="secondary-btn compact-btn" data-action="copy-answer" type="button">Copiar resultado</button><button class="secondary-btn compact-btn" data-action="clear-analysis" type="button">Limpiar análisis</button><button class="secondary-btn compact-btn" data-action="new-analysis" type="button">Nuevo análisis</button></div></div><div class="result-content">${escapeHTML(result.answer || "No se obtuvo respuesta.")}</div></section>`;
}

function renderStudyRoute() {
  const steps = ["Comprender hechos", "Revisar normas", "Analizar tesis", "Preparar estrategia"];
  return `<section class="card study-route"><h2>Ruta de estudio</h2><p>Sigue un método estructurado para dominar tu caso paso a paso.</p><div class="study-steps">${steps.map((label, index) => `<button class="study-step ${appState.activeStudyStep === index + 1 ? "active" : ""}" data-study-step="${index + 1}"><span class="step-number">${index + 1}</span><span>${label}</span></button>`).join("")}</div></section>`;
}

function renderCaseCard() {
  return `<section class="card side-card case-card" data-searchable="${CASE_DATA.id} ${CASE_DATA.crime}"><div class="side-card-head"><h2>Caso activo</h2>${icon("i-folder")}</div><div class="case-id">${CASE_DATA.id}</div><p class="case-crime">${CASE_DATA.crime}</p><p class="side-meta">Actualizado ${CASE_DATA.updated.toLowerCase()}</p><button class="primary-btn" data-action="case-details">Ver detalles del caso</button></section>`;
}

function renderSavedCasesCard() {
  const saved = appState.savedCases || [];
  return `<section class="card side-card saved-cases-card"><div class="side-card-head"><h2>Casos locales</h2>${icon("i-folder")}</div><p class="privacy-note">Solo se guardan análisis, canvas, fecha y nombre del archivo.</p>${saved.length ? `<div class="saved-case-list">${saved.map(item => `<button class="reading-item" data-load-case="${escapeHTML(item.id)}"><span class="nav-icon">${icon("i-document")}</span><span><strong>${escapeHTML(item.caseTitle || "Caso sin título")}</strong><small>${escapeHTML(item.timestamp || "")}</small></span><span>›</span></button>`).join("")}</div>` : `<div class="output-item"><strong>Sin casos guardados</strong><p>Usa Guardar caso después de analizar un documento.</p></div>`}<button class="secondary-btn" data-action="delete-saved-case" type="button" style="margin-top:8px;width:100%" ${appState.selectedSavedCaseId ? "" : "disabled"}>Borrar caso</button></section>`;
}

function renderNotesCard() {
  return `<section class="card side-card notes-card"><div class="side-card-head"><h2>Notas rápidas</h2>${icon("i-edit")}</div><ul class="note-preview">${appState.notes.slice(0, 4).map(note => `<li data-searchable="${escapeHTML(note)}">${escapeHTML(note)}</li>`).join("")}</ul><button class="text-link" data-section="notas">Ir a mis notas →</button></section>`;
}

function renderLibrarySection() {
  const saved = appState.savedCases || [];
  return `<section class="section-shell"><div class="section-header"><div><h2>Biblioteca IA</h2><p>Casos guardados localmente y documentos temporales para análisis.</p></div><button class="primary-btn" data-action="upload-trigger">Analizar documento</button></div><div class="section-body"><div class="card panel"><p class="privacy-note">Modo demo: los archivos no se guardan. Solo se conserva el análisis si presionas Guardar caso.</p>${renderDropZone()}<input hidden id="library-file-input" type="file" accept=".pdf,.docx,.txt,.csv"><div class="document-grid saved-doc-grid">${saved.length ? saved.map(item => `<button class="doc-card" data-load-case="${escapeHTML(item.id)}" data-searchable="${escapeHTML(item.caseTitle || "")} ${escapeHTML(item.originalFilename || "")}"><span class="nav-icon">${icon("i-document")}</span><strong>${escapeHTML(item.caseTitle || "Caso sin título")}</strong><small>${escapeHTML(item.originalFilename || "Análisis local")} · ${escapeHTML(item.timestamp || "")}</small></button>`).join("") : `<div class="output-item"><strong>Sin casos locales</strong><p>Analiza un documento y usa Guardar caso para conservar solo el resultado y el canvas.</p></div>`}</div></div><aside class="side-stack"><section class="card panel"><h3>Persistencia local</h3><p class="privacy-note">No se almacena el archivo original ni el texto extraído. Puedes borrar el caso seleccionado desde el panel de Casos locales.</p></section>${renderSavedCasesCard()}</aside></div></section>`;
}

function renderAnalysisSection() {
  return `<section class="section-shell"><div class="section-header"><div><h2>Análisis del caso</h2><p>Sube un documento o continúa con un caso local guardado.</p></div><button class="primary-btn" data-action="upload-trigger">Analizar documento</button></div><div class="section-body"><div class="analysis-main-flow"><section class="analyzer-card card"><div class="analyzer-head"><div><h2>Analizador jurídico-documental</h2><p>PDF con texto seleccionable, DOCX, TXT o CSV.</p></div>${renderAIStatus()}</div>${renderDropZone()}${renderQuestionForm()}${renderPrimaryResultPanel()}${renderCanvas()}${renderFocusActions()}</section></div><aside class="side-stack">${renderCaseCard()}${renderSavedCasesCard()}</aside></div></section>`;
}

function renderMapSection() {
  const selected = appState.caseMapNodes.find(node => node.id === appState.selectedMapNode) || appState.caseMapNodes[0];
  return `<section class="section-shell"><div class="section-header"><div><h2>Mapa dinámico del caso</h2><p>Arrastra los nodos y examina las relaciones estratégicas.</p></div><div class="section-tools"><button class="secondary-btn" data-action="reset-map">Restablecer</button><button class="secondary-btn" data-action="close-map">Volver al análisis</button></div></div><div class="section-body"><div class="map-wrap" id="case-map"><svg class="map-lines" id="map-lines" aria-hidden="true"></svg><div class="map-toolbar"><button class="icon-btn" data-action="reset-map" aria-label="Restablecer posiciones">↺</button></div>${appState.caseMapNodes.map(node => `<button class="map-node node-${node.type} ${node.id === appState.selectedMapNode ? "selected" : ""}" data-node-id="${node.id}" style="left:${node.x}%;top:${node.y}%"><strong>${node.label}</strong><small>${node.detail}</small></button>`).join("")}</div><aside class="card panel"><div class="node-detail"><h3>${selected.label}</h3><p>${selected.detail}</p><small>Selecciona o mueve un nodo para explorar la relación.</small></div><div class="output-item" style="margin-top:10px"><strong>Relación sugerida</strong><p>${selected.id === "hecho" ? "El hecho debe sostenerse en evidencia verificable y norma aplicable." : "Este elemento se integra a la teoría global del caso."}</p></div></aside></div></section>`;
}

function renderNotes() {
  return `<section class="section-shell"><div class="section-header"><div><h2>Mis notas</h2><p>Las notas se guardan automáticamente en este dispositivo.</p></div><button class="primary-btn" data-action="add-note">Agregar nota</button></div><div class="section-body"><div class="card panel"><div class="panel-scroll"><div class="notes-editor">${appState.notes.map((note, index) => `<div class="note-row"><textarea data-note-index="${index}" aria-label="Nota ${index + 1}">${escapeHTML(note)}</textarea><button class="icon-btn" data-delete-note="${index}" aria-label="Eliminar nota">×</button></div>`).join("")}</div></div></div><aside class="card panel"><h3>Guía de notas</h3><p style="font:12px/1.6 Arial,sans-serif;color:#5e6965">Registra contradicciones, normas por verificar, citas útiles y acciones concretas. Los cambios quedan guardados localmente.</p><div class="output-item"><strong>${appState.notes.length} notas activas</strong><p>Última sincronización: ahora, en este navegador.</p></div></aside></div></section>`;
}

function renderHistory() {
  const history = appState.history.length ? appState.history : [{ action: "Biblioteca preparada", timestamp: "Hoy, 10:45", section: "inicio", description: "Se cargó el contexto del caso MP-2024-01567." }];
  return `<section class="section-shell"><div class="section-header"><div><h2>Historial</h2><p>Actividad de análisis y trazabilidad de la sesión.</p></div><button class="secondary-btn" data-action="clear-history">Limpiar historial</button></div><div class="section-body"><div class="card panel"><div class="panel-scroll"><div class="history-list">${history.map(item => `<article class="history-item" data-searchable="${escapeHTML(item.action)} ${escapeHTML(item.description)} ${escapeHTML(item.section)}"><span class="nav-icon">${icon("i-history")}</span><div><strong>${escapeHTML(item.action)}</strong><p>${escapeHTML(item.description)} · ${escapeHTML(sectionTitle(item.section))}</p></div><time class="history-time">${escapeHTML(item.timestamp)}</time></article>`).join("")}</div></div></div><aside class="card panel"><h3>Resumen de actividad</h3>${outputPanel([`Documentos|Procesamiento temporal`, `Preguntas IA|${appState.lastAI ? "1 reciente" : "Sin consultas recientes"}`, `Notas|${appState.notes.length} activas`, `Ruta|Paso ${appState.activeStudyStep} de 4`])}</aside></div></section>`;
}

async function handleFileDrop(files) {
  const file = Array.from(files || [])[0];
  if (!file) return;
  clearTemporaryDocument({ render: false });
  appState.lastAI = null;
  appState.analysisError = "";
  appState.canvas = createEmptyCanvas();
  const ext = getFileExtension(file);
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    showToast("Usa PDF, DOCX, TXT o CSV.", "warn");
    renderApp();
    return;
  }
  if (file.size > MAX_FILE_SIZE) {
    showToast("El archivo supera el límite de 4 MB para esta demo.", "warn");
    renderApp();
    return;
  }
  appState.analysisStatus = "Extrayendo texto del documento...";
  setDocumentStatus("extracting", "Extrayendo texto del documento...");
  try {
    const extracted = normalizeExtractedText(await extractTextFromFile(file));
    if (!extracted) {
      throw new Error("No se pudo extraer texto legible del documento. Intenta con PDF con texto seleccionable, DOCX, TXT o CSV.");
    }
    setDocumentStatus("preparing", "Preparando análisis...");
    const truncated = truncateExtractedText(extracted);
    appState.temporaryDocument = {
      text: truncated.text,
      summary: `${ext.toUpperCase()} temporal · ${truncated.text.length.toLocaleString("es-PE")} caracteres extraídos${truncated.truncated ? " · recortado" : ""}`,
      truncated: truncated.truncated
    };
    appState.documentName = file.name;
    appState.uploadedFiles = [];
    appState.documentStatus = "ready";
    appState.documentNotice = truncated.truncated
      ? "El documento fue recortado para esta demo."
      : "Analizador documental listo.";
    addHistoryEvent({ action: "Documento preparado", section: appState.activeSection, description: "Documento temporal listo para análisis." });
    saveState();
    renderApp();
    await runDefaultDocumentWorkflow("");
  } catch (error) {
    clearTemporaryDocument({ render: false });
    appState.documentNotice = error.message || "No se pudo extraer texto legible del documento. Intenta con PDF con texto seleccionable, DOCX, TXT o CSV.";
    renderApp();
    showToast(appState.documentNotice, "warn");
  }
}

async function runDefaultDocumentWorkflow(question = "") {
  if (!appState.temporaryDocument?.text) return showToast("Sube un documento legible para iniciar el análisis.", "warn");
  appState.isAnalyzing = true;
  appState.analysisError = "";
  appState.analysisStatus = "Analizando contenido...";
  renderApp();
  try {
    const analysis = await askAI({ mode: "default_document_analysis", question });
    appState.lastAI = { question, answer: analysis.answer, createdAt: Date.now(), documentWasTemporary: true, mode: "default_document_analysis" };
    appState.modeHistory.push({ mode: "default_document_analysis", label: "Análisis automático", timestamp: new Date().toLocaleString("es-PE") });
    appState.analysisStatus = "Generando canvas de teoría del caso...";
    renderApp();
    const canvasResult = await askAI({ mode: "case_theory_canvas", question: "Genera el canvas inicial de teoría del caso." });
    appState.canvas = parseCanvasResponse(canvasResult.answer);
    if (!appState.canvas.caseTitle) appState.canvas.caseTitle = appState.documentName || CASE_DATA.id;
    appState.modeHistory.push({ mode: "case_theory_canvas", label: "Generar teoría del caso", timestamp: new Date().toLocaleString("es-PE") });
    appState.isAnalyzing = false;
    appState.analysisStatus = "";
    appState.documentNotice = "";
    appState.activeWorkspacePanel = "ai";
    saveState();
    clearFileInputs();
    renderApp();
    showToast("Análisis y canvas generados.", "success");
  } catch (error) {
    appState.isAnalyzing = false;
    appState.analysisStatus = "";
    appState.analysisError = error.message || "No se pudo completar el análisis con IA.";
    saveState();
    renderApp();
    showToast(appState.analysisError, "warn");
  }
}

async function handleAIQuestion(question) {
  const clean = question.trim();
  if (appState.isAnalyzing) return showToast("El análisis ya está en curso.", "warn");
  return runDefaultDocumentWorkflow(clean);
}

function openCaseDetails() {
  document.getElementById("modal").innerHTML = `<section class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="case-title"><div class="modal-head"><h2 id="case-title">${CASE_DATA.id}</h2><button class="icon-btn" data-action="close-modal" aria-label="Cerrar">×</button></div><div class="detail-grid"><div class="detail-box"><strong>Datos generales</strong><p>${CASE_DATA.crime} · ${CASE_DATA.stage}<br>Fiscal responsable: ${CASE_DATA.prosecutor}</p></div><div class="detail-box"><strong>Delito investigado</strong><p>Robo agravado mediante amenaza y uso de arma.</p></div><div class="detail-box"><strong>Sujetos procesales</strong><p>${CASE_DATA.subjects}</p></div><div class="detail-box"><strong>Actuaciones pendientes</strong><p>${CASE_DATA.pending}</p></div><div class="detail-box" style="grid-column:1/-1"><strong>Alertas críticas</strong><p>${CASE_DATA.alerts}</p></div></div></section>`;
  addHistoryEvent({ action: "Detalle de caso abierto", section: appState.activeSection, description: CASE_DATA.id });
}

function closeModal() {
  document.getElementById("modal").innerHTML = "";
}

function saveNotes() {
  document.querySelectorAll("[data-note-index]").forEach(field => {
    appState.notes[Number(field.dataset.noteIndex)] = field.value.trim();
  });
  appState.notes = appState.notes.filter(Boolean);
  saveState();
}

function initCaseMap() {
  window.requestAnimationFrame(() => {
    drawMapConnectors();
    enableDragForNodes();
  });
}

function drawMapConnectors() {
  const map = document.getElementById("case-map");
  const svg = document.getElementById("map-lines");
  if (!map || !svg) return;
  const links = [["hecho", "sujeto"], ["sujeto", "evidencia"], ["hecho", "norma"], ["evidencia", "riesgo"], ["norma", "riesgo"], ["riesgo", "accion"]];
  const bounds = map.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
  svg.innerHTML = `<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#8b7a62"></path></marker></defs>` + links.map(([from, to]) => {
    const a = map.querySelector(`[data-node-id="${from}"]`).getBoundingClientRect();
    const b = map.querySelector(`[data-node-id="${to}"]`).getBoundingClientRect();
    const x1 = a.left - bounds.left + a.width / 2, y1 = a.top - bounds.top + a.height / 2;
    const x2 = b.left - bounds.left + b.width / 2, y2 = b.top - bounds.top + b.height / 2;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#a89578" stroke-width="1.4" stroke-dasharray="5 5" marker-end="url(#arrow)"></line>`;
  }).join("");
}

function enableDragForNodes() {
  const map = document.getElementById("case-map");
  if (!map || map.dataset.dragReady) return;
  map.dataset.dragReady = "true";
  let drag = null;
  map.addEventListener("pointerdown", event => {
    const node = event.target.closest(".map-node");
    if (!node) return;
    event.preventDefault();
    const mapRect = map.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    drag = { node, id: node.dataset.nodeId, offsetX: event.clientX - nodeRect.left, offsetY: event.clientY - nodeRect.top, mapRect };
    node.setPointerCapture(event.pointerId);
    appState.selectedMapNode = drag.id;
    map.querySelectorAll(".map-node").forEach(item => item.classList.toggle("selected", item === node));
  });
  map.addEventListener("pointermove", event => {
    if (!drag) return;
    const maxX = drag.mapRect.width - drag.node.offsetWidth;
    const maxY = drag.mapRect.height - drag.node.offsetHeight;
    const left = Math.max(0, Math.min(maxX, event.clientX - drag.mapRect.left - drag.offsetX));
    const top = Math.max(0, Math.min(maxY, event.clientY - drag.mapRect.top - drag.offsetY));
    drag.node.style.left = `${left}px`;
    drag.node.style.top = `${top}px`;
    drawMapConnectors();
  });
  const finish = () => {
    if (!drag) return;
    const mapRect = map.getBoundingClientRect();
    const nodeRect = drag.node.getBoundingClientRect();
    const target = appState.caseMapNodes.find(item => item.id === drag.id);
    target.x = ((nodeRect.left - mapRect.left) / mapRect.width) * 100;
    target.y = ((nodeRect.top - mapRect.top) / mapRect.height) * 100;
    saveState();
    drag = null;
  };
  map.addEventListener("pointerup", finish);
  map.addEventListener("pointercancel", finish);
}

function resetCaseMap() {
  appState.caseMapNodes = DEFAULT_NODES.map(node => ({ ...node }));
  appState.selectedMapNode = "hecho";
  saveState();
  renderApp();
  showToast("Posiciones del mapa restablecidas.");
}

function handleSearch(query, record = true) {
  appState.searchQuery = query;
  const normalized = query.trim().toLowerCase();
  const items = document.querySelectorAll("[data-searchable]");
  items.forEach(item => {
    const match = !normalized || item.dataset.searchable.toLowerCase().includes(normalized);
    item.hidden = !match;
    item.classList.toggle("search-match", Boolean(normalized && match));
  });
  if (record) saveState();
}

function bindEvents() {
  document.addEventListener("click", event => {
    const sectionButton = event.target.closest("[data-section]");
    if (sectionButton) {
      setActiveNav(sectionButton.dataset.section);
      renderApp();
      return;
    }
    const aiMode = event.target.closest("[data-ai-mode]");
    if (aiMode) return runFocusedMode(aiMode.dataset.aiMode);
    const loadCase = event.target.closest("[data-load-case]");
    if (loadCase) return loadSavedCase(loadCase.dataset.loadCase);
    const step = event.target.closest("[data-study-step]");
    if (step) {
      appState.activeStudyStep = Number(step.dataset.studyStep);
      addHistoryEvent({ action: "Ruta de estudio actualizada", section: "inicio", description: step.textContent.trim() });
      saveState(); renderApp(); showToast("Paso de estudio actualizado."); return;
    }
    const deleteNote = event.target.closest("[data-delete-note]");
    if (deleteNote) {
      appState.notes.splice(Number(deleteNote.dataset.deleteNote), 1); addHistoryEvent({ action: "Nota eliminada", section: "notas", description: "Se eliminó una nota local." }); saveState(); renderApp(); return;
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    if (action === "toggle-sidebar") { appState.sidebarOpen = !appState.sidebarOpen; renderApp(); }
    if (action === "case-details") openCaseDetails();
    if (action === "close-modal") closeModal();
    if (action === "upload-trigger") document.getElementById("library-file-input")?.click();
    if (action === "user-menu") showToast("Sesión demo: Doctor · caso activo MP-2024-01567");
    if (action === "add-note") { appState.notes.push(""); saveState(); renderApp(); document.querySelector("[data-note-index]:last-of-type")?.focus(); }
    if (action === "clear-history") { appState.history = []; saveState(); renderApp(); showToast("Historial local limpiado."); }
    if (action === "clear-document") { clearTemporaryDocument(); showToast("Documento temporal limpiado."); }
    if (action === "clear-analysis") { appState.lastAI = null; appState.analysisError = ""; appState.documentNotice = ""; appState.activeWorkspacePanel = "dashboard"; saveState(); renderApp(); showToast("Análisis limpiado."); }
    if (action === "new-analysis") { appState.lastAI = null; appState.analysisError = ""; appState.documentNotice = ""; appState.activeWorkspacePanel = "dashboard"; saveState(); renderApp(); document.getElementById("ai-input")?.focus(); }
    if (action === "save-case") saveCurrentCase();
    if (action === "clear-case") { clearCase(); showToast("Caso limpiado."); }
    if (action === "delete-saved-case") deleteSelectedSavedCase();
    if (action === "export-analysis") exportAnalysis();
    if (action === "copy-answer") {
      const answer = appState.lastAI?.answer || "";
      if (!answer) return showToast("No hay respuesta para copiar.", "warn");
      if (!navigator.clipboard) return showToast("Copia no disponible en este navegador.", "warn");
      navigator.clipboard.writeText(answer).then(() => showToast("Respuesta copiada.", "success")).catch(() => showToast("No se pudo copiar la respuesta.", "warn"));
    }
  });

  document.addEventListener("submit", async event => {
    if (event.target.id === "ai-form") { event.preventDefault(); handleAIQuestion(document.getElementById("ai-input").value); }
  });

  document.addEventListener("input", event => {
    if (event.target.id === "global-search") handleSearch(event.target.value);
    if (event.target.matches("[data-canvas-field]")) {
      updateCanvasField(event.target.dataset.canvasField, event.target.value);
      return;
    }
    if (event.target.matches("[data-note-index]")) {
      appState.notes[Number(event.target.dataset.noteIndex)] = event.target.value;
      saveState();
    }
  });

  document.addEventListener("change", event => {
    if (event.target.id === "file-input" || event.target.id === "library-file-input") handleFileDrop(event.target.files);
  });

  document.addEventListener("dragover", event => {
    const drop = event.target.closest("#drop-zone");
    if (!drop) return;
    event.preventDefault(); drop.classList.add("dragging");
  });
  document.addEventListener("dragleave", event => event.target.closest("#drop-zone")?.classList.remove("dragging"));
  document.addEventListener("drop", event => {
    const drop = event.target.closest("#drop-zone");
    if (!drop) return;
    event.preventDefault(); drop.classList.remove("dragging"); handleFileDrop(event.dataTransfer.files);
  });
  document.getElementById("modal").addEventListener("click", event => { if (event.target.id === "modal") closeModal(); });

  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.getElementById("global-search")?.focus(); }
    if (event.key === "Escape") { closeModal(); if (appState.sidebarOpen) { appState.sidebarOpen = false; renderApp(); } }
  });
}

function initApp() {
  loadState();
  bindEvents();
  renderApp();
}

window.initApp = initApp;
window.loadState = loadState;
window.saveState = saveState;
window.renderApp = renderApp;
window.renderSection = renderSection;
window.setActiveNav = setActiveNav;
window.handleSearch = handleSearch;
window.handleFileDrop = handleFileDrop;
window.handleAIQuestion = handleAIQuestion;
window.renderAnalyticalResponse = renderAnalyticalResponse;
window.openCaseDetails = openCaseDetails;
window.renderNotes = renderNotes;
window.saveNotes = saveNotes;
window.addHistoryEvent = addHistoryEvent;

document.addEventListener("DOMContentLoaded", initApp, { once: true });
