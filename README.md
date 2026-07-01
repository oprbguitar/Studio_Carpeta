# Biblioteca Fiscal Inteligente

Aplicación web para organizar fuentes, estudiar un expediente fiscal y realizar análisis jurídico/documental asistido por IA mediante OpenRouter y modelos gratuitos.

## Página publicada

[Ver Studio Carpeta en Vercel](https://studio-carpeta.vercel.app/)

## Funciones

- Navegación sin recarga: Inicio, Biblioteca IA, Análisis del caso, Notas e Historial.
- Carga local simulada de PDF, DOCX y TXT con metadatos persistentes.
- Consultas IA-Legal reales mediante `/api/ai` en Vercel.
- Selector de modelos gratuitos de OpenRouter cargado desde `/api/models`.
- Mapa del caso con nodos arrastrables y posiciones guardadas en `localStorage`.
- Notas editables, búsqueda global, modal del caso e historial automático.
- Escritorio compacto sin scroll de página y diseño móvil con navegación adaptada.
- HTML, CSS y JavaScript puro con funciones serverless de Vercel.

## IA en Vercel

La clave de OpenRouter debe permanecer solo en variables de entorno del servidor. No se expone en el frontend.

Variables esperadas:

```env
AI_PROVIDER=openrouter
AI_API_KEY=
AI_BASE_URL=https://openrouter.ai/api/v1
AI_MODEL_DEFAULT=openrouter/free
AI_ALLOWED_MODELS=openrouter/free,nvidia/nemotron-3-ultra-550b-a55b:free,qwen/qwen3-coder:free,qwen/qwen3.6-plus-preview:free
AI_MAX_TOKENS=900
```

Reglas de seguridad:

- `/api/ai.js` lee la clave solo desde `process.env.AI_API_KEY`.
- Solo se aceptan `openrouter/free` o modelos terminados en `:free`.
- Los modelos pagados se rechazan antes de llamar al proveedor.
- Las respuestas siguen una estructura fija de análisis peruano legal, fiscal y documental, e indican cuando falta información.

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
api/ai.js
api/models.js
css/styles.css
js/image-assets.js
js/app.js
assets/favicon.svg
.env.example
```

## Autor

Elaborado por Pierre R.

Correo: peru.labs.pe@gmail.com

© 2026 Pierre R. Todos los derechos reservados. Contacto: peru.labs.pe@gmail.com
