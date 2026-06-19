# Biblioteca Fiscal Inteligente

Aplicación web estática para organizar fuentes, estudiar un expediente fiscal y simular análisis jurídico asistido por IA.

## Página publicada

https://oprbguitar.github.io/Studio_Carpeta/

## Funciones

- Navegación sin recarga: Inicio, Biblioteca IA, Análisis del caso, Notas e Historial.
- Carga local simulada de PDF, DOCX y TXT con metadatos persistentes.
- Consultas IA-Legal y acciones analíticas simuladas.
- Mapa del caso con nodos arrastrables y posiciones guardadas en `localStorage`.
- Notas editables, búsqueda global, modal del caso e historial automático.
- Escritorio compacto sin scroll de página y diseño móvil con navegación adaptada.
- HTML, CSS y JavaScript puro; sin backend, API, base de datos ni dependencias externas.

## Caso de demostración

- Expediente: `MP-2024-01567`
- Delito: Robo Agravado
- Usuario: Doctor

## Uso local

Puede abrirse directamente o servirse con cualquier servidor estático:

```bash
python -m http.server 8000
```

## Estructura principal

```text
index.html
css/styles.css
js/image-assets.js
js/app.js
assets/favicon.svg
```

## Autor

Elaborado por Pierre R.

Correo: peru.labs.pe@gmail.com

© 2026 Pierre R. Todos los derechos reservados. Contacto: peru.labs.pe@gmail.com
