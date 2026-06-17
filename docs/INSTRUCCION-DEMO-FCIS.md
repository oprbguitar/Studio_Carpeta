You are working inside this project route:

<PASTE_YOUR_PROJECT_ROUTE_HERE>

Build the first static web demo for the product:

“Herramientas para el Fiscal / FCIS”
Fiscal Case Intelligence System — production preliminary demo.

This is a high-fidelity static product demo, not a backend MVP.

The purpose is to create a professional, responsive, no-scroll, GitHub Pages compatible web page that visually recreates the provided reference screens as real HTML/CSS/JavaScript components.

Important:
The reference screenshots are visual guides only. Do NOT render the screenshots as full-page images. Do NOT create a slideshow of screenshots. The UI must be rebuilt with real cards, panels, menus, tabs, buttons, KPI tiles, canvas boards, badges, connectors and detail panels.

============================================================
1. PROJECT CONTEXT
============================================================

This product assists a prosecutor in structuring and managing the theory of a criminal case.

The system concept is based on:
- Theory of the case.
- Fiscal investigation.
- Factual theory.
- Legal theory.
- Probatory theory.
- Evidence and evidentiary means.
- Weakness detection.
- Next best action planning.

For this first version, build only a static demo.

No database.
No backend.
No authentication.
No API calls.
No external dependencies.
No real case data.
No real personal data.

The demo must use fictional data only.

Fictional case:
- Case ID: MP-2024-01567
- Crime: Robo Agravado
- Prosecutor role: Fiscal Provincial
- Institution label: Herramientas para el Fiscal
- Product acronym: FCIS

The real system concept:
The complete system will start from an input such as a complaint, police report, act, fiscal document or initial theory. It will first generate an internal Markdown analysis without spending API tokens. External AI/API consultation will only happen when the case becomes complex or requires legal/normative support. This message must appear discreetly in the demo.

Use this exact note somewhere discreet in the interface:

“Demo estático. No procesa datos reales. El sistema real parte de un insumo, genera análisis interno en Markdown y consulta fuentes externas solo cuando el caso escala o requiere fundamentación normativa.”

============================================================
2. FILES TO READ FIRST
============================================================

Read these files first and use them as conceptual and functional guidance:

- docs/INSTRUCCION-DEMO-FCIS.md
- docs/GUIA-PRODUCCION-PRELIMINAR.md
- docs/teoria-del-caso.md

Use these images only as visual references:

- reference-screens/01-inicio.png
- reference-screens/02-proxima-opcion.png
- reference-screens/03-tipificacion-juridica.png
- reference-screens/04-medios-probatorios.png
- reference-screens/05-hipotesis-fiscal.png
- reference-screens/06-evidencias.png
- reference-screens/07-elementos-del-delito.png

If some screenshots are missing, reconstruct the missing screen from the specification below.

Do not copy the images into the visible UI as the main screen.
Do not use <img> to show full-screen screenshots.
Only use the screenshots to reproduce layout, spacing, colors and components.

============================================================
3. OUTPUT STRUCTURE
============================================================

Create or update this structure:

demo-fcis/
├── index.html
├── README.md
├── docs/
│   ├── INSTRUCCION-DEMO-FCIS.md
│   ├── GUIA-PRODUCCION-PRELIMINAR.md
│   └── teoria-del-caso.md
├── reference-screens/
│   ├── 01-inicio.png
│   ├── 02-proxima-opcion.png
│   ├── 03-tipificacion-juridica.png
│   ├── 04-medios-probatorios.png
│   ├── 05-hipotesis-fiscal.png
│   ├── 06-evidencias.png
│   └── 07-elementos-del-delito.png
└── assets/
    └── README.md

For this first version, index.html may contain all HTML, CSS and JavaScript in one file.

The page must work by opening index.html directly.
It must also work on GitHub Pages.

============================================================
4. HARD TECHNICAL RULES
============================================================

Use:
- HTML5
- CSS3
- Vanilla JavaScript only

Do not use:
- React
- Vue
- Angular
- Tailwind
- Bootstrap
- Vite
- Node build step
- External fonts
- External icons
- External APIs
- CDN dependencies
- Database
- Backend
- Authentication

The demo must be fully static.

All icons must be created using:
- simple inline SVG,
- Unicode symbols,
- CSS shapes,
- or minimal text-based icons.

Do not use third-party logos, institutional seals or copyrighted assets unless explicitly provided by the project owner.

Any logo used in this demo must be original, generic or created as a simple SVG/CSS emblem.

============================================================
5. NO-SCROLL RULE
============================================================

The page must be a true no-scroll web page.

Mandatory:
- html and body must use height: 100%;
- body must use overflow: hidden;
- each screen must fit inside the viewport;
- no vertical page scrolling on desktop;
- no full-page scrollbars;
- no long content pushing the viewport.

Use this foundation:

html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

#app {
  height: 100vh;
  overflow: hidden;
}

Each screen must fit inside 100vh.

Use:
- compact grids,
- responsive scaling,
- reduced gaps,
- smaller cards when needed,
- right detail panels,
- internal compact zones,
- hidden overflow only where unavoidable,
- text truncation with ellipsis where necessary.

Important desktop test sizes:
- 1366x768
- 1440x900
- 1920x1080

The layout must not require vertical scrolling in these sizes.

============================================================
6. RESPONSIVE AND MOBILE-FRIENDLY REQUIREMENTS
============================================================

The web page must be responsive and mobile-friendly.

On mobile:
- Compress or collapse the sidebar.
- Reduce card size.
- Reduce font sizes slightly.
- Use compact panels.
- Keep the interface readable.
- Preserve the no-scroll rule as much as possible.
- Do not break the screen with overflowing cards.
- Use horizontal compact navigation if necessary.
- Detail panels may become overlays or bottom sheets.
- The demo must remain usable on mobile.

However, the best visual experience is desktop mode.

On small screens, show this discreet notice:

“Para una mejor experiencia, se recomienda visualizar esta demo en modo web escritorio.”

This notice must not block navigation.

============================================================
7. VISUAL STYLE
============================================================

Recreate the visual identity from the screenshots.

General style:
- Institutional
- Clean
- Premium
- Minimalist
- White interface
- Navy blue primary color
- Gold accent
- Soft shadows
- Rounded cards
- Thin borders
- High readability
- Dashboard / legal case management aesthetic

Recommended palette:

:root {
  --navy-950: #061b3a;
  --navy-900: #08245c;
  --navy-800: #0b3475;
  --navy-700: #123f91;
  --blue-soft: #eef4ff;
  --gold-600: #c9921e;
  --gold-500: #d9a331;
  --green-600: #219653;
  --red-600: #d64545;
  --orange-500: #e69500;
  --text-main: #0a1f44;
  --text-muted: #62708a;
  --border-soft: #dfe7f3;
  --bg-main: #f7f9fd;
  --white: #ffffff;
  --shadow-soft: 0 8px 24px rgba(6, 27, 58, 0.08);
}

Typography:
- Use system fonts only.
- Prefer Inter-like system stack:
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
- Titles must be bold, navy, clean.
- Body text must be compact and readable.

Components:
- Sidebar with logo and menu.
- Topbar with breadcrumbs/search/icons/user.
- KPI cards.
- Canvas cards.
- Module cards.
- Detail panel.
- Tabs.
- Badges.
- Status pills.
- Progress bars.
- Circular percentage indicators.
- Connectors between cards using CSS or SVG.
- Buttons with navy/gold styling.
- Toast notifications.

============================================================
8. LEGAL AND OWNERSHIP NOTICE
============================================================

Add a discreet but visible legal notice in the interface.

It may appear in:
- footer,
- sidebar bottom,
- about panel,
- or bottom status strip.

The line must read exactly:

“© 2026 Pierre R. Todos los derechos reservados. Contacto: peru.labs.pe@gmail.com”

Also include in README.md:

“© 2026 Pierre R. Todos los derechos reservados. Contacto: peru.labs.pe@gmail.com”

Do not alter this wording.

============================================================
9. PRODUCT ARCHITECTURE
============================================================

Create a single-page static application.

Use a JavaScript object called DEMO_DATA.

DEMO_DATA must include:
- case metadata
- dashboard KPIs
- modules
- facts
- crime elements
- legal classification
- evidence
- evidentiary means
- fiscal hypothesis
- weak points
- next actions
- narration text
- screen metadata
- statuses
- detail panel information

Create reusable rendering functions:
- renderApp()
- renderSidebar()
- renderTopbar()
- renderScreen(screenId)
- renderDashboard()
- renderElementsScreen()
- renderTipificacionScreen()
- renderEvidenciasScreen()
- renderMediosScreen()
- renderHipotesisScreen()
- renderPuntosDebilesScreen()
- renderProximaOpcionScreen()
- renderTabs()
- renderKpiCard()
- renderBadge()
- renderDetailPanel()
- renderToast()

Navigation:
- Use state.currentScreen.
- Do not reload the page.
- Sidebar items switch screens.
- Dashboard module cards open related screens.
- Breadcrumbs update by screen.
- Right detail panels update when cards are clicked.
- Buttons show toast messages if the backend function is not implemented.

============================================================
10. REQUIRED SCREENS
============================================================

Implement these 8 screens as real UI:

1. Inicio / Dashboard
2. Hechos del Caso
3. Elementos del Delito
4. Tipificación Jurídica
5. Evidencias
6. Medios Probatorios
7. Hipótesis Fiscal
8. Puntos Débiles
9. Próxima Opción

Note:
The original route mentions 8 screens, but include Hechos del Caso as a real module because it is essential to the theory-of-case flow. If fitting all modules into the sidebar is difficult, keep all 9 navigable modules but the dashboard may show the main 8 cards.

============================================================
11. GLOBAL LAYOUT
============================================================

Use this global layout:

- Left sidebar:
  - Logo/emblem.
  - Product name: Herramientas para el Fiscal.
  - Menu:
    - Inicio
    - Gestión de casos
    - Teoría de Caso
      - Canvas de Teoría
      - Hechos del Caso
      - Elementos del Delito
      - Hipótesis Fiscal
      - Evidencias
      - Medios Probatorios
      - Tipificación Jurídica
      - Análisis y Argumentos
      - Puntos Débiles
      - Próxima Opción
      - Conclusión Preliminar
    - Guía del Fiscal
    - Jurisprudencia
    - Normativa
    - Plantillas
    - Historial
  - Case card:
    - Caso activo
    - MP-2024-01567
    - Delito: Robo Agravado
    - Ver detalles
  - Legal notice at bottom if space allows.

- Main area:
  - Topbar:
    - Breadcrumbs
    - Optional search icon/input
    - Notification icon
    - Help icon
    - User chip: FP / Fiscal Provincial
  - Screen header:
    - Title
    - Subtitle
    - Action buttons
  - Tabs
  - KPI row
  - Main canvas area
  - Right detail panel where required
  - Bottom action/export area

Keep the UI dense but clean.

============================================================
12. SCREEN 1 — INICIO / DASHBOARD
============================================================

Build a dashboard similar to the first screenshot.

Header:
- Title: Herramientas para el Fiscal
- Search placeholder:
  “Buscar expedientes, personas, documentos, audiencias...”
- User: Fiscal Provincial

KPI row:
- Casos activos: 124, “+8 desde ayer”
- Audiencias hoy: 6, “Próxima: 09:30 a. m.”
- Alertas: 4, “2 urgentes”
- Pendientes: 9, “Requieren atención”

Main central panel:
Title:
“Módulos clave del caso”

Subtitle:
“Ingresa a cada módulo para construir y fortalecer tu teoría del caso.”

Button:
“Ver mapa completo”

Module cards in 2 rows:
- Hechos del caso — Completo
- Elementos del delito — Completo
- Hipótesis fiscal — En análisis
- Evidencias — Completo
- Medios probatorios — En análisis
- Tipificación jurídica — Prioritario
- Puntos débiles — Prioritario
- Próxima opción — Actualizar

Each card:
- icon
- title
- short description
- status badge
- arrow
- clickable

Use CSS/SVG dotted connectors between cards if possible.

Right panel:
Title:
“Guía del caso”

Subtitle:
“Etapas del proceso”

Steps:
1. Recepción de denuncia — completed
2. Hechos del caso — completed
3. Elementos del delito — completed
4. Hipótesis fiscal — En proceso
5. Evidencias
6. Análisis
7. Próxima opción
8. Conclusión

Bottom:
Activity recent list:
- Caso MP-2024-01567 — Se actualizó la tipificación jurídica a Robo Agravado — Hoy, 10:45 a. m.
- Caso EXP-2024-00118 — Nueva evidencia: Acta de inspección técnica policial — Hoy, 09:15 a. m.
- Caso MP-2024-01432 — Audiencia programada: Control de acusación — Ayer, 04:30 p. m.

Quick actions:
- Nuevo caso
- Registrar evidencia
- Generar oficio
- Ver alertas

============================================================
13. SCREEN 2 — HECHOS DEL CASO
============================================================

Title:
“Hechos del Caso”

Subtitle:
“Organiza cronológicamente los hechos relevantes y su conexión con la teoría del caso.”

Tabs:
- Canvas de Hechos
- Línea de tiempo
- Matriz de hechos
- Relación con evidencias

Main canvas:
Create a horizontal timeline with cards:
- H1 — 10:15 — El imputado ingresó al domicilio de la víctima sin autorización.
- H2 — 10:30 — El imputado amenazó con un arma a la víctima para intimidarla.
- H3 — 10:35 — El imputado se apoderó de bienes muebles de propiedad de la víctima.
- H4 — 10:40 — El imputado huyó del lugar para evitar ser detenido.
- H5 — 11:00 — La víctima comunicó el hecho y se inició la intervención.

Each fact card:
- code H1-H5
- time
- description
- type badge:
  - Principal
  - Contextual
  - Corroborante
  - Consecuente
- status:
  - Con evidencia
  - Por corroborar

Left mini panel:
“Tipos de hecho”
- Principal
- Contextual
- Corroborante
- Consecuente

Right detail panel:
Show selected fact:
- Código
- Descripción
- Tipo
- Fecha/hora
- Evidencias relacionadas
- Observaciones
- Estado de sustento

Buttons:
- Agregar hecho
- Relacionar evidencia
- Exportar línea de tiempo

============================================================
14. SCREEN 3 — ELEMENTOS DEL DELITO
============================================================

Title:
“Elementos del Delito”

Subtitle:
“Identifica y analiza los elementos que configuran el tipo penal aplicable al caso.”

Actions:
- Ver relaciones
- Agregar elemento

Tabs:
- Canvas de Teoría
- Hechos del Caso
- Elementos del Delito
- Evidencias
- Análisis
- Conclusión

Main canvas:
Create 8 numbered cards in a 2-row grid:

1. Conducta típica
Description:
“El imputado agredió físicamente a la víctima con un objeto contundente, causándole lesiones.”
Status: Verificado

2. Sujeto activo
Description:
“Carlos López, mayor de edad, imputable, quien realizó la conducta descrita de manera voluntaria.”
Status: Verificado

3. Sujeto pasivo
Description:
“María Pérez, mayor de edad, víctima directa de la agresión, titular del bien jurídico protegido.”
Status: Verificado

4. Bien jurídico protegido
Description:
“La integridad física y la salud de las personas, protegida por el ordenamiento jurídico penal.”
Status: Verificado

5. Elemento subjetivo
Description:
“Dolo directo. El imputado actuó con conocimiento y voluntad de causar la lesión a la víctima.”
Status: Verificado

6. Nexo causal
Description:
“Existe relación directa entre la conducta del imputado y la lesión causada a la víctima.”
Status: Verificado

7. Antijuridicidad
Description:
“La conducta es típica y antijurídica, al no estar amparada por causa de justificación alguna.”
Status: Requiere sustento

8. Consumación / resultado
Description:
“Se produjo el resultado lesivo, verificado mediante certificado médico legal.”
Status: Verificado

Use connector arrows between cards.

Right panel:
Title:
“Guía de análisis”

List all 8 elements with status.

Summary:
- 7 Verificados
- 1 Requiere sustento
- 0 Pendientes

Bottom:
Observaciones generales:
“La antijuridicidad requiere mayor sustento respecto a la ausencia de causas de justificación. Se recomienda incorporar declaración del testigo presencial y pericia contextual para reforzar este elemento.”

Información del tipo penal:
- Delito: Lesiones graves
- Base legal: Art. 121 del Código Penal

Buttons:
- Exportar
- Guardar análisis

============================================================
15. SCREEN 4 — TIPIFICACIÓN JURÍDICA
============================================================

Title:
“Tipificación Jurídica”

Subtitle:
“Identifica, analiza y estructura la tipificación jurídica aplicable al caso en función de los hechos y elementos del delito.”

Actions:
- Guía práctica
- Agregar tipificación

Tabs:
- Canvas de Tipificación
- Normativa Aplicable
- Jurisprudencia
- Doctrina
- Comparador de Delitos

KPI row:
1. Delito principal:
   Robo Agravado
   Art. 189° del Código Penal

2. Tipo penal:
   Doloso
   Requiere intención y voluntad de cometer el delito

3. Bien jurídico protegido:
   Patrimonio
   Protección del patrimonio frente a la apropiación ilegítima

4. Grado de afectación:
   Alto
   Con violencia y amenaza sobre la víctima

Main mapping:
Columns:
- Hechos del caso
- Elementos del tipo penal
- Correspondencia con el caso
- Calificación jurídica

Hechos:
- H1: El imputado ingresó al domicilio de la víctima sin autorización.
- H2: El imputado amenazó con un arma a la víctima para intimidarla.
- H3: El imputado se apoderó de bienes muebles de propiedad de la víctima.
- H4: El imputado huyó del lugar con los bienes sustraídos.

Elementos:
- Sujeto activo
- Sujeto pasivo
- Acción típica
- Medios comisivos
- Elemento subjetivo

Correspondencia:
- Acreditado: El imputado es la persona que realiza la conducta típica.
- Acreditado: La víctima es titular de los bienes afectados.
- Acreditado: Se acredita la apoderación de los bienes muebles.
- Acreditado: Existió violencia e intimidación con arma.
- Acreditado: Actuó con conocimiento y voluntad de cometer el delito.

Final card:
Calificación jurídica:
“Robo Agravado”
“Art. 189° Código Penal”
Badge: Delito principal

Add subcards:
- Circunstancias agravantes:
  - Uso de arma
  - Ingreso a lugar habitado
  - Amenaza a la víctima
- Pena conminada:
  - Pena privativa de libertad no menor de 12 ni mayor de 20 años.

Right detail panel:
Title:
“Detalle de la tipificación”

Sections:
- Norma aplicable
- Código Penal – Artículo 189°
- Elementos del tipo penal
- Sujeto activo
- Sujeto pasivo
- Acción típica
- Medios comisivos
- Elemento subjetivo
- Jurisprudencia relevante

Jurisprudence card:
“Casación N° 626-2019, Lima”
“La violencia o amenaza debe ser idónea para vencer la resistencia de la víctima.”

Button:
- Ver más jurisprudencia
- Exportar análisis

============================================================
16. SCREEN 5 — EVIDENCIAS
============================================================

Title:
“Evidencias”

Subtitle:
“Administra y relaciona las evidencias con los hechos y elementos del delito.”

Action:
- Agregar evidencia

Tabs:
- Canvas de Evidencias
- Listado de Evidencias
- Matriz de Evidencia
- Cadena de Custodia

KPI row:
- 18 Evidencias registradas — 12 con relación definida
- 13 Con cadena de custodia — 72% del total
- 24 Relaciones establecidas — Entre evidencias y hechos
- Alto — Fuerza probatoria global

Main canvas:
Title:
“Mapa de relaciones”

Subtitle:
“Arrastra evidencias para relacionarlas con hechos específicos.”

Columns:
1. Hechos del Caso
   - H1
   - H2
   - H3
   - H4

2. Evidencia Documental
   - E1 Acta de inspección técnica policial — Fuerza: Alta
   - E2 Certificado médico legal — Fuerza: Alta
   - E3 Informe pericial de traumatología — Fuerza: Media

3. Evidencia Material
   - E4 Prenda con manchas de sangre — Fuerza: Alta
   - E5 Objeto contundente — Fuerza: Media

4. Evidencia Testimonial
   - E6 Declaración de la víctima — Fuerza: Alta
   - E7 Declaración de testigo presencial — Fuerza: Media
   - E8 Declaración de perito en criminalística — Fuerza: Alta

5. Evidencia Digital
   - E9 Video de cámaras de seguridad — Fuerza: Alta
   - E10 Registro de llamadas del imputado — Fuerza: Media
   - E11 Geolocalización del imputado — Fuerza: Media

Use dotted curved connectors between facts and evidence.

Add a dashed placeholder:
“Arrastra evidencia para relacionar”

Right detail panel:
Selected:
E1 — Acta de inspección técnica policial

Fields:
- Tipo: Documental
- Fecha de obtención: 15/03/2024
- Fuente: Policía Nacional del Perú
- Ubicación física: Carpeta: Actas / Folio 12
- Responsable: OF. Juan Pérez
- Estado: Válida
- Observaciones: Se encuentra en buen estado y legible.
- Relacionada con:
  - H1
  - H3
- Archivo asociado:
  - Acta_Inspeccion_15_03_2024.pdf

Button:
- Editar evidencia
- Exportar mapa

============================================================
17. SCREEN 6 — MEDIOS PROBATORIOS
============================================================

Title:
“Medios Probatorios”

Subtitle:
“Gestiona, clasifica y relaciona los medios probatorios que sustentan tu teoría del caso.”

Actions:
- Guía práctica
- Agregar medio probatorio

Tabs:
- Canvas de Medios
- Listado
- Matriz de Valoración
- Cadena de Custodia
- Faltas de Prueba

KPI row:
- 24 Medios probatorios registrados
- 18 Con conexión directa con hechos
- 7 Corroboran la hipótesis principal
- Alto — Nivel de fortaleza global

Add circular strength indicator:
“78%”
“Alta”
“Basado en la evidencia actual”

Main canvas:
Title:
“Canvas de Medios Probatorios”

Filters:
- Filtrar por tipo
- Relacionar con
- Ver fuerza: Todas

Left column:
Hechos del Caso:
- H1 El imputado ingresó al domicilio de la víctima sin autorización.
- H2 El imputado agredió físicamente a la víctima causándole lesiones.
- H3 El imputado se apoderó de bienes muebles de propiedad de la víctima.
- H4 El imputado huyó del lugar para evitar ser detenido.

Central grid:
- MP-01 Acta de inspección técnica policial — Documental — Fuerza Alta
- MP-02 Declaración de la víctima — Testimonial — Fuerza Alta
- MP-03 Imágenes de cámaras de seguridad — Digital — Fuerza Alta
- MP-04 Informe pericial de lesiones — Pericial — Fuerza Media
- MP-05 Declaración de testigo presencial — Testimonial — Fuerza Alta
- MP-06 Registro de llamadas del imputado — Digital — Fuerza Media
- MP-07 Acta de registro domiciliario — Documental — Fuerza Alta
- MP-08 Certificado médico legal — Documental — Fuerza Alta
- MP-09 Informe de ubicación geográfica GPS — Digital — Fuerza Media

Right column:
Elementos del Delito:
- Conducta
- Tipicidad
- Antijuridicidad
- Culpabilidad

Use connectors:
facts -> evidentiary means -> legal elements.

Right detail panel:
Selected:
MP-01 Acta de inspección técnica policial

Fields:
- Tipo: Documental
- Descripción
- Fecha de obtención: 15/03/2024
- Hora: 09:30 a. m.
- Fuente: Policía Nacional del Perú
- Ubicación física: Carpeta: Actas / Folio 12
- Responsable: OF. Juan Pérez
- Estado: Válido
- Relacionado con:
  - H1
  - E1
  - Conducta
- Archivo asociado:
  - Acta_Inspeccion_15_03_2024.pdf

Button:
- Editar medio probatorio
- Exportar canvas

============================================================
18. SCREEN 7 — HIPÓTESIS FISCAL
============================================================

Title:
“Hipótesis Fiscal”

Subtitle:
“Formula y estructura la hipótesis que el Ministerio Público buscará demostrar en el caso.”

Actions:
- Guía práctica
- Nueva hipótesis

Tabs:
- Canvas de Hipótesis
- Relación con Hechos
- Relación con Evidencias
- Escenarios Alternos

Info box:
Title:
“¿Qué es una hipótesis fiscal?”

Text:
“Es una explicación probable del hecho delictivo, formulada a partir de los hechos conocidos y la normativa aplicable, que orienta la investigación y la presentación del caso.”

Main structure:
Top card:
“Hipótesis Principal”

Text:
“El imputado, actuando con dolo y aprovechando la ausencia de la víctima, se apoderó ilegítimamente de sus bienes muebles con la finalidad de obtener un beneficio económico.”

Below it, four connected columns:

1. Conducta
Description:
“El imputado realizó actos de apoderamiento sobre bienes muebles de propiedad de la víctima.”
Evidence:
- Declaración de la víctima
- Cámaras de seguridad
- Acta de inspección

2. Tipicidad
Description:
“La conducta se adecua al tipo penal de Robo Agravado, previsto en el artículo 189° del Código Penal.”
Evidence:
- Dictamen legal
- Informe pericial

3. Antijuridicidad
Description:
“No existe causa de justificación que elimine la antijuridicidad de la conducta.”
Evidence:
- Declaración del imputado
- Contexto del hecho

4. Culpabilidad
Description:
“El imputado actuó con dolo, consciente de la ilicitud de su conducta y con voluntad de obtener provecho.”
Evidence:
- Declaración del imputado
- Antecedentes del imputado

Bottom:
Hipótesis alternas consideradas:
- A1: El imputado no tuvo intención de apoderarse de los bienes. Status: Baja probabilidad
- A2: Otra persona distinta al imputado habría cometido el hecho. Status: En evaluación

Right detail panel:
Sections:
- Descripción
- Nivel de confianza: 75%
- Objetivo probatorio
- Pruebas críticas
- Acciones pendientes
- Consejo práctico

Pending actions:
- Recabar informe pericial
- Tomar declaración al testigo clave
- Solicitar antecedentes del imputado

Practical advice:
“Una buena hipótesis es clara, precisa, verosímil y comprobable con evidencia.”

Button:
- Exportar

============================================================
19. SCREEN 8 — PUNTOS DÉBILES
============================================================

Title:
“Puntos Débiles”

Subtitle:
“Identifica y analiza las debilidades, vacíos probatorios y aspectos que podrían afectar la teoría del caso.”

Actions:
- Guía práctica
- Agregar punto débil

Tabs:
- Canvas de Puntos Débiles
- Listado
- Matriz de Impacto
- Estrategias de Mitigación
- Historial

KPI row:
- 7 Puntos débiles
- 3 Alto impacto — Críticos
- 2 Impacto medio
- 2 Bajo impacto
- Alto — Nivel de atención

Main canvas:
Title:
“Mapa de Puntos Débiles”

Columns:
1. Hechos del Caso
   - H1 Ingreso al domicilio
   - H2 Amenaza a la víctima
   - H3 Apoderamiento de bienes
   - H4 Huida del lugar

2. Elementos del Delito
   - Conducta
   - Tipicidad
   - Antijuridicidad
   - Culpabilidad

3. Puntos Débiles
   - PD-01 No hay testigos directos del momento del apoderamiento — Alto
   - PD-02 Registro de cámaras incompleto — Alto
   - PD-03 Falta pericia sobre objeto contundente — Medio
   - PD-04 Declaración contradictoria del imputado — Medio
   - PD-05 Cadena de custodia pendiente en evidencia material — Alto

4. Impacto
   - Alto
   - Medio
   - Bajo

5. Estrategias de Mitigación
   - Tomar declaración a testigo clave
   - Solicitar pericia complementaria
   - Reforzar cadena de custodia
   - Solicitar informe técnico de cámaras
   - Vincular evidencia documental

Right detail panel:
Selected:
“PD-01 No hay testigos directos del momento del apoderamiento”

Fields:
- Nivel de impacto: Alto
- Relacionado con: Conducta
- Riesgo procesal:
  “La defensa podría cuestionar la acreditación directa del acto de apoderamiento.”
- Estrategia sugerida:
  - Ubicar testigo presencial.
  - Reforzar el video de cámaras.
  - Incorporar indicios periféricos.
  - Relacionar el acta de inspección con la declaración de la víctima.
- Estado: En análisis
- Responsable: Equipo de investigación

Quick actions:
- Asignar responsable
- Crear estrategia de mitigación
- Agregar nota
- Vincular evidencia

Button:
- Exportar análisis

============================================================
20. SCREEN 9 — PRÓXIMA OPCIÓN
============================================================

Title:
“Próxima Opción”

Subtitle:
“Identifica y planifica la siguiente mejor acción para fortalecer la teoría del caso y avanzar en la investigación.”

Actions:
- Guía práctica
- Agregar próxima opción

Tabs:
- Canvas de Próxima Opción
- Listado
- Matriz de Priorización
- Calendario de Acciones
- Historial

KPI row:
- 5 Opciones identificadas
- 2 Alta prioridad — Acciones críticas
- 2 Impacto alto en la teoría
- 1 En progreso
- 3 días — Próxima revisión programada

Main canvas:
Title:
“Canvas de Próxima Opción”

Subtitle:
“Define, prioriza y planifica las acciones clave que impulsarán el caso hacia adelante.”

Columns:
1. Fundamento
   Card 1:
   “Hipótesis Fiscal”
   “El imputado, actuando con dolo y aprovechando la ausencia de la víctima, se apoderó ilegítimamente de sus bienes muebles con la finalidad de obtener un beneficio económico.”
   Link: Ver hipótesis

   Card 2:
   “Debilidades Clave”
   - Falta de testigos presenciales.
   - Registros de cámaras incompletos.
   - No se ha encontrado el arma.
   Link: Ver puntos débiles

2. Opciones Identificadas
   - 1. Obtener testimonio clave — Alta
   - 2. Pericia de cámaras — Alta
   - 3. Evidencia material — Media
   - 4. Análisis financiero — Baja
   - 5. Informe de geolocalización — Media

3. Impacto en la Teoría del Caso
   - 85% Fortalece la prueba de presencia y participación del imputado. Impacto: Alto
   - 75% Puede corroborar la ruta de escape y la secuencia del hecho. Impacto: Alto
   - 60% Podría vincular físicamente al imputado con el lugar del hecho. Impacto: Medio
   - 50% Puede demostrar beneficio económico y intención. Impacto: Medio
   - 40% Corrobora presencia del imputado en la zona del hecho. Impacto: Bajo

4. Próximos Pasos
   - Asignar a: Equipo de Investigación
     Fecha límite: 17/05/2024
     Estado: No iniciada
     Button: Asignar tarea

   - Asignar a: Unidad de Criminalística
     Fecha límite: 16/05/2024
     Estado: En progreso
     Button: Ver progreso

   - Asignar a: Policía Nacional
     Fecha límite: 18/05/2024
     Estado: No iniciada
     Button: Asignar tarea

   - Asignar a: Área de Análisis
     Fecha límite: 20/05/2024
     Estado: Pendiente
     Button: Asignar tarea

   - Asignar a: Unidad de Tecnología
     Fecha límite: 19/05/2024
     Estado: Pendiente
     Button: Asignar tarea

Use colored connectors:
- red for high priority
- orange for medium
- green for low
- blue for completed or informational

Right detail panel:
Selected:
“1. Obtener testimonio clave”

Fields:
- Prioridad: Alta prioridad
- Objetivo:
  “Obtener un testimonio directo que ubique al imputado en el lugar del hecho.”
- Justificación:
  “La falta de testigos presenciales debilita la teoría del caso y la credibilidad ante el juez.”
- Resultado esperado:
  “Declaración testimonial que corrobore la participación del imputado.”
- Indicadores de éxito:
  - Testigo identificado y localizado
  - Declaración coherente y verificable
- Relacionado con:
  - Hipótesis Fiscal
  - Puntos Débiles: Falta de testigos
- Archivos sugeridos:
  - Acta_entrevista_preliminar.pdf
  - Mapa_zona_del_hecho.pdf

Button:
- Editar opción
- Exportar canvas

Bottom recommendation:
“Prioriza las acciones de mayor impacto y menor esfuerzo para obtener resultados tempranos que fortalezcan el caso.”

============================================================
21. INTERACTION REQUIREMENTS
============================================================

Implement these interactions:

Sidebar:
- Clicking menu items changes screens.
- Active item must be highlighted in navy blue and gold accent.

Dashboard:
- Module cards are clickable.
- Clicking module card opens the respective screen.

Cards:
- Clicking a card updates the right detail panel.
- Selected card must have visual emphasis.

Tabs:
- Tabs can be static but must visually update active state.
- If tab content is not implemented, show toast:
  “Función disponible en el MVP.”

Buttons:
- Add buttons show toast:
  “Función disponible en el MVP.”
- Export buttons create a simple downloadable .txt file or show toast:
  “Exportación simulada para demo.”
- Save buttons show toast:
  “Análisis guardado en modo demo.”

Keyboard:
- Left arrow: previous screen.
- Right arrow: next screen.
- Spacebar: pause/resume recorrido mode.

Recorrido mode:
- Add a button:
  “Modo recorrido”
- It auto-advances every 8 seconds.
- Add pause/resume button.
- Add small progress bar.
- Add screen counter:
  “Pantalla 1 de 9”

============================================================
22. ACCESSIBILITY
============================================================

Add:
- semantic buttons
- alt text if any small decorative image is used
- aria-labels for icon buttons
- visible focus styles
- keyboard navigation support
- prefers-reduced-motion support

If prefers-reduced-motion is active:
- Disable auto-animation transitions.
- Keep navigation functional.

============================================================
23. README REQUIREMENTS
============================================================

Create README.md with:

Title:
“Herramientas para el Fiscal / FCIS — Demo estático”

Sections:
1. Description
2. What this demo includes
3. What this demo does not include
4. Local usage
5. GitHub Pages publication
6. Project structure
7. Legal notice

Include:

Local usage:
- Open index.html directly
- Or run:
  python -m http.server 8000

GitHub Pages:
- Upload files to repository root or /docs
- Go to Settings > Pages
- Deploy from branch main
- Select root or docs folder
- Open the generated GitHub Pages URL

Legal notice:
“© 2026 Pierre R. Todos los derechos reservados. Contacto: peru.labs.pe@gmail.com”

============================================================
24. ACCEPTANCE CRITERIA
============================================================

The work is accepted only if:

- index.html opens locally without errors.
- No external network requests.
- No frameworks or dependencies.
- No build step.
- No backend.
- No database.
- No authentication.
- No API calls.
- No real personal data.
- No visible full-page screenshot rendering.
- UI is recreated as real HTML/CSS/JS.
- The visual style is strongly similar to the reference screenshots.
- There is no vertical scroll in the main desktop layout.
- The interface fits in 100vh.
- The demo is responsive and mobile-friendly.
- A desktop-mode recommendation is visible on small screens:
  “Para una mejor experiencia, se recomienda visualizar esta demo en modo web escritorio.”
- Sidebar navigation works.
- Dashboard module cards open screens.
- Detail panels update when clicking cards.
- Tabs show active state.
- Buttons show demo toasts or simulated export.
- Modo recorrido auto-advances every 8 seconds.
- Modo recorrido can pause/resume.
- Keyboard arrows work.
- Spacebar pauses/resumes recorrido mode.
- GitHub Pages compatible.
- README.md is complete.
- The copyright/legal notice appears clearly but discreetly.
- The copyright line must read exactly:
  “© 2026 Pierre R. Todos los derechos reservados. Contacto: peru.labs.pe@gmail.com”

============================================================
25. IMPLEMENTATION ORDER
============================================================

Work in this order:

1. Inspect the docs and reference screenshots.
2. Create index.html.
3. Define CSS variables and base layout.
4. Build sidebar and topbar.
5. Create DEMO_DATA.
6. Create reusable rendering helpers.
7. Implement dashboard screen.
8. Implement Hechos del Caso.
9. Implement Elementos del Delito.
10. Implement Tipificación Jurídica.
11. Implement Evidencias.
12. Implement Medios Probatorios.
13. Implement Hipótesis Fiscal.
14. Implement Puntos Débiles.
15. Implement Próxima Opción.
16. Implement navigation.
17. Implement detail panel updates.
18. Implement recorrido mode.
19. Implement responsive behavior.
20. Enforce no-scroll layout.
21. Add legal notice.
22. Add README.md.
23. Test locally.
24. Check GitHub Pages compatibility.
25. Final visual refinement.

============================================================
26. FINAL PRIORITY
============================================================

Prioritize:

1. No-scroll page.
2. Visual fidelity to the screenshots.
3. Real HTML/CSS/JS components, not screenshot rendering.
4. Responsive and mobile-friendly behavior.
5. Best experience in desktop/web mode.
6. GitHub Pages compatibility.
7. Clean static architecture.
8. Legal ownership notice for Pierre R.

Do not over-engineer.
Do not add backend.
Do not add database.
Do not add API integrations.
Do not add external dependencies.
Do not alter the product concept.
Do not expose or use real personal data.

Final required legal line:

“© 2026 Pierre R. Todos los derechos reservados. Contacto: peru.labs.pe@gmail.com”