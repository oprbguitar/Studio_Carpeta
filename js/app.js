    const LEGAL = "© 2026 Pierre R. Todos los derechos reservados. Contacto: peru.labs.pe@gmail.com";
    const DEMO_DATA = {
      case: {
        id: "MP-2024-01567",
        crime: "Robo Agravado",
        owner: "Doctor",
        stage: "Formalización",
        updated: "Hoy, 10:45 a. m.",
        status: "En investigación"
      },
      nav: [
        ["inicio", "home", "Inicio"],
        ["gestion", "folder", "Gestión de casos"],
        ["teoria", "doc", "Teoría de Caso"],
        ["jurisprudencia", "scale", "Jurisprudencia"],
        ["normativa", "book", "Normativa"],
        ["historial", "calendar", "Historial"],
        ["canvas", "target", "Canvas dinámico"]
      ],
      homeCards: [
        ["Subir caso", "Registrar nuevo expediente, documentos y datos iniciales.", "Iniciar carga", "doc", "blue", "gestion"],
        ["Análisis de carpeta", "Revisar carpeta fiscal, extraer hechos, evidencias y líneas de análisis.", "Analizar carpeta", "folder", "gold", "teoria"],
        ["Ver jurisprudencia", "Consultar precedentes, doctrina y criterios relevantes para el caso.", "Consultar", "scale", "purple", "jurisprudencia"]
      ],
      recentCases: [
        ["MP-2024-01567", "Robo Agravado", "Hoy, 10:45 a. m.", "En análisis", "orange"],
        ["MP-2024-01421", "Estafa Agravada", "12/04/2024", "Formalizada", "green"],
        ["MP-2024-01309", "Lesiones Graves", "10/04/2024", "En investigación", "blue"]
      ],
      caseRows: [
        ["MP-2024-01567", "Robo Agravado", "Juan Pérez López", "Doctor", "Formalización", "Urgente", "20/04/2024", "En trámite"],
        ["MP-2024-01432", "Estafa Agravada", "María Gómez Rojas", "Dra. Valeria Ruiz", "Investigación", "Alta", "25/04/2024", "En trámite"],
        ["MP-2024-01598", "Lesiones Graves", "Carlos Díaz Herrera", "Dr. Andrés Silva", "Acusación", "Alta", "30/04/2024", "En análisis"],
        ["MP-2024-01234", "Tráfico Ilícito de Drogas", "Luis Fernández Soto", "Dra. Camila Torres", "Investigación", "Media", "28/04/2024", "En trámite"],
        ["MP-2024-01191", "Hurto Simple", "Pedro Martínez Vega", "Dr. Diego Morales", "Citación", "Baja", "25/04/2024", "Archivado"],
        ["MP-2024-01065", "Violencia Familiar", "Ana Lucía Rojas", "Dra. Valeria Ruiz", "Investigación", "Alta", "22/04/2024", "En trámite"]
      ],
      actions: [
        ["Asignar fiscal", "user"],
        ["Registrar actuación", "doc"],
        ["Agregar evidencia", "folder"],
        ["Programar audiencia", "calendar"],
        ["Generar oficio", "download"],
        ["Generar expediente", "doc"]
      ],
      theoryCards: [
        ["1. Hechos del caso", "El 15 de abril de 2024, aproximadamente a las 18:30 horas, el imputado habría ingresado a un establecimiento comercial portando un arma de fuego, amenazando a la víctima y sustrayendo dinero en efectivo y equipos celulares.", "doc"],
        ["Narrativa del caso", "El imputado, con ánimo de lucro y empleando violencia e intimidación con arma de fuego, habría despojado a la víctima de sus pertenencias dentro del establecimiento comercial.", "book"],
        ["2. Hipótesis fiscal", "El imputado planificó y ejecutó el robo con amenaza de arma de fuego. La víctima fue intimidada y despojada de sus pertenencias.", "idea"],
        ["3. Tipificación jurídica", "Código Penal, arts. 188 y 189. Robo agravado por el uso de arma y amenaza.", "scale"],
        ["4. Elementos del delito", "Apoderamiento ilegítimo de bien mueble ajeno. Violencia o amenaza con arma. Ánimo de lucro. Perjuicio patrimonial.", "check"],
        ["5. Evidencias", "4 evidencias clave recopiladas. Incluye videos, documentos y testimonios.", "folder"],
        ["6. Medios probatorios", "Documental: actas y reportes policiales. Testimonial: víctima y testigos. Material: videos, arma incautada, celulares.", "scale"],
        ["7. Puntos débiles", "Posible cuestionamiento a la cadena de custodia de celulares recuperados. Identificación del imputado podría ser cuestionada.", "alert"],
        ["8. Próxima acción", "Solicitar formalización de la investigación. Presentar antecedentes y medios probatorios que sustentan la teoría del caso.", "target"]
      ],
      jurisprudencia: [
        ["Cas. N.° 626-2022/Lima", "Robo agravado: uso de armas de fuego y amenaza a la víctima.", "Sala Penal Permanente", "2022", "Alta"],
        ["Cas. N.° 580-2021/Arequipa", "Valoración de la prueba indiciaria y sindicación de la víctima.", "Sala Penal Transitoria", "2021", "Alta"],
        ["R. N.° 1457-2020/Lima", "Coautoría en delitos patrimoniales y acuerdo previo.", "Sala Penal Permanente", "2020", "Media"],
        ["Cas. N.° 312-2019/La Libertad", "Credibilidad del testimonio de la víctima.", "Sala Penal Transitoria", "2019", "Media"],
        ["Cas. N.° 2216-2018/Lima", "Cadena de custodia y validez de pruebas materiales.", "Sala Penal Permanente", "2018", "Media"]
      ],
      normativa: [
        ["Código Penal", "arts. 188 y 189", "Derecho Penal", "Alta"],
        ["Código Procesal Penal", "arts. 159, 160, 313 y 314", "Derecho Procesal Penal", "Alta"],
        ["Constitución Política", "tutela jurisdiccional", "Derecho Constitucional", "Media"],
        ["Ley Orgánica del Ministerio Público", "arts. 1, 25 y 26", "Organización Institucional", "Media"]
      ],
      historial: [
        ["10/04/2024 10:45 a. m.", "Solicitud de formalización presentada", "MP-2024-01567", "Doctor", "Gestión de casos", "Alta"],
        ["10/04/2024 09:10 a. m.", "Registro de evidencia digital", "MP-2024-01567", "Oficial J. Ramírez", "Evidencias", "Alta"],
        ["09/04/2024 04:25 p. m.", "Actualización de hipótesis fiscal", "MP-2024-01567", "Doctor", "Teoría de Caso", "Media"],
        ["09/04/2024 11:22 a. m.", "Consulta de jurisprudencia vinculante", "MP-2024-01567", "Asist. Legal", "Jurisprudencia", "Media"],
        ["08/04/2024 05:30 p. m.", "Revisión de artículos aplicables", "MP-2024-01567", "Doctor", "Normativa", "Alta"]
      ],
      evidence: [
        ["Video de cámara de seguridad", "CAM_03_SUPERMARKET.mp4", "02:14", "Ingreso del imputado", "Supermercado El Ahorro", "15/04/2024 18:31", "Oficial J. Ramírez", "Ver"],
        ["Extracción de celular", "Samsung A54", "Juan López", "Chats WhatsApp, fotos, llamadas", "Unidad de Cibercrimen", "22/04/2024 10:15", "Perito M. Salazar", "Abrir"],
        ["Acta de incautación", "AI-2024-01567-01", "Incautación", "Arma de fuego y teléfonos celulares", "Policía Nacional", "23/04/2024 09:36", "Oficial L. Herrera", "Ver"],
        ["Declaración de la víctima", "María Fernanda Ruiz", "Relato de hechos", "Amenazas recibidas por el imputado", "Fiscalía", "23/04/2024 09:20", "Fiscal A. Torres", "PDF/Imprimir"]
      ],
      ai: {
        gestion: "He analizado el caso MP-2024-01567. Comparto un resumen jurídico y estratégico: corresponde priorizar formalización, fortalecer cadena de custodia y vincular evidencia digital con la amenaza.",
        teoria: "Para el caso MP-2024-01567, aplica el delito de Robo Agravado conforme a los artículos 188 y 189 del Código Penal. La teoría debe reforzar violencia, apoderamiento y ánimo de lucro.",
        jurisprudencia: "La Cas. N.° 626-2022/Lima es altamente relevante: establece que el uso de arma de fuego idónea y amenaza configuran agravante del art. 189 CP.",
        normativa: "La normativa que fortalece la imputación es: Código Penal arts. 188 y 189; Código Procesal Penal arts. 159, 160, 313 y 314; LOMP arts. 1, 25 y 26.",
        historial: "Las actuaciones más útiles para la línea de imputación son: formalización, registro de evidencia, acta de incautación y consulta de jurisprudencia vinculante.",
        canvas: "El mapa relacional sugiere priorizar la conexión entre Juan Pérez López, extracción de celular, video cámara y acta de incautación. Esa cadena fortalece autoría, amenaza y trazabilidad probatoria."
      },
      canvasMeta: [
        ["MP-2024-01567", "Robo Agravado", "#ff4141", "Robo"],
        ["MP-2024-01432", "Estafa Agravada", "#ff8a00", "Estafa"],
        ["MP-2024-01598", "Lesiones Graves", "#8d35ff", "Lesiones"],
        ["MP-2024-01620", "Tráfico Ilícito de Drogas", "#13a65b", "Tráfico"],
        ["MP-2024-01701", "Lavado de Activos", "#0b48de", "Lavado"]
      ],
      canvasCases: {
        "MP-2024-01567": {
          modus: "Asalto con arma de fuego a establecimiento comercial, intimidación a la víctima y huida en vehículo.",
          weak: "Cadena de custodia de celulares e identificación del imputado por video.",
          nodes: [
            ["c1-case", "caso", "MP-2024-01567", "Robo Agravado", "Caso fiscal principal", "high", "2024-04-15 18:30", 0],
            ["c1-juan", "persona", "Juan Pérez López", "Imputado", "Identificado por video y extracción móvil", "high", "2024-04-15 18:31", 0],
            ["c1-maria", "persona", "María Gómez Rojas", "Cómplice", "Coordinación previa al hecho", "medium", "2024-04-15 17:50", 0],
            ["c1-yaris", "vehiculo", "Toyota Yaris gris", "B7Y-123", "Vehículo de huida", "medium", "2024-04-15 18:45", 0],
            ["c1-video", "evidencia", "Video de cámara", "VID-2024-0321", "Corrobora ingreso y amenaza", "high", "2024-04-15 18:31", 85],
            ["c1-phone", "dispositivo", "Extracción Samsung A54", "EXT-2024-1189", "Chats, llamadas y fotos recuperadas", "high", "2024-04-22 10:15", 80],
            ["c1-call", "comunicacion", "Llamadas WhatsApp", "WA-2024-S587", "Comunicación previa al hecho", "medium", "2024-04-15 16:20", 60],
            ["c1-seizure", "evidencia", "Acta de incautación", "AC-2024-2145", "Arma y celulares incautados", "high", "2024-04-23 09:36", 78],
            ["c1-money", "financiero", "Depósito sospechoso", "S/ 8,500", "Movimiento posterior al hecho", "medium", "2024-04-18 12:00", 55],
            ["c1-fact", "hecho", "Hechos", "15/04/2024 18:30", "Núcleo fáctico de la imputación", "high", "2024-04-15 18:30", 0],
            ["c1-norm", "normativa", "CP arts. 188 y 189", "Robo agravado", "Base normativa del caso", "low", "2024-01-01 00:00", 0],
            ["c1-juris", "jurisprudencia", "Cas. 626-2022/Lima", "Uso de arma de fuego", "Criterio de refuerzo", "low", "2022-01-01 00:00", 0]
          ],
          links: [
            ["c1-case", "c1-juan", "Imputado en", "direct"],
            ["c1-juan", "c1-maria", "Coordina", "comunicacion"],
            ["c1-juan", "c1-yaris", "Conduce", "direct"],
            ["c1-yaris", "c1-video", "Captado por", "direct"],
            ["c1-video", "c1-seizure", "Corrobora", "direct"],
            ["c1-juan", "c1-phone", "Posee", "direct"],
            ["c1-phone", "c1-call", "Contiene", "comunicacion"],
            ["c1-call", "c1-maria", "Comunicación", "comunicacion"],
            ["c1-juan", "c1-money", "Recibe", "financiero"],
            ["c1-seizure", "c1-fact", "Sustenta", "direct"],
            ["c1-fact", "c1-norm", "Tipifica", "direct"],
            ["c1-norm", "c1-juris", "Reforzado por", "indirect"]
          ]
        },
        "MP-2024-01432": {
          modus: "Engaño mediante documento simulado para inducir transferencias bancarias a cuentas controladas.",
          weak: "Acreditar el ardid idóneo y el control efectivo de la cuenta receptora.",
          nodes: [
            ["c2-case", "caso", "MP-2024-01432", "Estafa Agravada", "Caso fiscal principal", "high", "2024-03-02 09:00", 0],
            ["c2-diego", "persona", "Diego Salas Vera", "Imputado", "Promotor del esquema de engaño", "high", "2024-03-02 09:10", 0],
            ["c2-rosa", "persona", "Rosa Méndez", "Agraviada", "Víctima de la disposición patrimonial", "low", "2024-03-05 11:00", 0],
            ["c2-contract", "evidencia", "Contrato simulado", "DOC-2024-5521", "Documento usado para el engaño", "high", "2024-03-02 10:00", 70],
            ["c2-account", "financiero", "Cuenta receptora", "BCP ****8841", "Cuenta de destino de los fondos", "high", "2024-03-06 14:00", 75],
            ["c2-transfer", "financiero", "Transferencias", "S/ 42,000", "Flujo de dinero hacia el imputado", "high", "2024-03-06 14:05", 82],
            ["c2-mail", "comunicacion", "Correos electrónicos", "MAIL-2024-771", "Negociación y engaño documentado", "medium", "2024-03-04 16:30", 58],
            ["c2-phone", "dispositivo", "Celular incautado", "EXT-2024-2210", "Chats y comprobantes de pago", "medium", "2024-03-12 09:40", 64],
            ["c2-fact", "hecho", "Hechos", "02/03/2024", "Engaño y disposición patrimonial", "high", "2024-03-02 09:00", 0],
            ["c2-norm", "normativa", "CP arts. 196 y 196-A", "Estafa agravada", "Base normativa del caso", "low", "2024-01-01 00:00", 0],
            ["c2-juris", "jurisprudencia", "Cas. 209-2019/Lima", "Ardid y engaño", "Criterio de refuerzo", "low", "2019-01-01 00:00", 0]
          ],
          links: [
            ["c2-case", "c2-diego", "Imputado en", "direct"],
            ["c2-diego", "c2-contract", "Elabora", "direct"],
            ["c2-rosa", "c2-contract", "Suscribe", "direct"],
            ["c2-rosa", "c2-transfer", "Realiza", "financiero"],
            ["c2-transfer", "c2-account", "Ingresa a", "financiero"],
            ["c2-account", "c2-diego", "Controlada por", "financiero"],
            ["c2-diego", "c2-mail", "Envía", "comunicacion"],
            ["c2-mail", "c2-rosa", "Dirigido a", "comunicacion"],
            ["c2-diego", "c2-phone", "Posee", "direct"],
            ["c2-contract", "c2-fact", "Sustenta", "direct"],
            ["c2-fact", "c2-norm", "Tipifica", "direct"],
            ["c2-norm", "c2-juris", "Reforzado por", "indirect"]
          ]
        },
        "MP-2024-01598": {
          modus: "Agresión física directa con objeto contundente que ocasiona lesiones graves a la víctima.",
          weak: "Determinar el dolo de lesionar y descartar legítima defensa.",
          nodes: [
            ["c3-case", "caso", "MP-2024-01598", "Lesiones Graves", "Caso fiscal principal", "high", "2024-04-08 21:00", 0],
            ["c3-marco", "persona", "Marco Ríos", "Imputado", "Autor de la agresión", "high", "2024-04-08 21:05", 0],
            ["c3-luis", "persona", "Luis Cano", "Agraviado", "Víctima con lesiones graves", "low", "2024-04-08 21:05", 0],
            ["c3-witness", "persona", "Testigo 1", "Declarante", "Presenció la agresión", "medium", "2024-04-08 21:10", 0],
            ["c3-medical", "evidencia", "Certificado médico legal", "CML-2024-118", "Determina días de incapacidad", "high", "2024-04-09 08:00", 90],
            ["c3-weapon", "evidencia", "Objeto contundente", "AC-2024-3320", "Instrumento de la agresión", "high", "2024-04-08 22:00", 76],
            ["c3-video", "evidencia", "Video de celular", "VID-2024-0712", "Registro parcial del hecho", "medium", "2024-04-08 21:06", 62],
            ["c3-phone", "dispositivo", "Extracción móvil", "EXT-2024-3015", "Mensajes de amenaza previos", "medium", "2024-04-14 10:00", 66],
            ["c3-fact", "hecho", "Hechos", "08/04/2024 21:00", "Agresión con lesiones graves", "high", "2024-04-08 21:00", 0],
            ["c3-norm", "normativa", "CP art. 121", "Lesiones graves", "Base normativa del caso", "low", "2024-01-01 00:00", 0],
            ["c3-juris", "jurisprudencia", "R.N. 1457-2020", "Dolo y gravedad", "Criterio de refuerzo", "low", "2020-01-01 00:00", 0]
          ],
          links: [
            ["c3-case", "c3-marco", "Imputado en", "direct"],
            ["c3-marco", "c3-luis", "Agrede a", "direct"],
            ["c3-marco", "c3-weapon", "Emplea", "direct"],
            ["c3-luis", "c3-medical", "Evaluado en", "direct"],
            ["c3-witness", "c3-video", "Aporta", "direct"],
            ["c3-video", "c3-fact", "Registra", "direct"],
            ["c3-marco", "c3-phone", "Posee", "direct"],
            ["c3-phone", "c3-luis", "Amenazas a", "comunicacion"],
            ["c3-medical", "c3-fact", "Sustenta", "direct"],
            ["c3-fact", "c3-norm", "Tipifica", "direct"],
            ["c3-norm", "c3-juris", "Reforzado por", "indirect"]
          ]
        },
        "MP-2024-01620": {
          modus: "Transporte de droga en vehículo coordinado por una organización mediante comunicaciones cifradas.",
          weak: "Vincular al cabecilla con la posesión y acreditar la cadena de custodia de la droga.",
          nodes: [
            ["c4-case", "caso", "MP-2024-01620", "Tráfico Ilícito de Drogas", "Caso fiscal principal", "high", "2024-05-10 02:00", 0],
            ["c4-aldo", "persona", "Aldo Quispe", "Cabecilla", "Organiza el transporte", "high", "2024-05-10 02:05", 0],
            ["c4-juan", "persona", "Juan Pérez López", "Transportista", "Vínculo con el caso de robo", "high", "2024-05-10 02:10", 0],
            ["c4-van", "vehiculo", "Furgoneta blanca", "C2X-908", "Vehículo de transporte", "high", "2024-05-10 02:00", 0],
            ["c4-drugs", "evidencia", "Droga incautada", "12.4 kg", "Sustancia ilícita decomisada", "high", "2024-05-10 03:00", 95],
            ["c4-phone", "dispositivo", "Teléfono satelital", "EXT-2024-4101", "Coordinación logística", "high", "2024-05-09 18:00", 84],
            ["c4-calls", "comunicacion", "Interceptación telefónica", "ESC-2024-220", "Órdenes de envío", "high", "2024-05-08 20:00", 80],
            ["c4-money", "financiero", "Dinero en efectivo", "USD 30,000", "Pago del transporte", "high", "2024-05-10 03:10", 78],
            ["c4-fact", "hecho", "Hechos", "10/05/2024 02:00", "Transporte de droga interceptado", "high", "2024-05-10 02:00", 0],
            ["c4-norm", "normativa", "CP art. 296", "Tráfico ilícito de drogas", "Base normativa del caso", "low", "2024-01-01 00:00", 0],
            ["c4-juris", "jurisprudencia", "Cas. 92-2017", "Posesión con fines de tráfico", "Criterio de refuerzo", "low", "2017-01-01 00:00", 0]
          ],
          links: [
            ["c4-case", "c4-aldo", "Investigado en", "direct"],
            ["c4-aldo", "c4-juan", "Contrata", "comunicacion"],
            ["c4-juan", "c4-van", "Conduce", "direct"],
            ["c4-van", "c4-drugs", "Transporta", "direct"],
            ["c4-aldo", "c4-calls", "Coordina", "comunicacion"],
            ["c4-calls", "c4-phone", "Registrada en", "comunicacion"],
            ["c4-aldo", "c4-money", "Paga con", "financiero"],
            ["c4-money", "c4-juan", "Recibe", "financiero"],
            ["c4-drugs", "c4-fact", "Sustenta", "direct"],
            ["c4-fact", "c4-norm", "Tipifica", "direct"],
            ["c4-norm", "c4-juris", "Reforzado por", "indirect"]
          ]
        },
        "MP-2024-01701": {
          modus: "Integración de activos ilícitos mediante empresa fachada, cuentas vinculadas y operaciones simuladas.",
          weak: "Acreditar el origen ilícito de los fondos y la conexión con el delito fuente.",
          nodes: [
            ["c5-case", "caso", "MP-2024-01701", "Lavado de Activos", "Caso fiscal principal", "high", "2024-06-01 09:00", 0],
            ["c5-aldo", "persona", "Aldo Quispe", "Investigado", "Vínculo con el caso de tráfico", "high", "2024-06-01 09:05", 0],
            ["c5-company", "persona", "Inversiones GRX SAC", "Empresa fachada", "Usada para integrar fondos", "high", "2024-06-01 09:10", 0],
            ["c5-account", "financiero", "Cuentas vinculadas", "6 cuentas", "Red de cuentas del entramado", "high", "2024-06-02 10:00", 80],
            ["c5-transfer", "financiero", "Transferencias", "USD 250,000", "Movimientos sin sustento", "high", "2024-06-02 10:05", 88],
            ["c5-property", "evidencia", "Inmuebles", "3 predios", "Bienes de origen injustificado", "high", "2024-06-03 11:00", 80],
            ["c5-invoice", "evidencia", "Facturas falsas", "DOC-2024-9921", "Simulan operaciones comerciales", "medium", "2024-06-03 12:00", 72],
            ["c5-mail", "comunicacion", "Correos societarios", "MAIL-2024-990", "Instrucciones de movimiento", "medium", "2024-06-02 16:00", 60],
            ["c5-fact", "hecho", "Hechos", "01/06/2024", "Integración de activos ilícitos", "high", "2024-06-01 09:00", 0],
            ["c5-norm", "normativa", "D. Leg. 1106", "Lavado de activos", "Base normativa del caso", "low", "2024-01-01 00:00", 0],
            ["c5-juris", "jurisprudencia", "Cas. 864-2021", "Autonomía del delito", "Criterio de refuerzo", "low", "2021-01-01 00:00", 0]
          ],
          links: [
            ["c5-case", "c5-aldo", "Investigado en", "direct"],
            ["c5-aldo", "c5-company", "Controla", "direct"],
            ["c5-company", "c5-account", "Titular de", "financiero"],
            ["c5-account", "c5-transfer", "Origina", "financiero"],
            ["c5-transfer", "c5-property", "Financia", "financiero"],
            ["c5-company", "c5-invoice", "Emite", "direct"],
            ["c5-aldo", "c5-mail", "Instruye", "comunicacion"],
            ["c5-mail", "c5-company", "Dirigido a", "comunicacion"],
            ["c5-property", "c5-fact", "Sustenta", "direct"],
            ["c5-fact", "c5-norm", "Tipifica", "direct"],
            ["c5-norm", "c5-juris", "Reforzado por", "indirect"]
          ]
        }
      }
    };

    const initialParams = new URLSearchParams(location.search);
    const requestedScreen = initialParams.get("screen");
    const state = {
      screen: DEMO_DATA.nav.some(item => item[0] === requestedScreen) ? requestedScreen : "inicio",
      modal: initialParams.get("modal") === "evidence",
      drawer: false,
      rowDrawer: null,
      sidebarCollapsed: localStorage.getItem("fcis.sidebarCollapsed") === "true" || matchMedia("(max-width: 980px)").matches,
      selectedTheory: 0,
      theoryOrder: loadJson("fcis.theoryOrder", DEMO_DATA.theoryCards.map((_, i) => i)),
      demoMode: false,
      demoIndex: 0,
      selectedCanvasNode: localStorage.getItem("fcis.selectedCanvasNode") || "c1-juan",
      canvas: loadJson("fcis.canvasState", {
        cases: ["MP-2024-01567", "MP-2024-01432"],
        positions: {},
        pinned: [],
        zoom: 0.8,
        panX: 24,
        panY: 16,
        mode: "normal",
        hidden: [],
        groups: {},
        selected: []
      }),
      table: loadJson("fcis.tableState", {}),
      ia: loadJson("fcis.iaPanel", { minimized: false, x: 0, y: 0 }),
      searchQuery: "",
      actionCount: Number(localStorage.getItem("fcis.actionCount") || "0"),
      lastUpdated: DEMO_DATA.case.updated
    };

    function loadJson(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
      } catch {
        return fallback;
      }
    }

    function icon(name) {
      const paths = {
        home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V21h14V10.5"/><path d="M9 21v-6h6v6"/>',
        folder: '<path d="M3 6h7l2 2h9v10.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
        doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',
        scale: '<path d="M12 3v18M5 6h14"/><path d="m6 6-3 7h6L6 6Zm12 0-3 7h6l-3-7Z"/><path d="M8 21h8"/>',
        book: '<path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4-4z"/><path d="M5 4v16"/>',
        calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
        bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
        help: '<circle cx="12" cy="12" r="9"/><path d="M9.4 9a2.8 2.8 0 1 1 4.6 2.1c-1 .7-2 1.2-2 2.9"/><path d="M12 17.5h.01"/>',
        search: '<circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
        user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
        alert: '<path d="M12 3 22 20H2z"/><path d="M12 9v5M12 17h.01"/>',
        clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>',
        idea: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 4H9c0-2 0-3-1-4z"/>',
        check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
        target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M21 12h-3M12 21v-3M3 12h3"/>',
        eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
        edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/>',
        external: '<path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
        send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
        close: '<path d="M6 6l12 12M18 6 6 18"/>',
        phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
        money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
        link: '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
        layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
        route: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.5"/>',
        flame: '<path d="M12 3c1 4 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 2 1 2 1-2-1-4 2-7z"/>',
        grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
        expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
        lasso: '<path d="M4 11c0-4 4-7 8-7s8 3 8 7-4 7-8 7c-1 0-2 0-3-.3"/><circle cx="6" cy="19" r="2"/><path d="M6 17v-2"/>',
        eyeoff: '<path d="M3 3l18 18"/><path d="M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3 3.3M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a10 10 0 0 0 3.6-.7"/>',
        sparkle: '<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/><path d="M7 7l3 3M14 14l3 3M17 7l-3 3M10 14l-3 3"/>',
        group: '<rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3 3"/><circle cx="9" cy="10" r="1.6"/><circle cx="15" cy="10" r="1.6"/><path d="M8 15h8"/>'
      };
      return `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.doc}</svg>`;
    }

    function app() {
      const appNode = document.getElementById("app");
      appNode.classList.toggle("sidebar-collapsed", state.sidebarCollapsed);
      appNode.innerHTML = `${sidebar()}<main class="main">${topbar()}${renderScreen()}${footer()}</main>`;
      const modal = document.getElementById("modal");
      modal.innerHTML = state.rowDrawer ? rowDrawer() : state.drawer ? detailDrawer() : evidenceModal();
      modal.classList.toggle("open", state.modal || state.drawer || !!state.rowDrawer);
      modal.classList.toggle("drawer-open", state.drawer || !!state.rowDrawer);
      bind();
      applySearchFilter(state.searchQuery);
    }

    function sidebar() {
      return `<aside class="sidebar">
        <div class="brand">
          <div class="mark">${icon("scale")}</div>
          <div class="brand-title">Herramienta de<br>Análisis Fiscal</div>
          <div class="brand-acronym">FCIS</div>
        </div>
        <nav class="nav" aria-label="Navegación principal">
          ${DEMO_DATA.nav.map(([id, ic, label]) => `<button data-screen="${id}" class="${state.screen === id ? "active" : ""}" aria-label="${label}">${icon(ic)}<span>${label}</span></button>`).join("")}
        </nav>
        <div class="case-mini">
          Caso activo
          <strong>${DEMO_DATA.case.id}</strong>
          ${DEMO_DATA.case.crime}
          <button class="btn ghost" data-open-detail>${"Ver detalles"} ${icon("external")}</button>
        </div>
        <div class="legal-side" title="${LEGAL}">${LEGAL}</div>
        <button class="collapse" data-toggle-sidebar aria-label="${state.sidebarCollapsed ? "Expandir barra lateral" : "Contraer barra lateral"}">${state.sidebarCollapsed ? "›" : "‹"}</button>
      </aside>`;
    }

    function topbar() {
      const label = DEMO_DATA.nav.find(n => n[0] === state.screen)?.[2] || "Inicio";
      return `<header class="topbar">
        <div class="crumb">Inicio&nbsp;&nbsp;/&nbsp;&nbsp;${label}</div>
        <label class="search">${icon("search")}<input aria-label="Buscar" value="${escapeHtml(state.searchQuery)}" placeholder="Buscar casos, documentos, evidencias..."><span class="keycap">⌘</span><span class="keycap">K</span></label>
        <div class="top-actions">
          <span class="pill action-counter" title="Acciones simuladas">${state.actionCount}</span>
          <button class="icon-btn" aria-label="Notificaciones" data-toast="Notificaciones simuladas.">${icon("bell")}<span class="dot"></span></button>
          <button class="icon-btn" aria-label="Ayuda" data-toast="Ayuda disponible en el MVP.">${icon("help")}</button>
          <div class="user"><div class="avatar">D</div><span>Doctor</span></div>
          <button class="icon-btn" aria-label="Menú de usuario" data-toast="Perfil simulado.">${icon("close")}</button>
        </div>
      </header>`;
    }

    function footer() {
      return `<footer class="footer"><div><span class="mobile-notice">Para una mejor experiencia, se recomienda visualizar esta demo en modo web escritorio.</span><span class="legal-mobile" title="${LEGAL}">${LEGAL}</span><span>© 2024 Herramienta de Análisis Fiscal</span></div><div>Versión 1.0.0</div><div class="links"><span>Términos de uso</span><span>·</span><span>Política de privacidad</span><span>·</span><span>Ayuda</span></div></footer>`;
    }

    function renderScreen() {
      const screens = { inicio, gestion, teoria, jurisprudencia, normativa, historial, canvas: canvasScreen };
      return screens[state.screen] ? screens[state.screen]() : inicio();
    }

    function header(title, subtitle, actions = "") {
      return `<div class="head"><div><h1>${title}</h1><div class="subtitle">${subtitle}</div></div><div class="actions">${actions}</div></div>`;
    }

    function caseStrip(cols = 5) {
      const data = [
        ["folder", "Caso seleccionado", DEMO_DATA.case.id, DEMO_DATA.case.status, "blue"],
        ["alert", "Delito", DEMO_DATA.case.crime, "", ""],
        ["user", "Responsable", DEMO_DATA.case.owner, "", ""],
        ["doc", "Etapa", DEMO_DATA.case.stage, "", "purple"],
        ["clock", "Última actualización", state.lastUpdated, "", ""]
      ].slice(0, cols);
      return `<div class="panel summary-strip ${cols === 4 ? "four" : ""}">${data.map(d => `<div class="summary-cell"><div class="orb ${d[4] || ""}">${icon(d[0])}</div><div><div class="label">${d[1]}</div><div class="value">${d[2]}</div>${d[3] ? `<div class="tiny"><span class="status-dot green"></span>${d[3]}</div>` : ""}</div></div>`).join("")}</div>`;
    }

    function kpis(items) {
      return `<div class="kpis">${items.map(i => `<div class="panel kpi"><div class="orb ${i[4] || ""}">${icon(i[0])}</div><div><div class="label">${i[1]}</div><div class="value">${i[2]}</div><div class="tiny ${i[4] || ""}">${i[3] || ""}</div></div></div>`).join("")}</div>`;
    }

    function inicio() {
      const date = `<div class="panel pad" style="min-width:220px;display:grid;grid-template-columns:42px 1fr;gap:10px;align-items:center">${icon("calendar")}<div><div class="value" style="font-size:14px">15 de abril de 2024</div><div class="tiny">Lunes, 09:15 a. m.</div></div></div>`;
      return `<section class="content">${header("Bienvenido, Doctor", "Accede rápidamente a las funciones principales del sistema.", date)}
        <div class="screen home-grid">
          <div class="hero-actions">${DEMO_DATA.homeCards.map(([t, p, b, ic, tone, target]) => `<article class="panel home-card"><div class="orb ${tone}">${icon(ic)}</div><h2>${t}</h2><p>${p}</p><button class="btn primary" data-screen="${target}">${b} ${icon("external")}</button></article>`).join("")}</div>
          <div class="home-bottom">
            <div class="panel pad"><div class="section-head"><h2 class="section-title">Casos recientes</h2><button class="btn small" data-screen="gestion">Ver todos</button></div><div class="list">${DEMO_DATA.recentCases.map(r => `<div class="list-row">${icon("folder")}<div><strong>${r[0]}</strong><div class="tiny">${r[1]}</div></div><div class="tiny">${r[2]}<br><span class="status-dot ${r[4]}"></span>${r[3]}</div></div>`).join("")}</div><button class="btn ghost" data-screen="gestion" style="width:100%;margin-top:8px">Ir a Gestión de casos ${icon("external")}</button></div>
            <div class="panel pad"><h2 class="section-title">Accesos rápidos</h2><div class="list quick-list">${["Crear caso nuevo", "Mis asignaciones", "Documentos recientes", "Plantillas y formatos"].map((x, i) => `<button class="list-row" data-toast="${x} simulado.">${icon("doc")}<div><strong>${x}</strong><div class="tiny">${["Iniciar un nuevo expediente fiscal", "Casos asignados actualmente", "Últimos documentos consultados", "Modelos y documentos estándar"][i]}</div></div><span>›</span></button>`).join("")}</div></div>
            <div class="panel pad"><div class="section-head"><h2 class="section-title">Asistencia IA-Legal</h2><span class="pill orange">Beta</span></div><div class="tiny">Apoyo para análisis, síntesis y orientación jurídica asistida.</div><div class="ia-illustration">IA</div><button class="btn primary" style="width:100%" data-toast="Asistencia IA-Legal simulada.">Abrir asistencia ${icon("external")}</button></div>
            <div class="panel pad" style="display:grid;place-items:center;text-align:center"><div><div class="orb green" style="margin:0 auto 12px;width:70px;height:70px">${icon("folder")}</div><h2 class="section-title">${DEMO_DATA.case.id}</h2><div class="tiny">${DEMO_DATA.case.crime}<br>Actualizado: ${DEMO_DATA.case.updated}</div><button class="btn ghost" data-screen="teoria" style="margin-top:18px">Continuar ${icon("external")}</button></div></div>
          </div>
        </div></section>`;
    }

    function gestion() {
      const actions = `<button class="btn primary" data-toast="Nuevo caso simulado.">${icon("plus")} Nuevo caso</button>`;
      return `<section class="content">${header("Gestión de casos", "Administra, consulta y da seguimiento a los expedientes fiscales.", actions)}
        <div class="screen" style="grid-template-rows:auto auto minmax(0,1fr)">
          ${kpis([["folder","Casos activos","124","+8 desde ayer",""],["alert","Casos urgentes","9","Requieren atención inmediata","gold"],["calendar","Audiencias próximas","6","Próxima: hoy, 10:30 a. m.","purple"],["clock","Plazos por vencer","15","En los próximos 7 días","green"]])}
          <div class="main-two">
            <div class="left-stack">
              ${caseTablePanel()}
              <div class="bottom-split">${recentPanel("Últimas actuaciones")}${quickPanel(DEMO_DATA.actions)}</div>
            </div>
            <div class="right-stack">${caseSummaryPanel()}${aiPanel("gestion")}</div>
          </div>
        </div></section>`;
    }

    function caseTablePanel() {
      return `<div class="panel pad"><div class="section-head"><h2 class="section-title">Listado de casos</h2><button class="btn primary" data-toast="Nuevo caso simulado.">${icon("plus")} Nuevo caso</button></div>${filters(["Estado","Prioridad","Etapa procesal","Delito"], "Buscar caso...")}<div class="table-wrap"><div class="table-scroll"><table><thead><tr><th>Expediente</th><th>Delito</th><th>Investigado / Imputado</th><th>Fiscal</th><th>Etapa</th><th>Prioridad</th><th>Fecha límite</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${DEMO_DATA.caseRows.map((r, i) => `<tr class="${i === 0 ? "selected" : ""}"><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${priority(r[5])}</td><td>${r[6]}</td><td>${status(r[7])}</td><td>${rowActions()}</td></tr>`).join("")}</tbody></table></div><div class="table-foot"><span>Mostrando 6 de 124 casos</span>${pages("21")}</div></div></div>`;
    }

    function jurisprudencia() {
      return knowledgeScreen({
        id: "jurisprudencia",
        title: "Jurisprudencia",
        subtitle: "Consulta precedentes, criterios jurisprudenciales y fundamentos aplicables al caso seleccionado.",
        kpiItems: [["doc","Resultados encontrados","248","",""],["scale","Jurisprudencia vinculante","18","","green"],["scale","Casaciones relevantes","36","","gold"],["target","Coincidencias con el caso","12","","purple"]],
        tableTitle: "Buscar jurisprudencia",
        filters: ["Fuente penal","Sala","Tipo de resolución","Delito","Año"],
        rows: DEMO_DATA.jurisprudencia,
        columns: ["Expediente / Casación","Tema","Sala","Año","Relevancia","Acciones"],
        detailTitle: "Resumen del criterio seleccionado",
        selectedTitle: "Cas. N.° 626-2022/Lima",
        aiKey: "jurisprudencia"
      });
    }

    function normativa() {
      return knowledgeScreen({
        id: "normativa",
        title: "Normativa",
        subtitle: "Consulta normas, artículos y fundamentos legales aplicables al caso seleccionado.",
        kpiItems: [["book","Normas encontradas","124","",""],["doc","Artículos relevantes","37","","green"],["external","Normas vinculadas","18","","gold"],["target","Coincidencias con el caso","9","","purple"]],
        tableTitle: "Buscar normativa",
        filters: ["Tipo de norma","Materia","Año"],
        rows: DEMO_DATA.normativa,
        columns: ["Norma","Artículo/tema","Materia","Relevancia","Acciones"],
        detailTitle: "Resumen de la norma seleccionada",
        selectedTitle: "Código Penal – arts. 188 y 189",
        aiKey: "normativa"
      });
    }

    function historial() {
      return `<section class="content">${header("Historial", "Consulta actuaciones, cambios y trazabilidad del caso seleccionado.")}
        <div class="screen" style="grid-template-rows:auto auto minmax(0,1fr)">
          ${caseStrip(4)}
          ${kpis([["doc","Registros totales","186","",""],["clock","Actuaciones recientes","24","","green"],["user","Usuarios intervinientes","12","","gold"],["target","Cambios relevantes","8","","purple"]])}
          <div class="knowledge-grid">
            <div class="knowledge-left">
              <div class="panel pad"><h2 class="section-title">Buscar historial</h2>${filters(["Tipo de evento","Usuario","Módulo","Fecha"], "Buscar actuación o documento...", false, "historial")}${dynamicTable("historial", DEMO_DATA.historial, ["Fecha y hora","Evento","Caso","Usuario","Módulo","Relevancia","Acciones"], "38")}</div>
              <div class="bottom-split">${savedPanel("Actividad guardada / reciente")}${quickPanel([["Exportar historial","download"],["Generar reporte","doc"],["Agregar a teoría del caso","folder"],["Ver trazabilidad","scale"]], "two")}</div>
            </div>
            <div class="knowledge-right">${historyDetail()}${aiPanel("historial")}</div>
          </div>
        </div></section>`;
    }

    const CANVAS_TYPES = [
      ["caso", "Casos", "folder"],
      ["persona", "Personas", "user"],
      ["vehiculo", "Vehículos", "target"],
      ["evidencia", "Evidencias", "doc"],
      ["dispositivo", "Dispositivos", "phone"],
      ["comunicacion", "Comunicaciones", "send"],
      ["financiero", "Financiero", "money"],
      ["hecho", "Hechos", "book"],
      ["normativa", "Normativa", "scale"],
      ["jurisprudencia", "Jurisprudencia", "scale"]
    ];
    const CANVAS_W = 1268;
    let canvasResolved = {};
    let canvasLassoMode = false;

    function canvasMetaFor(id) {
      return DEMO_DATA.canvasMeta.find(m => m[0] === id) || ["", "", "#0735b7", ""];
    }

    function canvasActiveNodes() {
      const out = [];
      state.canvas.cases.forEach(cid => {
        const g = DEMO_DATA.canvasCases[cid];
        if (!g) return;
        g.nodes.forEach(n => out.push({ id: n[0], type: n[1], title: n[2], sub: n[3], note: n[4], risk: n[5], date: n[6], strength: n[7], caseId: cid }));
      });
      return out;
    }

    function canvasActiveLinks() {
      const out = [];
      state.canvas.cases.forEach(cid => {
        const g = DEMO_DATA.canvasCases[cid];
        if (!g) return;
        g.links.forEach(l => out.push({ from: l[0], to: l[1], label: l[2], kind: l[3] || "direct", caseId: cid }));
      });
      return out;
    }

    function canvasNodeMap() {
      const m = {};
      canvasActiveNodes().forEach(n => (m[n.id] = n));
      return m;
    }

    function canvasNodeById(id) {
      return canvasNodeMap()[id] || canvasActiveNodes()[0];
    }

    function canvasIcon(type) {
      return ({ caso: "folder", persona: "user", vehiculo: "target", evidencia: "doc", hecho: "book", normativa: "scale", jurisprudencia: "scale", dispositivo: "phone", comunicacion: "send", financiero: "money" })[type] || "doc";
    }

    function canvasWorldHeight() {
      return Math.max(620, 48 + state.canvas.cases.length * 360);
    }

    function canvasComputeLayout() {
      const positions = {};
      const cols = 4, colW = 232, rowH = 116, bandH = 360;
      state.canvas.cases.forEach((cid, bi) => {
        const g = DEMO_DATA.canvasCases[cid];
        if (!g) return;
        const top = 24 + bi * bandH;
        positions[g.nodes[0][0]] = { x: 36, y: top + bandH / 2 - 40 };
        g.nodes.slice(1).forEach((n, idx) => {
          const col = idx % cols, row = Math.floor(idx / cols);
          positions[n[0]] = { x: 300 + col * colW, y: top + 18 + row * rowH };
        });
      });
      return positions;
    }

    function canvasTimelineLayout() {
      const positions = {};
      const nodes = canvasActiveNodes().filter(n => !state.canvas.hidden.includes(n.type));
      nodes.sort((a, b) => String(a.date).localeCompare(String(b.date)));
      const perRow = 5, colW = 238, rowH = 150;
      nodes.forEach((n, i) => {
        positions[n.id] = { x: 30 + (i % perRow) * colW, y: 36 + Math.floor(i / perRow) * rowH };
      });
      return positions;
    }

    function canvasResolvePositions() {
      const base = state.canvas.mode === "timeline" ? canvasTimelineLayout() : canvasComputeLayout();
      canvasResolved = state.canvas.mode === "timeline" ? base : Object.assign(base, state.canvas.positions);
      return canvasResolved;
    }

    function canvasPos(id) {
      return canvasResolved[id] || { x: 40, y: 40 };
    }

    function canvasScreen() {
      const actions = `<button class="btn ghost" data-canvas-insight>${icon("sparkle")} Generar insight</button><button class="btn ghost" data-canvas-export>${icon("download")} Exportar canvas</button><button class="btn primary" data-canvas-contrast>${icon("scale")} Contrastar casos</button>`;
      canvasResolvePositions();
      const zoomPct = Math.round(state.canvas.zoom * 100);
      const chips = DEMO_DATA.canvasMeta.map(m => {
        const on = state.canvas.cases.includes(m[0]);
        return `<button class="case-chip ${on ? "on" : ""}" data-case-toggle="${m[0]}" style="--case-color:${m[2]}" aria-pressed="${on}"><i class="case-dot" style="background:${m[2]}"></i>${m[3]} · ${m[0].slice(-5)}</button>`;
      }).join("");
      const typeToggles = CANVAS_TYPES.map(t => {
        const hidden = state.canvas.hidden.includes(t[0]);
        return `<button class="type-chip ${hidden ? "off" : ""}" data-canvas-type="${t[0]}" aria-pressed="${!hidden}">${icon(hidden ? "eyeoff" : t[2])}<span>${t[1]}</span></button>`;
      }).join("");
      const modes = [["normal", "Vista normal"], ["risk", "Mapa de riesgo"], ["strength", "Fuerza de evidencia"], ["timeline", "Línea de tiempo"]];
      return `<section class="content">${header("Canvas dinámico del caso", "Arrastra, vincula y cruza información entre casos, personas, vehículos, evidencias y datos financieros.", actions)}
        <div class="screen">
          <div class="canvas-layout">
            <div class="panel pad canvas-shell">
              <div class="canvas-toolbar">
                <div class="canvas-toolbar-row">
                  <div class="case-tabs"><strong>Casos</strong>${chips}</div>
                  <div class="zoom-controls">
                    <button class="btn ghost small" data-zoom="-" aria-label="Alejar">−</button>
                    <span class="zoom-value">${zoomPct}%</span>
                    <button class="btn ghost small" data-zoom="+" aria-label="Acercar">+</button>
                    <button class="btn ghost small" data-zoom="fit" title="Ajustar a la vista">${icon("expand")}</button>
                    <button class="btn ghost small" data-zoom="reset" title="Restablecer vista">${icon("target")}</button>
                    <button class="btn ghost small" data-canvas-fullscreen title="Pantalla completa">${icon("external")}</button>
                  </div>
                </div>
                <div class="canvas-tools">
                  <label class="canvas-search">${icon("search")}<input data-canvas-search value="${escapeHtml(state.canvas.search || "")}" placeholder="Buscar nodo en el canvas..."></label>
                  <button class="btn ghost small ${canvasLassoMode ? "is-on" : ""}" data-canvas-lasso>${icon("lasso")} Lazo</button>
                  <button class="btn ghost small" data-canvas-group>${icon("group")} Agrupar</button>
                  <button class="btn ghost small" data-canvas-ungroup>${icon("close")} Desagrupar</button>
                  <button class="btn ghost small" data-canvas-path>${icon("route")} Ruta más corta</button>
                  <label class="canvas-mode-wrap">${icon("layers")}<select data-canvas-mode>${modes.map(m => `<option value="${m[0]}" ${state.canvas.mode === m[0] ? "selected" : ""}>${m[1]}</option>`).join("")}</select></label>
                  <div class="canvas-types">${typeToggles}</div>
                </div>
              </div>
              <div class="canvas-board mode-${state.canvas.mode}" data-canvas-board>
                <div class="canvas-content" data-canvas-content style="width:${CANVAS_W}px;height:${canvasWorldHeight()}px;transform:translate(${state.canvas.panX}px,${state.canvas.panY}px) scale(${state.canvas.zoom})">
                  ${canvasContentInner()}
                </div>
                <div class="canvas-lasso-rect" data-lasso-rect hidden></div>
                <div class="canvas-legend">
                  ${[["", "Casos"], ["persona", "Personas"], ["vehiculo", "Vehículos"], ["evidencia", "Evidencias"], ["dispositivo", "Dispositivos"], ["comunicacion", "Comunic."], ["financiero", "Financiero"], ["hecho", "Hechos"], ["legal", "Normativa / Juris."]].map(x => `<span><i class="legend-dot ${x[0]}"></i>${x[1]}</span>`).join("")}
                  <span style="margin-left:auto">- - - Relación indirecta</span>
                </div>
              </div>
            </div>
            <div class="canvas-detail">
              ${canvasDetail()}
              ${aiPanel("canvas")}
              <div class="panel pad" style="display:grid;gap:8px"><button class="btn ghost" data-canvas-insight>${icon("sparkle")} Generar insight IA</button><button class="btn primary" data-canvas-contrast>${icon("scale")} Contrastar casos</button></div>
            </div>
          </div>
        </div>
      </section>`;
    }

    function canvasContentInner() {
      return `${canvasGroupBoxes()}${canvasSvg()}${canvasActiveNodes().map(canvasNode).join("")}`;
    }

    function canvasGroupBoxes() {
      const map = canvasNodeMap();
      return Object.entries(state.canvas.groups).map(([gid, ids], gi) => {
        const pts = ids.filter(id => map[id] && !state.canvas.hidden.includes(map[id].type)).map(id => canvasPos(id));
        if (pts.length < 2) return "";
        const minX = Math.min(...pts.map(p => p.x)) - 14;
        const minY = Math.min(...pts.map(p => p.y)) - 24;
        const maxX = Math.max(...pts.map(p => p.x)) + 184;
        const maxY = Math.max(...pts.map(p => p.y)) + 86;
        return `<div class="canvas-group-box" style="left:${minX}px;top:${minY}px;width:${maxX - minX}px;height:${maxY - minY}px"><span class="canvas-group-tag">Grupo ${gi + 1} · ${ids.length}</span></div>`;
      }).join("");
    }

    function canvasNode(n) {
      if (state.canvas.hidden.includes(n.type)) return "";
      const p = canvasPos(n.id);
      const meta = canvasMetaFor(n.caseId);
      const focus = state.selectedCanvasNode === n.id ? " focus" : "";
      const sel = state.canvas.selected.includes(n.id) ? " selected" : "";
      const onPath = (state.canvas.path || []).includes(n.id) ? " onpath" : "";
      const q = (state.canvas.search || "").trim().toLowerCase();
      const dim = q && !(n.title + " " + n.sub).toLowerCase().includes(q) ? " dim" : "";
      const match = q && (n.title + " " + n.sub).toLowerCase().includes(q) ? " match" : "";
      const strengthBucket = n.strength >= 80 ? "high" : n.strength >= 60 ? "mid" : n.strength > 0 ? "low" : "none";
      return `<button class="canvas-node ${n.type}${focus}${sel}${onPath}${dim}${match}" data-canvas-node="${n.id}" data-type="${n.type}" data-risk="${n.risk}" data-strength="${strengthBucket}" style="left:${p.x}px;top:${p.y}px;--case-color:${meta[2]}" title="${escapeHtml(n.caseId)} · ${escapeHtml(n.title)}" aria-label="Seleccionar ${escapeHtml(n.title)}">
        <span class="node-icon">${icon(canvasIcon(n.type))}</span>
        <span><span class="node-title">${n.title}</span><span class="node-sub">${n.sub}</span></span>
      </button>`;
    }

    function canvasSvg() {
      const map = canvasNodeMap();
      const path = state.canvas.path || [];
      const pathEdges = new Set();
      for (let i = 0; i < path.length - 1; i++) pathEdges.add([path[i], path[i + 1]].sort().join("|"));
      const links = canvasActiveLinks().map(l => {
        if (!map[l.from] || !map[l.to]) return "";
        if (state.canvas.hidden.includes(map[l.from].type) || state.canvas.hidden.includes(map[l.to].type)) return "";
        const a = canvasPos(l.from), b = canvasPos(l.to);
        const x1 = a.x + 170, y1 = a.y + 36, x2 = b.x, y2 = b.y + 36;
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 8;
        const curve = Math.max(30, Math.abs(x2 - x1) * .32);
        const onPath = pathEdges.has([l.from, l.to].sort().join("|")) ? " onpath" : "";
        const cls = `${l.kind}${onPath}`.trim();
        return `<path class="${cls}" d="M${x1} ${y1} C${x1 + curve} ${y1}, ${x2 - curve} ${y2}, ${x2} ${y2}"/><text class="canvas-link-label" x="${mx}" y="${my}" text-anchor="middle">${l.label}</text>`;
      }).join("");
      return `<svg class="canvas-links" viewBox="0 0 ${CANVAS_W} ${canvasWorldHeight()}" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="canvasArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0642e5"/></marker></defs>${links}</svg>`;
    }

    function canvasDetail() {
      const nodes = canvasActiveNodes();
      const node = canvasNodeMap()[state.selectedCanvasNode] || nodes[0];
      if (!node) return `<div class="panel pad canvas-detail-card"><div class="tiny">Selecciona uno o más casos para ver elementos.</div></div>`;
      const rels = canvasActiveLinks().filter(l => l.from === node.id || l.to === node.id);
      const map = canvasNodeMap();
      const meta = canvasMetaFor(node.caseId);
      const riskLabel = { high: "Alto", medium: "Medio", low: "Bajo" }[node.risk] || "—";
      return `<div class="panel pad canvas-detail-card">
        <div class="section-head"><h2 class="section-title">Elemento seleccionado</h2><span class="pill" style="background:${meta[2]}22;color:${meta[2]}">${node.caseId}</span></div>
        <div style="display:grid;grid-template-columns:46px 1fr;gap:10px;align-items:center;margin:10px 0"><div class="orb">${icon(canvasIcon(node.type))}</div><div><h2 class="section-title">${node.title}</h2><span class="pill green">${node.sub}</span></div></div>
        <div class="detail-grid"><div><div class="detail-label">Tipo</div><div class="detail-value">${node.type}</div></div><div><div class="detail-label">Riesgo</div><div class="detail-value">${riskLabel}</div></div>${node.strength ? `<div><div class="detail-label">Fuerza probatoria</div><div class="detail-value">${node.strength}/100</div></div><div><div class="detail-label">Fecha</div><div class="detail-value">${(node.date || "").slice(0, 10)}</div></div>` : ""}<div class="wide"><div class="detail-label">Nota</div><div class="detail-value">${node.note}</div></div></div>
        <h2 class="section-title" style="margin-top:12px">Relaciones (${rels.length})</h2>
        <ul class="bullet-list">${rels.slice(0, 5).map(r => `<li>${r.label}: ${(map[r.from] || {}).title || r.from} → ${(map[r.to] || {}).title || r.to}</li>`).join("")}</ul>
      </div>`;
    }

    function teoria() {
      const actions = `<button class="btn ghost" data-tour>${icon("target")} ${state.demoMode ? "Pausar recorrido" : "Recorrido demo"}</button><button class="btn ghost" data-theory-auto>${icon("layers")} Auto-organizar teoría</button><button class="btn ghost" data-export-summary>${icon("download")} Exportar teoría</button><button class="btn primary" data-toast="Edición simulada.">${icon("edit")} Editar</button>`;
      return `<section class="content">${header("Teoría del caso", "Construye y organiza la estrategia jurídica del caso seleccionado.", actions)}
        <div class="screen" style="grid-template-rows:auto minmax(0,1fr)">
          ${caseStrip()}
          <div class="theory-grid">
            <div class="panel pad"><div class="canvas" data-theory-canvas>${theoryConnectors()}${theoryDisplayOrder().map((i, pos) => theoryCard(DEMO_DATA.theoryCards[i], i, pos)).join("")}</div></div>
            ${theorySidePanel()}
          </div>
        </div></section>`;
    }

    function theoryCard(c, i, pos = i) {
      const extra = i === 5 ? `<button class="btn ghost small" data-open-evidence style="margin-top:10px">Ver evidencias ${icon("external")}</button>` : "";
      const cls = `${i === 1 ? " center" : i === 7 ? " warn" : i === 8 ? " next" : ""}${state.selectedTheory === i || state.demoIndex === i && state.demoMode ? " active highlight-step" : ""}`;
      const body = i === 4 ? `<ul class="bullet-list">${c[1].split(". ").filter(Boolean).map(x => `<li>${x.replace(".", "")}</li>`).join("")}</ul>` : i === 6 ? `<div class="tag-row"><span class="tag">Documental</span><span>Actas, registros y reportes policiales.</span><span class="tag green">Testimonial</span><span>Declaraciones de víctima y testigos.</span><span class="tag purple">Material</span><span>Videos, arma incautada, celulares.</span></div>` : `<p class="card-text">${c[1]}</p>`;
      return `<article class="theory-card${cls}" draggable="true" role="button" tabindex="0" data-theory-index="${i}" data-theory-pos="${pos}" aria-label="Abrir detalle de ${c[0]}"><div>${i === 1 ? `<div class="orb" style="margin:0 auto 10px">${icon(c[2])}</div>` : `<div class="card-title">${icon(c[2])}<span>${c[0]}</span></div>`}${i === 1 ? `<h2 class="section-title">${c[0]}</h2>` : ""}${body}${extra}</div></article>`;
    }

    function theoryDisplayOrder() {
      const valid = state.theoryOrder.filter(i => DEMO_DATA.theoryCards[i]);
      return valid.length === DEMO_DATA.theoryCards.length ? valid : DEMO_DATA.theoryCards.map((_, i) => i);
    }

    function theoryConnectors() {
      return `<svg class="theory-connectors" data-theory-connectors aria-hidden="true"><path></path></svg>`;
    }

    function recalcTheoryConnectors() {
      const canvas = document.querySelector("[data-theory-canvas]");
      const svg = canvas && canvas.querySelector("[data-theory-connectors]");
      if (!canvas || !svg) return;
      const box = canvas.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      const cards = [...canvas.querySelectorAll("[data-theory-pos]")].sort((a, b) => Number(a.dataset.theoryPos) - Number(b.dataset.theoryPos));
      const centers = cards.map(c => {
        const r = c.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      let d = "";
      centers.forEach((p, i) => {
        if (i === 0) { d += `M${p.x.toFixed(1)} ${p.y.toFixed(1)}`; return; }
        const prev = centers[i - 1];
        const mx = (prev.x + p.x) / 2;
        d += ` C${mx.toFixed(1)} ${prev.y.toFixed(1)}, ${mx.toFixed(1)} ${p.y.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      });
      svg.querySelector("path").setAttribute("d", d);
    }

    function autoOrganizeTheory() {
      // Hechos → Hipótesis → Tipificación → Elementos → Narrativa(centro) → Evidencias → Medios → Puntos débiles → Próxima acción
      state.theoryOrder = [0, 2, 3, 4, 1, 5, 6, 7, 8];
      localStorage.setItem("fcis.theoryOrder", JSON.stringify(state.theoryOrder));
      app();
      const canvas = document.querySelector("[data-theory-canvas]");
      if (canvas) {
        canvas.classList.add("reorganizing");
        setTimeout(() => canvas.classList.remove("reorganizing"), 600);
      }
      simulateAction("Teoría reorganizada: Hechos → Hipótesis → Tipificación → Elementos → Evidencias → Medios → Puntos débiles → Próxima acción.");
    }

    function theorySidePanel() {
      const card = DEMO_DATA.theoryCards[state.selectedTheory] || DEMO_DATA.theoryCards[0];
      const style = `--ia-x:${state.ia.x || 0}px;--ia-y:${state.ia.y || 0}px`;
      return `<div class="panel pad ai-panel is-floating ${state.ia.minimized ? "minimized" : ""}" data-ai-panel style="${style}"><div class="ai-title" data-ai-handle><span>${icon("target")} Detalle e IA-Legal</span><span class="online"><span class="status-dot green"></span>En línea</span><button class="icon-btn" data-ai-minimize aria-label="${state.ia.minimized ? "Restaurar IA-Legal" : "Minimizar IA-Legal"}">${state.ia.minimized ? "›" : "−"}</button></div>
        <div class="quick-prompts">${["Fortalece teoría", "Revisa evidencia", "Sugiere norma"].map(p => `<button class="prompt-chip" data-ai-prompt="${p}">${p}</button>`).join("")}</div>
        <div class="chat">
          <div class="bubble response"><strong>${card[0]}</strong><br>${card[1]}</div>
          <div class="bubble">Sugerencia IA: vincula este módulo con evidencia digital, normativa aplicable y actuaciones recientes para reforzar la consistencia de la teoría fiscal.</div>
          <div class="ai-cols"><div class="ai-mini"><strong>Estado</strong>Seleccionado</div><div class="ai-mini"><strong>Caso</strong>${DEMO_DATA.case.id}</div><div class="ai-mini"><strong>Acción</strong>Revisar sustento</div></div>
          <button class="btn ghost" data-toast="Análisis completo simulado." style="justify-self:center">Ver análisis completo ${icon("external")}</button>
        </div>
        <div class="ask"><input placeholder="Escribe tu consulta..."><button class="btn primary" data-ai-send>${icon("send")}</button></div></div>`;
    }

    function knowledgeScreen(cfg) {
      return `<section class="content">${header(cfg.title, cfg.subtitle)}
        <div class="screen" style="grid-template-rows:auto auto minmax(0,1fr)">
          ${caseStrip(4)}
          ${kpis(cfg.kpiItems)}
          <div class="knowledge-grid">
            <div class="knowledge-left">
              <div class="panel pad"><h2 class="section-title">${cfg.tableTitle}</h2>${filters(cfg.filters, `Buscar ${cfg.id}...`, cfg.filters.length === 3, cfg.id)}${knowledgeTable(cfg)}</div>
              <div class="bottom-split">${savedPanel(`${cfg.title} guardada / reciente`)}${quickPanel([["Comparar normas","scale"],["Exportar ficha","download"],["Agregar a teoría del caso","folder"],["Ver texto legal","external"]], "two")}</div>
            </div>
            <div class="knowledge-right">${knowledgeDetail(cfg)}${aiPanel(cfg.aiKey)}</div>
          </div>
        </div></section>`;
    }

    function knowledgeTable(cfg) {
      return dynamicTable(cfg.id, cfg.rows, cfg.columns, cfg.id === "jurisprudencia" ? "50" : "31");
    }

    function filters(names, placeholder, compact = false, id = "") {
      const opts = ["Todas", "Alta", "Media", "2022", "2021", "Derecho Penal", "Sala Penal Permanente", "Doctor"];
      const s = tableState(id);
      return `<div class="filters ${compact ? "four" : ""}" data-table-filters="${id}">${names.map((n, idx) => `<label class="filter-label">${n}<select data-table-filter="${id}">${opts.map(o => `<option ${s.filters?.[idx] === o ? "selected" : ""}>${o}</option>`).join("")}</select></label>`).join("")}<label class="filter-label">Palabras clave<div class="filter-input">${icon("search")}<input data-table-search="${id}" value="${escapeHtml(s.q || "")}" placeholder="${placeholder}"></div></label></div>`;
    }

    function dynamicTable(id, rows, columns, last) {
      const processed = tableRows(id, rows);
      const limit = 3;
      const page = Math.min(tableState(id).page || 1, Math.max(1, Math.ceil(processed.length / limit)));
      const shown = processed.slice((page - 1) * limit, page * limit);
      return `<div class="table-wrap" data-table="${id}"><div class="table-scroll"><table class="sortable"><thead><tr>${columns.map((c, i) => `<th ${i < columns.length - 1 ? `data-sort-table="${id}" data-sort-col="${i}"` : ""}>${c}</th>`).join("")}</tr></thead><tbody>${shown.map((r, i) => `<tr class="${i === 0 && page === 1 ? "selected" : ""}">${r.map((x, idx) => `<td>${idx === r.length - 1 || idx === 3 && id === "normativa" || idx === 5 && id === "historial" || idx === 4 && id === "jurisprudencia" ? priority(x) : idx === 0 ? `<b>${x}</b>` : x}</td>`).join("")}<td>${rowActions()}</td></tr>`).join("")}</tbody></table></div><div class="table-foot"><span>Mostrando ${shown.length} de ${processed.length || rows.length} resultados</span>${tablePages(id, page, Math.max(1, Math.ceil(processed.length / limit)), last)}</div></div>`;
    }

    function tableState(id) {
      if (!state.table[id]) state.table[id] = { q: "", filters: [], sort: 0, dir: 1, page: 1 };
      return state.table[id];
    }

    function tableRows(id, rows) {
      const s = tableState(id);
      const activeFilters = (s.filters || []).filter(v => v && v !== "Todas");
      let out = rows.filter(r => {
        const text = r.join(" ").toLowerCase();
        return (!s.q || text.includes(s.q.toLowerCase())) && activeFilters.every(f => text.includes(f.toLowerCase()));
      });
      if (Number.isInteger(s.sort)) {
        out = [...out].sort((a, b) => String(a[s.sort] || "").localeCompare(String(b[s.sort] || ""), "es") * (s.dir || 1));
      }
      return out;
    }

    function tablePages(id, page, total, last) {
      return `<div class="pages"><button class="page" data-table-page="${id}" data-page="${Math.max(1, page - 1)}">‹</button>${[1,2,3].filter(p => p <= total).map(p => `<button class="page ${p === page ? "active" : ""}" data-table-page="${id}" data-page="${p}">${p}</button>`).join("")}<span>...</span><button class="page" data-table-page="${id}" data-page="${total}">${last}</button><button class="page" data-table-page="${id}" data-page="${Math.min(total, page + 1)}">›</button></div>`;
    }

    function caseSummaryPanel() {
      return `<div class="panel pad"><div class="section-head"><h2 class="section-title">Resumen del caso seleccionado</h2><span class="pill">${DEMO_DATA.case.id}</span></div><div class="detail-grid">
        ${[["Delito",DEMO_DATA.case.crime],["Fiscal asignado","Doctor"],["Etapa actual",DEMO_DATA.case.stage],["Plazo límite","20/04/2024 (5 días)"],["Última actuación","Solicitud de formalización presentada"],["Evidencias registradas","12 documentos"],["Riesgo del caso","Alto"],["Próxima audiencia","Audiencia de formalización"]].map((r, i) => `<div class="${i === 4 ? "wide" : ""}"><div class="detail-label">${r[0]}</div><div class="detail-value">${r[1]}</div></div>`).join("")}
      </div><h2 class="section-title" style="margin-top:16px">Hitos del caso</h2><div class="timeline-mini">${["Investigación inicial","Recolección de evidencias","Formalización","Acusación","Juicio"].map((s, i) => `<div class="step ${i < 2 ? "done" : i === 2 ? "active" : ""}"><span>${i+1}</span><div>${s}</div></div>`).join("")}</div></div>`;
    }

    function knowledgeDetail(cfg) {
      return `<div class="panel pad"><div class="section-head"><h2 class="section-title">${cfg.detailTitle}</h2><span class="pill red">Alta coincidencia</span></div><h2 class="section-title">${cfg.selectedTitle}</h2><div class="detail-grid">
        <div><div class="detail-label">Tipo</div><div class="detail-value">${cfg.id === "normativa" ? "Ley" : "Casación"}</div></div>
        <div><div class="detail-label">Materia</div><div class="detail-value">Derecho Penal</div></div>
        <div class="wide"><div class="detail-label">Relación con el caso</div><div class="detail-value">Define el criterio aplicable para sostener la imputación por robo agravado y sus circunstancias específicas.</div></div>
        <div><div class="detail-label">Nivel de coincidencia</div><div class="detail-value"><span class="status-dot orange"></span>Alta</div></div>
      </div><div class="bottom-split" style="margin-top:12px"><div class="panel pad" style="box-shadow:none"><div class="section-title">Normativa relacionada</div><ul class="bullet-list"><li>Código Penal, arts. 188 y 189.</li><li>Código Procesal Penal, arts. 159 y 160.</li></ul></div><div class="panel pad" style="box-shadow:none"><div class="section-title">Citas clave</div><ul class="bullet-list"><li>Uso de arma y amenaza.</li><li>Desapoderamiento e intimidación.</li></ul></div></div></div>`;
    }

    function historyDetail() {
      return `<div class="panel pad"><div class="section-head"><h2 class="section-title">Detalle del registro seleccionado</h2><span class="pill red">Alta</span></div><h2 class="section-title">${DEMO_DATA.historial[0][1]}</h2><div class="detail-grid">${[["Fecha","10/04/2024 10:45 a. m."],["Usuario","Doctor"],["Módulo","Gestión de casos"],["Caso",DEMO_DATA.case.id],["Documento relacionado","Disposición fiscal de formalización"],["Estado","Registrado"]].map(r => `<div><div class="detail-label">${r[0]}</div><div class="detail-value">${r[1]}</div></div>`).join("")}<div class="wide"><div class="detail-label">Impacto en el caso</div><div class="detail-value">Impulsa el avance a formalización, vincula medios probatorios y refuerza la teoría fiscal.</div></div></div><button class="btn ghost" data-toast="Registro simulado." style="margin-top:12px">Ver registro ${icon("external")}</button></div>`;
    }

    function aiPanel(key, tall = false) {
      const prompts = ["Fortalece teoría", "Revisa evidencia", "Sugiere norma"];
      const style = `--ia-x:${state.ia.x || 0}px;--ia-y:${state.ia.y || 0}px`;
      return `<div class="panel pad ai-panel is-floating ${state.ia.minimized ? "minimized" : ""}" data-ai-panel style="${style}">
        <div class="ai-title" data-ai-handle><span>${icon("target")} Asistencia IA-Legal</span><span class="online"><span class="status-dot green"></span>En línea</span><button class="icon-btn" data-ai-minimize aria-label="${state.ia.minimized ? "Restaurar IA-Legal" : "Minimizar IA-Legal"}">${state.ia.minimized ? "›" : "−"}</button></div>
        <div class="quick-prompts">${prompts.map(p => `<button class="prompt-chip" data-ai-prompt="${p}">${p}</button>`).join("")}</div>
        <div class="chat"><div class="tiny">Consulta sobre este caso</div><div class="bubble">¿Qué ${key === "teoria" ? "normativa es aplicable al caso" : key === "canvas" ? "relaciones conviene contrastar" : "análisis fortalece este caso"}?</div><div class="bubble response">${DEMO_DATA.ai[key] || DEMO_DATA.ai.teoria}</div><div class="ai-cols"><div class="ai-mini"><strong>Normativa aplicable</strong>CP: arts. 188 y 189<br>CPP: arts. 159 y 160</div><div class="ai-mini"><strong>Teorías sugeridas</strong>Autoría directa<br>Apoderamiento</div><div class="ai-mini"><strong>Líneas de sustento</strong>Video, testimonio e incautación</div></div>${tall ? `<button class="btn ghost" data-toast="Análisis completo simulado." style="justify-self:center">Ver análisis completo ${icon("external")}</button>` : ""}</div>
        <div class="ask"><input placeholder="Escribe tu consulta..."><button class="btn primary" data-ai-send>${icon("send")}</button></div>
      </div>`;
    }

    function recentPanel(title) {
      return `<div class="panel pad"><div class="section-head"><h2 class="section-title">${title}</h2><button class="btn small" data-toast="Listado simulado.">Ver todas</button></div><div class="list">${DEMO_DATA.historial.slice(0,4).map(r => `<div class="list-row" style="grid-template-columns:minmax(120px,.6fr) minmax(0,1fr) minmax(80px,.45fr)"><div class="tiny">${r[0]}</div><strong>${r[1]}</strong><div class="tiny">${r[3]}</div></div>`).join("")}</div></div>`;
    }

    function savedPanel(title) {
      return `<div class="panel pad saved-list"><div class="section-head"><h2 class="section-title">${title}</h2></div><div class="list">${["Código Penal – arts. 188 y 189","Código Procesal Penal – arts. 159, 160, 313 y 314","Constitución Política – tutela jurisdiccional"].map((x, i) => `<div class="list-row">${icon("book")}<strong>${x}</strong><span class="tiny">${i ? "Ayer" : "Hoy"}</span></div>`).join("")}</div><button class="btn ghost" data-toast="Guardados simulados." style="width:100%;margin-top:8px">Ver todas las guardadas (18) ${icon("external")}</button></div>`;
    }

    function quickPanel(items, variant = "") {
      return `<div class="panel pad"><h2 class="section-title">Acciones rápidas</h2><div class="quick-grid ${variant}">${items.map(([t, ic]) => `<button class="btn ghost" data-toast="${t} simulado.">${icon(ic)}<span>${t}</span></button>`).join("")}</div></div>`;
    }

    function priority(v) {
      const tone = v === "Urgente" || v === "Alta" ? "red" : v === "Media" ? "orange" : v === "Baja" ? "" : "red";
      return `<span class="pill ${tone}">${v}</span>`;
    }
    function status(v) {
      const tone = v === "En trámite" ? "green" : v === "En análisis" ? "" : "orange";
      return `<span class="pill ${tone}">${v}</span>`;
    }
    function rowActions() {
      return `<span class="row-actions"><button class="icon-btn" data-row-detail aria-label="Ver detalle">${icon("eye")}</button><button class="icon-btn" data-toast="Editar simulado." aria-label="Editar">${icon("edit")}</button><button class="icon-btn" data-row-detail aria-label="Abrir detalle">${icon("external")}</button></span>`;
    }
    function pages(last) {
      return `<div class="pages"><button class="page">‹</button><button class="page active">1</button><button class="page">2</button><button class="page">3</button><span>...</span><button class="page">${last}</button><button class="page">›</button></div>`;
    }

    function evidenceModal() {
      return `<div class="modal" role="dialog" aria-modal="true" aria-label="Evidencias del caso">
        <div class="modal-head"><div class="modal-title"><div class="orb">${icon("folder")}</div><div><strong>Evidencias del caso</strong><span>Caso: ${DEMO_DATA.case.id}</span></div></div><div class="actions"><button class="btn ghost" data-toast="Agregar evidencia simulado.">${icon("plus")} Agregar evidencia</button><button class="icon-btn" data-close-modal aria-label="Cerrar">${icon("close")}</button></div></div>
        <div class="modal-body">${DEMO_DATA.evidence.map((e, i) => `<div class="evidence-row"><div class="thumb ${i === 1 ? "phone" : i === 2 ? "doc" : i === 3 ? "person" : ""}">${i === 0 ? "▶<small>02:14</small>" : icon(i === 1 ? "phone" : i === 3 ? "user" : "doc")}</div><div><div class="ev-title">${i+1}. ${e[0]}</div><div class="ev-meta"><span><b>Archivo:</b> ${e[1]}</span><span><b>Duración:</b> ${e[2]}</span><span><b>Captura:</b> ${e[3]}</span></div></div><div class="ev-meta"><span><b>Fuente:</b> ${e[4]}</span><span><b>Fecha:</b> ${e[5]}</span><span><b>Responsable:</b> ${e[6]}</span></div><div style="display:grid;gap:8px"><button class="btn ghost small" data-toast="${e[7]} simulado.">${e[7]}</button><button class="btn ghost small" data-toast="Descargar simulado.">Descargar</button></div></div>`).join("")}</div>
        <div class="modal-foot"><span class="tiny">4 evidencias</span><button class="btn primary" data-screen="teoria" data-close-modal>Ir a página de evidencias ${icon("external")}</button></div>
      </div>`;
    }

    function detailDrawer() {
      return `<aside class="detail-drawer" role="dialog" aria-modal="true" aria-label="Detalle del caso">
        <div class="modal-head"><div class="modal-title"><div class="orb">${icon("folder")}</div><div><strong>Detalle del caso</strong><span>${DEMO_DATA.case.id}</span></div></div><button class="icon-btn" data-close-modal aria-label="Cerrar detalle">${icon("close")}</button></div>
        <div class="drawer-body">
          <h2 class="section-title">${DEMO_DATA.case.crime}</h2>
          <div class="tiny">Resumen simulado del expediente fiscal activo.</div>
          <div class="drawer-meta">
            ${[["Responsable", DEMO_DATA.case.owner], ["Etapa", DEMO_DATA.case.stage], ["Última actualización", state.lastUpdated], ["Actuaciones simuladas", String(state.actionCount)], ["Evidencias", "4 evidencias clave vinculadas"], ["Próxima acción", "Solicitar formalización de la investigación"]].map(r => `<div><div class="detail-label">${r[0]}</div><div class="detail-value">${r[1]}</div></div>`).join("")}
          </div>
          <button class="btn primary" data-copy-case style="margin-top:18px;width:100%">Copiar ID de caso</button>
        </div>
      </aside>`;
    }

    function rowDrawer() {
      const d = state.rowDrawer || { title: "Registro", rows: [] };
      return `<aside class="detail-drawer" role="dialog" aria-modal="true" aria-label="Detalle del registro">
        <div class="modal-head"><div class="modal-title"><div class="orb">${icon("doc")}</div><div><strong>Detalle del registro</strong><span>${escapeHtml(d.title)}</span></div></div><button class="icon-btn" data-close-modal aria-label="Cerrar detalle">${icon("close")}</button></div>
        <div class="drawer-body">
          <h2 class="section-title">${escapeHtml(d.title)}</h2>
          <div class="tiny">Vista de detalle simulada generada desde la tabla.</div>
          <div class="drawer-meta">
            ${d.rows.map(r => `<div><div class="detail-label">${escapeHtml(r[0])}</div><div class="detail-value">${escapeHtml(r[1])}</div></div>`).join("")}
          </div>
          <button class="btn primary" data-close-modal style="margin-top:18px;width:100%">Cerrar detalle</button>
        </div>
      </aside>`;
    }

    function openRowDrawer(btn) {
      const tr = btn.closest("tr");
      const table = btn.closest("table");
      if (!tr || !table) return;
      const heads = [...table.querySelectorAll("thead th")].map(th => th.textContent.trim());
      const cells = [...tr.children];
      const rows = [];
      cells.forEach((td, i) => {
        if (td.querySelector(".row-actions")) return;
        rows.push([heads[i] || `Campo ${i + 1}`, td.textContent.trim()]);
      });
      state.rowDrawer = { title: cells[0] ? cells[0].textContent.trim() : "Registro", rows };
      state.modal = false;
      state.drawer = false;
      app();
      simulateAction("Detalle del registro abierto.");
    }

    function bind() {
      document.querySelectorAll("[data-screen]").forEach(el => el.addEventListener("click", () => {
        const target = el.dataset.screen;
        if (target) state.screen = target;
        state.modal = false;
        state.drawer = false;
        app();
      }));
      document.querySelectorAll("[data-toast]").forEach(el => el.addEventListener("click", ev => {
        ev.stopPropagation();
        simulateAction(el.dataset.toast);
      }));
      document.querySelectorAll("[data-toggle-sidebar]").forEach(el => el.addEventListener("click", () => {
        state.sidebarCollapsed = !state.sidebarCollapsed;
        localStorage.setItem("fcis.sidebarCollapsed", String(state.sidebarCollapsed));
        app();
      }));
      document.querySelectorAll("[data-open-detail]").forEach(el => el.addEventListener("click", () => {
        state.drawer = true;
        state.modal = false;
        app();
      }));
      document.querySelectorAll("[data-open-evidence]").forEach(el => el.addEventListener("click", () => {
        state.modal = true;
        state.drawer = false;
        app();
      }));
      document.querySelectorAll("[data-row-detail]").forEach(el => el.addEventListener("click", ev => {
        ev.stopPropagation();
        openRowDrawer(el);
      }));
      document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", () => {
        state.modal = false;
        state.drawer = false;
        state.rowDrawer = null;
        app();
      }));
      document.getElementById("modal").addEventListener("click", ev => {
        if (ev.target.id === "modal") {
          state.modal = false;
          state.drawer = false;
          state.rowDrawer = null;
          app();
        }
      });
      document.querySelectorAll(".search input").forEach(input => {
        input.addEventListener("input", () => {
          state.searchQuery = input.value;
          applySearchFilter(state.searchQuery);
        });
        input.addEventListener("keydown", ev => {
          if (ev.key === "Enter") simulateAction("Búsqueda simulada para demo.");
        });
      });
      document.querySelectorAll(".ask input").forEach(input => input.addEventListener("keydown", ev => {
        if (ev.key === "Enter") simulateAi(input.closest(".ai-panel"));
      }));
      document.querySelectorAll("[data-ai-send]").forEach(el => el.addEventListener("click", () => simulateAi(el.closest(".ai-panel"))));
      document.querySelectorAll("[data-ai-minimize]").forEach(el => el.addEventListener("click", ev => {
        ev.stopPropagation();
        state.ia.minimized = !state.ia.minimized;
        localStorage.setItem("fcis.iaPanel", JSON.stringify(state.ia));
        app();
      }));
      document.querySelectorAll("[data-ai-prompt]").forEach(el => el.addEventListener("click", () => {
        const panel = el.closest(".ai-panel");
        const input = panel?.querySelector(".ask input");
        if (input) input.value = el.dataset.aiPrompt;
        simulateAi(panel);
      }));
      initAiDrag();
      if (state.screen === "canvas") initCanvasScreen();
      if (state.screen === "teoria") { recalcTheoryConnectors(); setTimeout(recalcTheoryConnectors, 40); }
      document.querySelectorAll("[data-theory-auto]").forEach(el => el.addEventListener("click", autoOrganizeTheory));
      bindDynamicTables();
      document.querySelectorAll("[data-theory-index]").forEach(el => {
        el.addEventListener("click", ev => {
          if (ev.target.closest("[data-open-evidence]")) return;
          state.selectedTheory = Number(el.dataset.theoryIndex);
          state.demoIndex = state.selectedTheory;
          simulateAction(`Detalle actualizado: ${DEMO_DATA.theoryCards[state.selectedTheory][0]}`);
          app();
        });
        el.addEventListener("keydown", ev => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            el.click();
          }
        });
        el.addEventListener("dragstart", ev => {
          if (matchMedia("(max-width: 720px)").matches) return ev.preventDefault();
          ev.dataTransfer.setData("text/plain", el.dataset.theoryIndex);
        });
        el.addEventListener("dragover", ev => ev.preventDefault());
        el.addEventListener("drop", ev => {
          ev.preventDefault();
          const from = Number(ev.dataTransfer.getData("text/plain"));
          const to = Number(el.dataset.theoryIndex);
          reorderTheory(from, to);
        });
      });
      document.querySelectorAll("[data-tour]").forEach(el => el.addEventListener("click", () => {
        state.demoMode = !state.demoMode;
        if (state.demoMode) {
          state.screen = "teoria";
          state.demoIndex = 0;
          state.selectedTheory = 0;
          simulateAction("Recorrido demo iniciado. Usa las flechas para avanzar.");
        } else {
          simulateAction("Recorrido demo pausado.");
        }
        app();
      }));
      document.querySelectorAll("[data-export-summary]").forEach(el => el.addEventListener("click", exportSummary));
      document.querySelectorAll("[data-copy-case]").forEach(el => el.addEventListener("click", copyCaseId));
      document.onkeydown = ev => {
        const activeTag = document.activeElement && document.activeElement.tagName;
        if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "k") {
          ev.preventDefault();
          document.querySelector(".search input")?.focus();
        }
        if (ev.key === "Escape" && (state.modal || state.drawer || state.rowDrawer || !state.ia.minimized)) {
          if (state.modal || state.drawer || state.rowDrawer) {
            state.modal = false;
            state.drawer = false;
            state.rowDrawer = null;
          } else {
            state.ia.minimized = true;
            localStorage.setItem("fcis.iaPanel", JSON.stringify(state.ia));
          }
          app();
        }
        if (state.demoMode && state.screen === "teoria" && !["INPUT", "TEXTAREA", "SELECT"].includes(activeTag)) {
          if (ev.key === "ArrowRight") {
            ev.preventDefault();
            state.demoIndex = (state.demoIndex + 1) % DEMO_DATA.theoryCards.length;
            state.selectedTheory = state.demoIndex;
            app();
          }
          if (ev.key === "ArrowLeft") {
            ev.preventDefault();
            state.demoIndex = (state.demoIndex - 1 + DEMO_DATA.theoryCards.length) % DEMO_DATA.theoryCards.length;
            state.selectedTheory = state.demoIndex;
            app();
          }
        }
      };
    }

    function canvasSave() {
      localStorage.setItem("fcis.canvasState", JSON.stringify(state.canvas));
    }

    function canvasIsMobile() {
      return matchMedia("(max-width: 720px)").matches;
    }

    function canvasSetTransform() {
      const content = document.querySelector("[data-canvas-content]");
      if (content && !canvasIsMobile()) content.style.transform = `translate(${state.canvas.panX}px,${state.canvas.panY}px) scale(${state.canvas.zoom})`;
      const label = document.querySelector(".zoom-value");
      if (label) label.textContent = Math.round(state.canvas.zoom * 100) + "%";
    }

    function canvasUpdateLinks() {
      const svg = document.querySelector(".canvas-links");
      if (svg) svg.outerHTML = canvasSvg();
    }

    function clamp(v, min, max) {
      return Math.max(min, Math.min(max, v));
    }

    function canvasFit() {
      const board = document.querySelector("[data-canvas-board]");
      if (!board || canvasIsMobile()) return;
      const nodes = canvasActiveNodes().filter(n => !state.canvas.hidden.includes(n.type));
      if (!nodes.length) return;
      canvasResolvePositions();
      const xs = nodes.map(n => canvasPos(n.id).x), ys = nodes.map(n => canvasPos(n.id).y);
      const minX = Math.min(...xs) - 20, minY = Math.min(...ys) - 20;
      const maxX = Math.max(...xs) + 190, maxY = Math.max(...ys) + 96;
      const bw = board.clientWidth, bh = board.clientHeight;
      const z = clamp(Math.min(bw / (maxX - minX), bh / (maxY - minY)), 0.3, 1.3);
      state.canvas.zoom = z;
      state.canvas.panX = (bw - (maxX - minX) * z) / 2 - minX * z;
      state.canvas.panY = (bh - (maxY - minY) * z) / 2 - minY * z;
      canvasSetTransform();
      canvasSave();
    }

    function canvasResetView() {
      state.canvas.zoom = 0.8;
      state.canvas.panX = 24;
      state.canvas.panY = 16;
      state.canvas.positions = {};
      state.canvas.path = [];
      canvasSave();
      app();
      simulateAction("Vista del canvas restablecida.");
    }

    function canvasShortestPath(a, b) {
      const adj = {};
      canvasActiveLinks().forEach(l => {
        (adj[l.from] = adj[l.from] || []).push(l.to);
        (adj[l.to] = adj[l.to] || []).push(l.from);
      });
      const queue = [[a]], seen = new Set([a]);
      while (queue.length) {
        const path = queue.shift();
        const last = path[path.length - 1];
        if (last === b) return path;
        (adj[last] || []).forEach(nx => {
          if (!seen.has(nx)) { seen.add(nx); queue.push(path.concat(nx)); }
        });
      }
      return [];
    }

    function applyCanvasSearch() {
      const q = (state.canvas.search || "").trim().toLowerCase();
      document.querySelectorAll("[data-canvas-node]").forEach(el => {
        const hit = !q || el.textContent.toLowerCase().includes(q);
        el.classList.toggle("dim", !!q && !hit);
        el.classList.toggle("match", !!q && hit);
      });
    }

    function canvasContrast() {
      const cases = state.canvas.cases;
      const byCase = cases.map(cid => ({ cid, meta: canvasMetaFor(cid), g: DEMO_DATA.canvasCases[cid] })).filter(c => c.g);
      const peopleMap = {};
      byCase.forEach(c => c.g.nodes.filter(n => n[1] === "persona").forEach(n => (peopleMap[n[2]] = peopleMap[n[2]] || new Set()).add(c.cid)));
      const shared = Object.entries(peopleMap).filter(([, v]) => v.size > 1).map(([k, v]) => `${k} → ${[...v].map(x => x.slice(-5)).join(", ")}`);
      const typeMap = {};
      byCase.forEach(c => new Set(c.g.nodes.map(n => n[1])).forEach(t => {
        if (["evidencia", "dispositivo", "financiero", "comunicacion"].includes(t)) (typeMap[t] = typeMap[t] || new Set()).add(c.cid);
      }));
      const repeated = Object.entries(typeMap).filter(([, v]) => v.size > 1).map(([k, v]) => `${k} (${v.size} casos)`);
      const modus = byCase.map(c => `${c.meta[3]}: ${c.g.modus}`);
      const weak = byCase.map(c => `${c.meta[3]}: ${c.g.weak}`);
      return { shared, repeated, modus, weak, byCase };
    }

    function canvasIaInject(html) {
      const panel = document.querySelector(".canvas-detail [data-ai-panel]") || document.querySelector("[data-ai-panel]");
      if (!panel) return;
      if (panel.classList.contains("minimized")) {
        state.ia.minimized = false;
        localStorage.setItem("fcis.iaPanel", JSON.stringify(state.ia));
        app();
        return canvasIaInject(html);
      }
      const chat = panel.querySelector(".chat");
      if (!chat) return;
      const typing = document.createElement("div");
      typing.className = "bubble response typing";
      typing.innerHTML = "<i></i><i></i><i></i>";
      chat.appendChild(typing);
      chat.scrollTop = chat.scrollHeight;
      simulateAction("IA-Legal está preparando un análisis simulado.");
      setTimeout(() => {
        typing.className = "bubble response";
        typing.innerHTML = html;
        chat.scrollTop = chat.scrollHeight;
      }, 850);
    }

    function canvasShowContrast() {
      if (state.canvas.cases.length < 2) {
        simulateAction("Selecciona al menos 2 casos para contrastar.");
        return;
      }
      const c = canvasContrast();
      const html = `<strong>Contraste de ${state.canvas.cases.length} casos</strong>
        <div style="margin-top:4px"><b>Personas compartidas:</b> ${c.shared.length ? c.shared.join("; ") : "ninguna detectada"}</div>
        <div><b>Patrones de evidencia repetidos:</b> ${c.repeated.length ? c.repeated.join(", ") : "sin coincidencias"}</div>
        <div><b>Modus operandi:</b> ${c.modus.join(" | ")}</div>
        <div><b>Puntos débiles comunes:</b> ${c.weak.join(" | ")}</div>`;
      canvasIaInject(html);
      simulateAction(`Contraste generado: ${c.shared.length} persona(s) compartida(s).`);
    }

    function canvasShowInsight() {
      if (!state.canvas.cases.length) {
        simulateAction("Selecciona un caso para generar insight.");
        return;
      }
      const nodes = canvasActiveNodes();
      const strongest = nodes.filter(n => n.strength > 0).sort((a, b) => b.strength - a.strength)[0];
      const crimes = state.canvas.cases.map(cid => canvasMetaFor(cid)[1]);
      const norms = nodes.filter(n => n.type === "normativa").map(n => n.title);
      const juris = nodes.filter(n => n.type === "jurisprudencia").map(n => n.title);
      const weak = state.canvas.cases.map(cid => DEMO_DATA.canvasCases[cid].weak)[0];
      const html = `<strong>Insight IA-Legal</strong>
        <div style="margin-top:4px"><b>Patrón delictivo:</b> ${crimes.join(", ")}.</div>
        <div><b>Evidencia más fuerte:</b> ${strongest ? `${strongest.title} (${strongest.strength}/100)` : "sin evidencia ponderada"}.</div>
        <div><b>Punto débil probatorio:</b> ${weak}</div>
        <div><b>Acción sugerida:</b> reforzar cadena de custodia y formalizar la investigación.</div>
        <div><b>Normativa aplicable:</b> ${norms.join("; ") || "—"}</div>
        <div><b>Jurisprudencia:</b> ${juris.join("; ") || "—"}</div>`;
      canvasIaInject(html);
      simulateAction("Insight simulado generado por IA-Legal.");
    }

    function canvasExport() {
      const c = canvasContrast();
      const nodes = canvasActiveNodes();
      const counts = {};
      nodes.forEach(n => (counts[n.type] = (counts[n.type] || 0) + 1));
      const lines = [
        "FCIS - Resumen del Canvas dinámico",
        "Generado: " + new Date().toLocaleString("es-PE"),
        "",
        "Casos seleccionados:",
        ...state.canvas.cases.map(cid => `  - ${cid} (${canvasMetaFor(cid)[1]})`),
        "",
        "Nodos por tipo: " + Object.entries(counts).map(([t, n]) => `${t}=${n}`).join(", "),
        "Relaciones totales: " + canvasActiveLinks().length,
        "",
        "Personas compartidas entre casos: " + (c.shared.join("; ") || "ninguna"),
        "Patrones de evidencia repetidos: " + (c.repeated.join(", ") || "ninguno"),
        "",
        "Modus operandi:",
        ...c.modus.map(m => "  - " + m),
        "",
        "Puntos débiles:",
        ...c.weak.map(w => "  - " + w),
        "",
        LEGAL
      ];
      const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "fcis-canvas-resumen.txt";
      a.click();
      URL.revokeObjectURL(url);
      simulateAction("Resumen del canvas exportado (.txt).");
    }

    function initCanvasScreen() {
      const board = document.querySelector("[data-canvas-board]");
      const content = document.querySelector("[data-canvas-content]");
      if (!board || !content) return;
      const mobile = canvasIsMobile();

      // Multi-case selector
      document.querySelectorAll("[data-case-toggle]").forEach(el => el.addEventListener("click", () => {
        const id = el.dataset.caseToggle;
        const set = state.canvas.cases;
        if (set.includes(id)) {
          if (set.length === 1) return simulateAction("Debe permanecer al menos un caso seleccionado.");
          state.canvas.cases = set.filter(x => x !== id);
        } else {
          state.canvas.cases = [...set, id];
        }
        state.canvas.path = [];
        state.canvas.selected = [];
        canvasSave();
        app();
        simulateAction(`Casos en canvas: ${state.canvas.cases.length}.`);
      }));

      // Zoom / view controls
      document.querySelectorAll("[data-zoom]").forEach(el => el.addEventListener("click", () => {
        const z = el.dataset.zoom;
        if (z === "fit") return canvasFit();
        if (z === "reset") return canvasResetView();
        state.canvas.zoom = clamp(state.canvas.zoom + (z === "+" ? 0.12 : -0.12), 0.3, 1.6);
        canvasSetTransform();
        canvasSave();
      }));
      document.querySelectorAll("[data-canvas-fullscreen]").forEach(el => el.addEventListener("click", () => {
        const shell = el.closest(".canvas-shell");
        if (!document.fullscreenElement && shell.requestFullscreen) {
          shell.requestFullscreen().then(() => setTimeout(canvasFit, 120)).catch(() => shell.classList.toggle("canvas-fullscreen"));
        } else if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          shell.classList.toggle("canvas-fullscreen");
          setTimeout(canvasFit, 120);
        }
      }));

      // Tools
      document.querySelectorAll("[data-canvas-search]").forEach(input => input.addEventListener("input", () => {
        state.canvas.search = input.value;
        canvasSave();
        applyCanvasSearch();
      }));
      document.querySelectorAll("[data-canvas-lasso]").forEach(el => el.addEventListener("click", () => {
        canvasLassoMode = !canvasLassoMode;
        el.classList.toggle("is-on", canvasLassoMode);
        simulateAction(canvasLassoMode ? "Modo lazo activado: arrastra sobre el lienzo." : "Modo lazo desactivado.");
      }));
      document.querySelectorAll("[data-canvas-group]").forEach(el => el.addEventListener("click", () => {
        if (state.canvas.selected.length < 2) return simulateAction("Selecciona 2 o más nodos para agrupar.");
        state.canvas.groups["g" + Date.now()] = [...state.canvas.selected];
        canvasSave();
        app();
        simulateAction(`Grupo creado con ${state.canvas.selected.length} nodos.`);
      }));
      document.querySelectorAll("[data-canvas-ungroup]").forEach(el => el.addEventListener("click", () => {
        const sel = state.canvas.selected;
        const before = Object.keys(state.canvas.groups).length;
        if (sel.length) {
          Object.keys(state.canvas.groups).forEach(gid => {
            if (state.canvas.groups[gid].some(id => sel.includes(id))) delete state.canvas.groups[gid];
          });
        } else {
          state.canvas.groups = {};
        }
        canvasSave();
        app();
        simulateAction(before ? "Grupos disueltos." : "No hay grupos por disolver.");
      }));
      document.querySelectorAll("[data-canvas-path]").forEach(el => el.addEventListener("click", () => {
        if (state.canvas.selected.length !== 2) return simulateAction("Selecciona exactamente 2 nodos (Shift+clic) para la ruta.");
        const path = canvasShortestPath(state.canvas.selected[0], state.canvas.selected[1]);
        state.canvas.path = path;
        canvasSave();
        app();
        simulateAction(path.length ? `Ruta más corta: ${path.length} nodos.` : "No existe ruta entre los nodos.");
      }));
      document.querySelectorAll("[data-canvas-mode]").forEach(el => el.addEventListener("change", () => {
        state.canvas.mode = el.value;
        canvasSave();
        app();
        simulateAction("Modo de visualización: " + el.options[el.selectedIndex].text + ".");
      }));
      document.querySelectorAll("[data-canvas-type]").forEach(el => el.addEventListener("click", () => {
        const t = el.dataset.canvasType;
        const set = new Set(state.canvas.hidden);
        set.has(t) ? set.delete(t) : set.add(t);
        state.canvas.hidden = [...set];
        canvasSave();
        app();
      }));
      document.querySelectorAll("[data-canvas-contrast]").forEach(el => el.addEventListener("click", canvasShowContrast));
      document.querySelectorAll("[data-canvas-insight]").forEach(el => el.addEventListener("click", canvasShowInsight));
      document.querySelectorAll("[data-canvas-export]").forEach(el => el.addEventListener("click", canvasExport));

      applyCanvasSearch();

      // Node dragging + selection
      document.querySelectorAll("[data-canvas-node]").forEach(node => {
        const id = node.dataset.canvasNode;
        if (mobile) {
          node.addEventListener("click", () => {
            state.canvas.selected = [id];
            state.selectedCanvasNode = id;
            localStorage.setItem("fcis.selectedCanvasNode", id);
            canvasSave();
            app();
          });
          return;
        }
        node.addEventListener("pointerdown", ev => {
          if (ev.button !== 0) return;
          ev.stopPropagation();
          const scale = state.canvas.zoom;
          const moveSet = state.canvas.selected.includes(id) && state.canvas.selected.length > 1 ? [...state.canvas.selected] : [id];
          const bases = {};
          moveSet.forEach(nid => { bases[nid] = Object.assign({}, canvasPos(nid)); });
          const start = { x: ev.clientX, y: ev.clientY, moved: false };
          try { node.setPointerCapture(ev.pointerId); } catch (e) {}
          const move = e => {
            const dx = (e.clientX - start.x) / scale;
            const dy = (e.clientY - start.y) / scale;
            if (Math.abs(dx) + Math.abs(dy) > 3) start.moved = true;
            moveSet.forEach(nid => {
              const x = clamp(bases[nid].x + dx, 0, CANVAS_W - 60);
              const y = clamp(bases[nid].y + dy, 0, canvasWorldHeight() - 40);
              state.canvas.positions[nid] = { x, y };
              canvasResolved[nid] = { x, y };
              const el = document.querySelector(`[data-canvas-node="${nid}"]`);
              if (el) { el.style.left = x + "px"; el.style.top = y + "px"; }
            });
            canvasUpdateLinks();
          };
          const up = ev2 => {
            node.removeEventListener("pointermove", move);
            node.removeEventListener("pointerup", up);
            if (start.moved) {
              canvasSave();
            } else {
              if (ev2.shiftKey) {
                const sel = new Set(state.canvas.selected);
                sel.has(id) ? sel.delete(id) : sel.add(id);
                state.canvas.selected = [...sel];
              } else {
                state.canvas.selected = [id];
              }
              state.selectedCanvasNode = id;
              localStorage.setItem("fcis.selectedCanvasNode", id);
              canvasSave();
              app();
            }
          };
          node.addEventListener("pointermove", move);
          node.addEventListener("pointerup", up);
        });
      });

      // Board pan + lasso
      if (!mobile) {
        board.addEventListener("wheel", e => {
          e.preventDefault();
          const rect = board.getBoundingClientRect();
          const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
          const wx = (cx - state.canvas.panX) / state.canvas.zoom;
          const wy = (cy - state.canvas.panY) / state.canvas.zoom;
          state.canvas.zoom = clamp(state.canvas.zoom * (e.deltaY < 0 ? 1.1 : 0.9), 0.3, 1.6);
          state.canvas.panX = cx - wx * state.canvas.zoom;
          state.canvas.panY = cy - wy * state.canvas.zoom;
          canvasSetTransform();
          canvasSave();
        }, { passive: false });

        board.addEventListener("pointerdown", ev => {
          if (ev.button !== 0 || ev.target.closest("[data-canvas-node]")) return;
          const rect = board.getBoundingClientRect();
          if (canvasLassoMode) {
            const lasso = board.querySelector("[data-lasso-rect]");
            const ox = ev.clientX - rect.left, oy = ev.clientY - rect.top;
            lasso.hidden = false;
            try { board.setPointerCapture(ev.pointerId); } catch (e) {}
            const move = e => {
              const x = e.clientX - rect.left, y = e.clientY - rect.top;
              lasso.style.left = Math.min(ox, x) + "px";
              lasso.style.top = Math.min(oy, y) + "px";
              lasso.style.width = Math.abs(x - ox) + "px";
              lasso.style.height = Math.abs(y - oy) + "px";
            };
            const up = e => {
              board.removeEventListener("pointermove", move);
              board.removeEventListener("pointerup", up);
              lasso.hidden = true;
              const x2 = e.clientX - rect.left, y2 = e.clientY - rect.top;
              const rx1 = Math.min(ox, x2), ry1 = Math.min(oy, y2), rx2 = Math.max(ox, x2), ry2 = Math.max(oy, y2);
              const picked = canvasActiveNodes().filter(n => !state.canvas.hidden.includes(n.type)).filter(n => {
                const p = canvasPos(n.id);
                const sx = p.x * state.canvas.zoom + state.canvas.panX + 85 * state.canvas.zoom;
                const sy = p.y * state.canvas.zoom + state.canvas.panY + 36 * state.canvas.zoom;
                return sx >= rx1 && sx <= rx2 && sy >= ry1 && sy <= ry2;
              }).map(n => n.id);
              state.canvas.selected = picked;
              canvasSave();
              app();
              simulateAction(`Lazo: ${picked.length} nodo(s) seleccionado(s).`);
            };
            board.addEventListener("pointermove", move);
            board.addEventListener("pointerup", up);
          } else {
            const start = { x: ev.clientX, y: ev.clientY, px: state.canvas.panX, py: state.canvas.panY };
            board.style.cursor = "grabbing";
            try { board.setPointerCapture(ev.pointerId); } catch (e) {}
            const move = e => {
              state.canvas.panX = start.px + (e.clientX - start.x);
              state.canvas.panY = start.py + (e.clientY - start.y);
              canvasSetTransform();
            };
            const up = () => {
              board.removeEventListener("pointermove", move);
              board.removeEventListener("pointerup", up);
              board.style.cursor = "";
              canvasSave();
            };
            board.addEventListener("pointermove", move);
            board.addEventListener("pointerup", up);
          }
        });
      }
    }

    function initAiDrag() {
      if (matchMedia("(max-width: 720px)").matches) return;
      document.querySelectorAll("[data-ai-handle]").forEach(handle => {
        handle.addEventListener("pointerdown", ev => {
          if (ev.target.closest("button")) return;
          const panel = handle.closest(".ai-panel");
          const start = { x: ev.clientX, y: ev.clientY, bx: state.ia.x || 0, by: state.ia.y || 0 };
          panel.classList.add("dragging");
          try { handle.setPointerCapture(ev.pointerId); } catch (e) {}
          const move = e => {
            state.ia.x = Math.max(-260, Math.min(260, start.bx + e.clientX - start.x));
            state.ia.y = Math.max(-260, Math.min(260, start.by + e.clientY - start.y));
            panel.style.setProperty("--ia-x", `${state.ia.x}px`);
            panel.style.setProperty("--ia-y", `${state.ia.y}px`);
          };
          const up = () => {
            panel.classList.remove("dragging");
            handle.removeEventListener("pointermove", move);
            handle.removeEventListener("pointerup", up);
            localStorage.setItem("fcis.iaPanel", JSON.stringify(state.ia));
          };
          handle.addEventListener("pointermove", move);
          handle.addEventListener("pointerup", up);
        });
      });
    }

    function bindDynamicTables() {
      document.querySelectorAll("[data-table-search]").forEach(input => input.addEventListener("input", () => {
        const id = input.dataset.tableSearch;
        tableState(id).q = input.value;
        tableState(id).page = 1;
        saveTableState();
        app();
      }));
      document.querySelectorAll("[data-table-filters]").forEach(group => group.querySelectorAll("select").forEach((select, idx) => {
        select.addEventListener("change", () => {
          const id = select.dataset.tableFilter;
          const s = tableState(id);
          s.filters = [...group.querySelectorAll("select")].map(x => x.value);
          s.page = 1;
          saveTableState();
          app();
        });
      }));
      document.querySelectorAll("[data-sort-table]").forEach(th => th.addEventListener("click", () => {
        const s = tableState(th.dataset.sortTable);
        const col = Number(th.dataset.sortCol);
        s.dir = s.sort === col ? -(s.dir || 1) : 1;
        s.sort = col;
        saveTableState();
        app();
      }));
      document.querySelectorAll("[data-table-page]").forEach(btn => btn.addEventListener("click", () => {
        tableState(btn.dataset.tablePage).page = Number(btn.dataset.page);
        saveTableState();
        app();
      }));
    }

    function saveTableState() {
      localStorage.setItem("fcis.tableState", JSON.stringify(state.table));
    }

    function reorderTheory(from, to) {
      const order = theoryDisplayOrder();
      const a = order.indexOf(from);
      const b = order.indexOf(to);
      if (a < 0 || b < 0 || a === b) return;
      order.splice(b, 0, order.splice(a, 1)[0]);
      state.theoryOrder = order;
      state.selectedTheory = from;
      localStorage.setItem("fcis.theoryOrder", JSON.stringify(order));
      simulateAction("Tarjeta reordenada en Teoría del Caso.");
      app();
    }

    function toast(message) {
      const wrap = document.getElementById("toasts");
      const node = document.createElement("div");
      node.className = "toast";
      node.textContent = message || "Función disponible en el MVP.";
      wrap.appendChild(node);
      setTimeout(() => node.remove(), 2600);
    }

    function simulateAction(message) {
      state.actionCount += 1;
      localStorage.setItem("fcis.actionCount", String(state.actionCount));
      state.lastUpdated = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
      const counter = document.querySelector(".action-counter");
      if (counter) counter.textContent = state.actionCount;
      toast(message || "Función disponible en modo demo.");
    }

    function applySearchFilter(query) {
      const q = (query || "").trim().toLowerCase();
      const rows = document.querySelectorAll("tbody tr, .list .list-row");
      rows.forEach(row => {
        const show = !q || row.textContent.toLowerCase().includes(q);
        row.style.display = show ? "" : "none";
      });
    }

    function simulateAi(panel) {
      if (!panel) return;
      const chat = panel.querySelector(".chat");
      const input = panel.querySelector(".ask input");
      const prompt = input && input.value.trim() ? input.value.trim() : "Consulta rápida sobre el caso";
      if (input) input.value = "";
      const typing = document.createElement("div");
      typing.className = "bubble response typing";
      typing.innerHTML = "<i></i><i></i><i></i>";
      chat.appendChild(typing);
      simulateAction("IA-Legal está preparando una respuesta simulada.");
      setTimeout(() => {
        typing.className = "bubble response";
        typing.textContent = `Respuesta simulada: ${prompt}. Para ${DEMO_DATA.case.id}, conviene reforzar la evidencia principal, la norma aplicable y la trazabilidad de actuaciones.`;
      }, 650);
    }

    function exportSummary() {
      const selected = DEMO_DATA.theoryCards[state.selectedTheory] || DEMO_DATA.theoryCards[0];
      const text = `FCIS - Resumen simulado\nCaso: ${DEMO_DATA.case.id}\nDelito: ${DEMO_DATA.case.crime}\nMódulo seleccionado: ${selected[0]}\nDetalle: ${selected[1]}\n${LEGAL}\n`;
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "fcis-resumen-teoria.txt";
      a.click();
      URL.revokeObjectURL(url);
      simulateAction("Exportación simulada generada.");
    }

    function copyCaseId() {
      const done = () => simulateAction(`ID copiado: ${DEMO_DATA.case.id}`);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(DEMO_DATA.case.id).then(done).catch(done);
      } else {
        done();
      }
    }

    function escapeHtml(value) {
      return String(value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (state.screen === "teoria") recalcTheoryConnectors();
      }, 140);
    });
    document.addEventListener("fullscreenchange", () => {
      if (state.screen === "canvas") setTimeout(canvasFit, 120);
    });

    app();
