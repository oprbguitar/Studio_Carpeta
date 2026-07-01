"use strict";

const STORAGE_KEY = "bibliotecaFiscalInteligente.v1";
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const MAX_EXTRACTED_TEXT = 20000;
const SUPPORTED_EXTENSIONS = ["txt", "pdf", "docx", "csv"];
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

const SUGGESTED_READINGS = [
  { id: "jurisprudencia", type: "Jurisprudencia", title: "Jurisprudencia relevante", subtitle: "Tesis y criterios aplicables al caso", content: "Cas. N.° 626-2022/Lima: uso de arma de fuego y amenaza como elementos de agravación. R. N.° 1543-2022: valoración convergente del video y el testimonio." },
  { id: "doctrina", type: "Doctrina", title: "Doctrina recomendada", subtitle: "Artículos y autores clave", content: "Revisión del apoderamiento ilegítimo, disponibilidad potencial del bien y dolo de aprovechamiento en delitos patrimoniales." },
  { id: "normativa", type: "Normativa", title: "Normativa aplicable", subtitle: "Leyes y disposiciones vigentes", content: "Código Penal, arts. 188 y 189; Código Procesal Penal, arts. 159, 160, 313 y 314; reglas de cadena de custodia." }
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
  activeReading: null,
  searchQuery: "",
  sidebarOpen: false,
  temporaryDocument: null,
  documentStatus: "idle",
  documentNotice: "",
  isAnalyzing: false
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

function loadState() {
  try {
    localStorage.removeItem("bibliotecaFiscalInteligente.aiModel");
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
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
    appState.lastAI = null;
    delete appState.aiModels;
    delete appState.selectedModel;
    saveState();
  } catch (error) {
    console.warn("No se pudo recuperar la sesión local.", error);
  }
}

function saveState() {
  const { temporaryDocument, documentStatus, documentNotice, isAnalyzing, uploadedFiles, lastAI, aiModels, selectedModel, ...persistable } = appState;
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

async function askAI(question) {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      extractedDocumentText: appState.temporaryDocument?.text || "",
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
  const fileInput = document.getElementById("file-input");
  const libraryFileInput = document.getElementById("library-file-input");
  if (fileInput) fileInput.value = "";
  if (libraryFileInput) libraryFileInput.value = "";
  saveState();
  if (render) renderApp();
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
  app.innerHTML = `<div class="app-shell">${renderSidebar()}<main class="main-shell">${renderTopbar()}<div class="content"><div class="mobile-notice">Para una mejor experiencia, se recomienda visualizar esta demo en modo web escritorio.</div>${renderSection(appState.activeSection)}</div></main>${renderMobileBar()}</div>`;
  if (appState.activeSection === "analisis" && appState.activeWorkspacePanel === "map") initCaseMap();
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
  return `<div class="dashboard-grid">
    <div class="primary-column">
      <section class="card library-card">
        <div class="library-head"><div class="library-title"><span class="round-icon">${icon("i-book")}</span><div><h2>Analizador jurídico-documental</h2><p>Organiza fuentes, profundiza en argumentos y estudia tu caso con apoyo inteligente.</p></div></div></div>
        <img class="library-visual" src="${asset("study")}" alt="Libros jurídicos, lámpara y libro abierto">
        ${renderDropZone()}
        <form class="ai-question" id="ai-form"><label for="ai-input">${icon("i-ai")} Pregunta a la IA sobre tu caso o documento</label><div class="ai-row"><input id="ai-input" autocomplete="off" placeholder="Ej.: Resume el documento y señala riesgos jurídicos." value="" ${appState.isAnalyzing ? "disabled" : ""}><button class="send-btn" type="submit" aria-label="Enviar pregunta" ${appState.isAnalyzing ? "disabled" : ""}>${icon("i-open")}</button></div>${renderAIStatus()}</form>
        <div class="quick-actions">${quickActionButton("summary", "i-book", "Resumir expediente")}${quickActionButton("compare", "i-scale", "Comparar criterios")}${quickActionButton("evidence", "i-search", "Extraer evidencias")}${quickActionButton("map", "i-map", "Generar mapa del caso")}</div>
        <div class="workspace-output" id="workspace-output">${renderWorkspaceOutput()}</div>
      </section>
      ${renderStudyRoute()}
    </div>
    <aside class="right-column">${renderCaseCard()}${renderReadingsCard()}${renderNotesCard()}</aside>
  </div>`;
}

function renderDropZone() {
  const hasDocument = Boolean(appState.temporaryDocument);
  return `<div class="upload-wrap"><label class="drop-zone ${hasDocument ? "has-temp-file" : ""}" id="drop-zone">${icon("i-upload", "Cargar archivos")}<span><strong>${hasDocument ? "Documento temporal preparado" : "Arrastra y suelta un documento aquí"}</strong><small>PDF, DOCX, TXT o CSV · Máx. 4 MB</small><small class="privacy-note">Los documentos se procesan temporalmente y no se almacenan en esta demo.</small></span><input id="file-input" type="file" accept=".pdf,.docx,.txt,.csv" aria-label="Seleccionar documento" ${appState.isAnalyzing ? "disabled" : ""}></label>${hasDocument || appState.documentNotice ? `<div class="document-temp-panel"><strong>${escapeHTML(appState.documentNotice || "Documento listo para análisis.")}</strong>${hasDocument ? `<p>${escapeHTML(appState.temporaryDocument.summary)}</p>` : ""}<button class="secondary-btn" data-action="clear-document" type="button">Limpiar documento</button></div>` : ""}</div>`;
}

function renderAIStatus() {
  const statusText = appState.isAnalyzing ? "Analizando documento..." : appState.temporaryDocument ? "Analizador documental listo" : "IA documental activa";
  return `<div class="ai-status-row"><span>${escapeHTML(statusText)}</span><small>Modo demo gratuito</small></div>`;
}

function quickActionButton(action, iconName, label) {
  return `<button class="action-btn" data-quick-action="${action}">${icon(iconName)}<span>${label}</span></button>`;
}

function renderWorkspaceOutput() {
  if (appState.activeWorkspacePanel === "dashboard" && !appState.lastAI) return `<div class="output-grid"><div class="output-item"><strong>Caso preparado</strong><p>MP-2024-01567 tiene 12 evidencias y 3 actuaciones pendientes.</p></div><div class="output-item"><strong>Foco sugerido</strong><p>Contrastar video, testimonio y acta de incautación.</p></div><div class="output-item"><strong>Normas clave</strong><p>Arts. 188 y 189 del Código Penal.</p></div><div class="output-item"><strong>Próximo hito</strong><p>Solicitud de formalización de investigación.</p></div></div>`;
  if (appState.activeWorkspacePanel === "typing") return `<div class="typing">Analizando el caso <i></i><i></i><i></i></div>`;
  if (appState.activeWorkspacePanel === "ai" && appState.lastAI) return renderAnalyticalResponse(appState.lastAI);
  if (appState.activeWorkspacePanel === "summary") return outputPanel(["Antecedentes|Investigación por robo agravado ocurrido en establecimiento comercial.", "Hechos relevantes|Amenaza con arma, sustracción y huida; existen registros audiovisuales.", "Estado procesal|Etapa de formalización con diligencias pendientes.", "Pendientes|Validar pericia, extracción celular y cadena de custodia."]);
  if (appState.activeWorkspacePanel === "compare") return outputPanel(["Jurisprudencia|Uso de arma y amenaza como agravantes con corroboración convergente.", "Doctrina|Apoderamiento y disponibilidad potencial del bien sustraído.", "Normativa|Código Penal 188-189 y CPP 159-160.", "Criterio aplicable|Corroboración periférica entre video, testimonio e incautación.", "Riesgo interpretativo|Debilidad en identificación o ruptura de custodia."]);
  if (appState.activeWorkspacePanel === "evidence") return outputPanel(["Documento|Acta de incautación y parte policial.", "Testimonio|Declaración de la víctima y testigos.", "Pericia|Extracción forense del celular recuperado.", "Cadena de custodia|Revisar continuidad y responsables.", "Contradicción|Diferencia horaria entre acta y metadatos.", "Observación crítica|Vincular cada hallazgo con un elemento del tipo penal."]);
  if (appState.activeWorkspacePanel === "reading" && appState.activeReading) {
    const reading = SUGGESTED_READINGS.find(item => item.id === appState.activeReading);
    return `<div class="output-item"><strong>${reading.type}: ${reading.title}</strong><p>${reading.content}</p></div>`;
  }
  if (appState.activeWorkspacePanel === "map") return `<div class="output-item"><strong>Mapa del caso listo</strong><p>Abre Análisis del caso para mover nodos, revisar relaciones y guardar posiciones.</p><button class="secondary-btn" data-action="open-map" style="margin-top:8px">Abrir mapa interactivo</button></div>`;
  return "";
}

function outputPanel(items) {
  return `<div class="output-grid">${items.map(item => { const [title, text] = item.split("|"); return `<div class="output-item"><strong>${title}</strong><p>${text}</p></div>`; }).join("")}</div>`;
}

function renderAnalyticalResponse(result) {
  return `<div class="output-item answer-card" data-searchable="${escapeHTML(result.answer || "")}"><div class="answer-head"><strong>Respuesta IA</strong><div class="answer-actions"><button class="secondary-btn compact-btn" data-action="copy-answer" type="button">Copiar respuesta</button><button class="secondary-btn compact-btn" data-action="clear-analysis" type="button">Limpiar análisis</button></div></div><p style="white-space:pre-wrap">${escapeHTML(result.answer || "No se obtuvo respuesta.")}</p>${result.documentWasTemporary ? `<small class="privacy-note">Documento analizado temporalmente. No fue almacenado.</small>` : ""}</div>`;
}

function renderStudyRoute() {
  const steps = ["Comprender hechos", "Revisar normas", "Analizar tesis", "Preparar estrategia"];
  return `<section class="card study-route"><h2>Ruta de estudio</h2><p>Sigue un método estructurado para dominar tu caso paso a paso.</p><div class="study-steps">${steps.map((label, index) => `<button class="study-step ${appState.activeStudyStep === index + 1 ? "active" : ""}" data-study-step="${index + 1}"><span class="step-number">${index + 1}</span><span>${label}</span></button>`).join("")}</div></section>`;
}

function renderCaseCard() {
  return `<section class="card side-card case-card" data-searchable="${CASE_DATA.id} ${CASE_DATA.crime}"><div class="side-card-head"><h2>Caso activo</h2>${icon("i-folder")}</div><div class="case-id">${CASE_DATA.id}</div><p class="case-crime">${CASE_DATA.crime}</p><p class="side-meta">Actualizado ${CASE_DATA.updated.toLowerCase()}</p><button class="primary-btn" data-action="case-details">Ver detalles del caso</button></section>`;
}

function renderReadingsCard() {
  const icons = { jurisprudencia: "i-scale", doctrina: "i-book", normativa: "i-document" };
  return `<section class="card side-card readings-card"><div class="side-card-head"><h2>Lecturas sugeridas</h2>${icon("i-book")}</div>${SUGGESTED_READINGS.map(item => `<button class="reading-item" data-reading="${item.id}" data-searchable="${item.title} ${item.subtitle} ${item.content}">${icon(icons[item.id])}<span><strong>${item.title}</strong><small>${item.subtitle}</small></span><span>›</span></button>`).join("")}</section>`;
}

function renderNotesCard() {
  return `<section class="card side-card notes-card"><div class="side-card-head"><h2>Notas rápidas</h2>${icon("i-edit")}</div><ul class="note-preview">${appState.notes.slice(0, 4).map(note => `<li data-searchable="${escapeHTML(note)}">${escapeHTML(note)}</li>`).join("")}</ul><button class="text-link" data-section="notas">Ir a mis notas →</button></section>`;
}

function renderLibrarySection() {
  const docs = [
    { title: "Acta de incautación AI-2024-01567-01", type: "PDF · Evidencia", date: "15/04/2024" },
    { title: "Código Penal: arts. 188 y 189", type: "Normativa", date: "Guardado" },
    { title: "Cas. N.° 626-2022/Lima", type: "Jurisprudencia", date: "Relevante" }
  ];
  return `<section class="section-shell"><div class="section-header"><div><h2>Biblioteca IA</h2><p>Consulta y organiza tus documentos y fuentes jurídicas.</p></div><button class="primary-btn" data-action="upload-trigger">Analizar documento</button></div><div class="section-body"><div class="card panel"><div class="filter-row"><button class="filter-chip active" data-library-filter="todos">Todos</button><button class="filter-chip" data-library-filter="Documento">Documentos</button><button class="filter-chip" data-library-filter="Normativa">Normativa</button><button class="filter-chip" data-library-filter="Jurisprudencia">Jurisprudencia</button></div><p class="privacy-note">Los documentos cargados para análisis se procesan temporalmente y no se agregan a esta biblioteca.</p><div class="panel-scroll"><div class="document-grid" id="document-grid">${docs.map(doc => `<button class="doc-card" data-doc-type="${doc.type}" data-action="open-document" data-searchable="${escapeHTML(doc.title)} ${escapeHTML(doc.type)}"><span class="nav-icon">${icon("i-document")}</span><strong>${escapeHTML(doc.title)}</strong><small>${escapeHTML(doc.type)} · ${escapeHTML(doc.date || "Hoy")}</small></button>`).join("")}</div></div><input hidden id="library-file-input" type="file" accept=".pdf,.docx,.txt,.csv"></div><aside class="card panel"><h3>Lecturas sugeridas</h3>${SUGGESTED_READINGS.map(item => `<button class="reading-item" data-reading="${item.id}" data-searchable="${item.title} ${item.content}">${icon(item.id === "jurisprudencia" ? "i-scale" : item.id === "doctrina" ? "i-book" : "i-document")}<span><strong>${item.title}</strong><small>${item.type}</small></span><span>›</span></button>`).join("")}</aside></div></section>`;
}

function renderAnalysisSection() {
  if (appState.activeWorkspacePanel === "map") return renderMapSection();
  return `<section class="section-shell"><div class="section-header"><div><h2>Análisis del caso</h2><p>${CASE_DATA.id} · ${CASE_DATA.crime} · ${CASE_DATA.stage}</p></div><div class="section-tools"><button class="secondary-btn" data-action="simulate-save">Guardar análisis</button><button class="primary-btn" data-action="open-map">Mapa del caso</button></div></div><div class="section-body"><div class="card panel"><div class="panel-scroll"><div class="analysis-grid"><article class="analysis-card"><h3>Hechos</h3><p>El investigado habría ingresado armado al establecimiento, amenazado a la víctima y sustraído dinero y celulares.</p></article><article class="analysis-card"><h3>Teoría jurídica</h3><p>Apoderamiento ilegítimo mediante amenaza con arma, con ánimo de lucro y perjuicio patrimonial.</p></article><article class="analysis-card"><h3>Evidencias</h3><ul><li>Video de cámara</li><li>Extracción de celular</li><li>Acta de incautación</li><li>Declaración de la víctima</li></ul></article><article class="analysis-card"><h3>Puntos débiles</h3><ul><li>Cadena de custodia</li><li>Precisión de la identificación</li><li>Correspondencia de horarios</li></ul></article><button class="analysis-card map-launch" data-action="open-map"><h3>Mapa dinámico</h3><p>Relaciona hechos, sujetos, evidencias, normas, riesgos y acciones.</p></button><article class="analysis-card"><h3>Próximas acciones</h3><p>Validar metadatos, completar pericia y preparar solicitud de formalización.</p></article></div></div></div><aside class="card panel"><h3>Asistencia IA-Legal</h3><p style="font:12px/1.5 Arial,sans-serif;color:#5f6865">Selecciona un enfoque para profundizar el análisis.</p><div class="filter-row"><button class="prompt-chip" data-prompt="¿Qué contradicciones debo priorizar?">Contradicciones</button><button class="prompt-chip" data-prompt="¿Qué norma fortalece la imputación?">Normativa</button><button class="prompt-chip" data-prompt="¿Qué evidencia falta?">Evidencia faltante</button></div><form id="side-ai-form"><input class="panel-input" id="side-ai-input" placeholder="Pregunta sobre el caso" ${appState.isAnalyzing ? "disabled" : ""}><div class="ai-status-row"><span>IA documental activa</span><small>Modo demo gratuito</small></div><button class="primary-btn" style="margin-top:8px;width:100%" ${appState.isAnalyzing ? "disabled" : ""}>Analizar</button></form><div id="side-ai-response" class="output-item" style="margin-top:10px"><strong>Lectura inicial</strong><p>La teoría presenta coherencia; conviene reforzar identificación y continuidad de custodia.</p></div></aside></div></section>`;
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
  setDocumentStatus("extracting", "Extrayendo texto...");
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
    appState.uploadedFiles = [];
    appState.documentStatus = "ready";
    appState.documentNotice = truncated.truncated
      ? "El documento fue recortado para la demo. Usa una versión resumida o divide el archivo."
      : "Analizador documental listo.";
    addHistoryEvent({ action: "Documento preparado", section: appState.activeSection, description: "Documento temporal listo para análisis." });
    saveState();
    renderApp();
    showToast("Documento temporal listo para analizar.", "success");
  } catch (error) {
    clearTemporaryDocument({ render: false });
    appState.documentNotice = error.message || "No se pudo extraer texto legible del documento. Intenta con PDF con texto seleccionable, DOCX, TXT o CSV.";
    renderApp();
    showToast(appState.documentNotice, "warn");
  }
}

async function handleAIQuestion(question) {
  const clean = question.trim();
  if (!clean) return showToast("Escribe una pregunta para iniciar el análisis.", "warn");
  if (appState.isAnalyzing) return showToast("El análisis ya está en curso.", "warn");
  if (appState.temporaryDocument && !appState.temporaryDocument.text) {
    return showToast("No se pudo extraer texto legible del documento. Intenta con PDF con texto seleccionable, DOCX, TXT o CSV.", "warn");
  }
  const hadDocument = Boolean(appState.temporaryDocument?.text);
  if (hadDocument) appState.documentNotice = "Analizando documento...";
  appState.isAnalyzing = true;
  appState.activeWorkspacePanel = "typing";
  renderApp();
  try {
    const result = await askAI(clean);
    appState.lastAI = { question: clean, answer: result.answer, createdAt: Date.now(), documentWasTemporary: hadDocument };
    clearTemporaryDocument({ render: false });
    appState.documentNotice = hadDocument ? "Documento analizado temporalmente. No fue almacenado." : "";
    appState.isAnalyzing = false;
    appState.activeWorkspacePanel = "ai";
    addHistoryEvent({ action: "Consulta a IA-Legal", section: "inicio", description: clean });
    saveState();
    renderApp();
    showToast("Análisis con IA completado.", "success");
  } catch (error) {
    appState.isAnalyzing = false;
    appState.activeWorkspacePanel = "dashboard";
    saveState();
    renderApp();
    showToast(error.message || "No se pudo completar el análisis con IA.", "warn");
  }
}

function renderQuickAction(actionName) {
  appState.activeWorkspacePanel = actionName;
  addHistoryEvent({ action: "Acción rápida", section: "inicio", description: ({ summary: "Resumir expediente", compare: "Comparar criterios", evidence: "Extraer evidencias", map: "Generar mapa del caso" })[actionName] });
  saveState();
  renderApp();
  showToast("Espacio de análisis actualizado.", "success");
}

function openCaseDetails() {
  document.getElementById("modal").innerHTML = `<section class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="case-title"><div class="modal-head"><h2 id="case-title">${CASE_DATA.id}</h2><button class="icon-btn" data-action="close-modal" aria-label="Cerrar">×</button></div><div class="detail-grid"><div class="detail-box"><strong>Datos generales</strong><p>${CASE_DATA.crime} · ${CASE_DATA.stage}<br>Fiscal responsable: ${CASE_DATA.prosecutor}</p></div><div class="detail-box"><strong>Delito investigado</strong><p>Robo agravado mediante amenaza y uso de arma.</p></div><div class="detail-box"><strong>Sujetos procesales</strong><p>${CASE_DATA.subjects}</p></div><div class="detail-box"><strong>Actuaciones pendientes</strong><p>${CASE_DATA.pending}</p></div><div class="detail-box" style="grid-column:1/-1"><strong>Alertas críticas</strong><p>${CASE_DATA.alerts}</p></div></div></section>`;
  addHistoryEvent({ action: "Detalle de caso abierto", section: appState.activeSection, description: CASE_DATA.id });
}

function closeModal() {
  document.getElementById("modal").innerHTML = "";
}

function renderReadingPanel(type) {
  const reading = SUGGESTED_READINGS.find(item => item.id === type);
  if (!reading) return;
  appState.activeSection = "inicio";
  appState.activeReading = type;
  appState.activeWorkspacePanel = "reading";
  addHistoryEvent({ action: "Lectura abierta", section: "biblioteca", description: reading.title });
  saveState();
  renderApp();
  showToast(`${reading.type} abierta en el espacio central.`);
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
    const quick = event.target.closest("[data-quick-action]");
    if (quick) return renderQuickAction(quick.dataset.quickAction);
    const reading = event.target.closest("[data-reading]");
    if (reading) return renderReadingPanel(reading.dataset.reading);
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
    const filter = event.target.closest("[data-library-filter]");
    if (filter) {
      document.querySelectorAll("[data-library-filter]").forEach(btn => btn.classList.toggle("active", btn === filter));
      document.querySelectorAll("[data-doc-type]").forEach(doc => { doc.hidden = filter.dataset.libraryFilter !== "todos" && !doc.dataset.docType.includes(filter.dataset.libraryFilter); });
      return;
    }
    const prompt = event.target.closest("[data-prompt]");
    if (prompt) { const input = document.getElementById("side-ai-input"); if (input) { input.value = prompt.dataset.prompt; input.focus(); } return; }
    const node = event.target.closest("[data-node-id]");
    if (node) { appState.selectedMapNode = node.dataset.nodeId; saveState(); renderApp(); return; }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    if (action === "toggle-sidebar") { appState.sidebarOpen = !appState.sidebarOpen; renderApp(); }
    if (action === "case-details") openCaseDetails();
    if (action === "close-modal") closeModal();
    if (action === "upload-trigger") document.getElementById("library-file-input")?.click();
    if (action === "open-document") showToast("Vista previa simulada del documento.");
    if (action === "user-menu") showToast("Sesión demo: Doctor · caso activo MP-2024-01567");
    if (action === "add-note") { appState.notes.push(""); saveState(); renderApp(); document.querySelector("[data-note-index]:last-of-type")?.focus(); }
    if (action === "simulate-save") { addHistoryEvent({ action: "Análisis guardado", section: "analisis", description: "Se actualizó el análisis del caso." }); showToast("Análisis guardado localmente.", "success"); }
    if (action === "open-map") { appState.activeSection = "analisis"; appState.activeWorkspacePanel = "map"; saveState(); renderApp(); }
    if (action === "close-map") { appState.activeWorkspacePanel = "dashboard"; saveState(); renderApp(); }
    if (action === "reset-map") resetCaseMap();
    if (action === "clear-history") { appState.history = []; saveState(); renderApp(); showToast("Historial local limpiado."); }
    if (action === "clear-document") { clearTemporaryDocument(); showToast("Documento temporal limpiado."); }
    if (action === "clear-analysis") { appState.lastAI = null; appState.activeWorkspacePanel = "dashboard"; saveState(); renderApp(); showToast("Análisis limpiado."); }
    if (action === "copy-answer") {
      const answer = appState.lastAI?.answer || "";
      if (!answer) return showToast("No hay respuesta para copiar.", "warn");
      if (!navigator.clipboard) return showToast("Copia no disponible en este navegador.", "warn");
      navigator.clipboard.writeText(answer).then(() => showToast("Respuesta copiada.", "success")).catch(() => showToast("No se pudo copiar la respuesta.", "warn"));
    }
  });

  document.addEventListener("submit", async event => {
    if (event.target.id === "ai-form") { event.preventDefault(); handleAIQuestion(document.getElementById("ai-input").value); }
    if (event.target.id === "side-ai-form") {
      event.preventDefault();
      const input = document.getElementById("side-ai-input");
      const response = document.getElementById("side-ai-response");
      if (!input.value.trim()) return showToast("Escribe una consulta.", "warn");
      if (appState.isAnalyzing) return showToast("El análisis ya está en curso.", "warn");
      const hadDocument = Boolean(appState.temporaryDocument?.text);
      appState.isAnalyzing = true;
      response.innerHTML = `<div class="typing">Analizando <i></i><i></i><i></i></div>`;
      try {
        const result = await askAI(input.value.trim());
        response.innerHTML = `<strong>Respuesta IA</strong><p style="white-space:pre-wrap">${escapeHTML(result.answer)}</p>${hadDocument ? `<small class="privacy-note">Documento analizado temporalmente. No fue almacenado.</small>` : ""}`;
        clearTemporaryDocument({ render: false });
        appState.isAnalyzing = false;
        addHistoryEvent({ action: "Consulta en análisis", section: "analisis", description: input.value.trim() });
        showToast("Análisis con IA completado.", "success");
      } catch (error) {
        appState.isAnalyzing = false;
        response.innerHTML = `<strong>No se pudo completar el análisis</strong><p>${escapeHTML(error.message || "Intenta nuevamente en unos minutos.")}</p>`;
        showToast(error.message || "No se pudo completar el análisis con IA.", "warn");
      }
    }
  });

  document.addEventListener("input", event => {
    if (event.target.id === "global-search") handleSearch(event.target.value);
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
  window.addEventListener("resize", () => { if (appState.activeWorkspacePanel === "map") drawMapConnectors(); });
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
window.renderQuickAction = renderQuickAction;
window.openCaseDetails = openCaseDetails;
window.renderReadingPanel = renderReadingPanel;
window.renderNotes = renderNotes;
window.saveNotes = saveNotes;
window.addHistoryEvent = addHistoryEvent;
window.initCaseMap = initCaseMap;
window.enableDragForNodes = enableDragForNodes;
window.resetCaseMap = resetCaseMap;

document.addEventListener("DOMContentLoaded", initApp, { once: true });
