# Studio Carpeta

Aplicación web para análisis jurídico-documental peruano con flujo de documento primero, funciones serverless de Vercel e IA configurada desde variables de entorno del servidor.

## Página publicada

[Ver Studio Carpeta en Vercel](https://studio-carpeta.vercel.app/)

## Funciones

- Carga de documentos PDF con texto seleccionable, DOCX, TXT y CSV.
- Extracción temporal del texto en el navegador.
- Clasificación automática: caso legal, documento administrativo, referencia legal, documento general o contenido insuficiente.
- Un solo análisis inicial orquestado mediante `/api/ai` en Vercel.
- Canvas simple de teoría del caso solo cuando el documento parece un caso o el usuario lo solicita.
- Acciones enfocadas reales: extraer hechos, detectar riesgos, crear teoría del caso y ver fuentes oficiales para verificar.
- Guardado local opcional del análisis, clasificación, canvas, nombre de archivo, fecha y notas.
- Diseño responsive de una columna en móvil, sin solapamientos ni scroll horizontal.
- HTML, CSS y JavaScript puro con funciones serverless de Vercel.

## IA en Vercel

La clave del proveedor debe permanecer solo en variables de entorno del servidor. No se expone en el frontend.



Reglas de seguridad:

- `/api/ai.js` lee la clave solo desde `process.env.AI_API_KEY`.
- Solo se aceptan `openrouter/free` o modelos terminados en `:free`.
- Los modelos pagados se rechazan antes de llamar al proveedor.
- Las respuestas separan lo que el documento dice, lo que puede inferirse y lo que debe verificarse.
- `/api/models.js` se conserva como endpoint interno/de depuración, pero la interfaz no expone selector de modelos.
- Los modos de análisis se construyen del lado servidor y rechazan valores no soportados.

## Privacidad documental

- Los archivos se procesan temporalmente en el navegador.
- El texto extraído se envía a `/api/ai` junto con el modo de análisis, pregunta opcional y análisis/canvas actual si existe.
- No se guarda el archivo original ni el texto extraído en `localStorage`.
- Solo se guarda localmente clasificación, respuesta IA, canvas si existe, fecha, nombre original del archivo y notas si el usuario presiona Guardar análisis.
- Límite de demo: 10 MB por archivo y 25,000 caracteres enviados al análisis.

## Variables de entorno en Vercel

```env
AI_PROVIDER=openrouter
AI_API_KEY=
AI_BASE_URL=https://openrouter.ai/api/v1
AI_MODEL_DEFAULT=openrouter/free
AI_ALLOWED_MODELS=openrouter/free,nvidia/nemotron-3-ultra-550b-a55b:free,qwen/qwen3-coder:free,qwen/qwen3.6-plus-preview:free
AI_MAX_TOKENS=1200
```

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
js/legalSourcesCatalog.js
assets/favicon.svg
.env.example
```

## Autor

Elaborado por Pierre R.

Correo: peru.labs.pe@gmail.com

© 2026 Pierre R. Todos los derechos reservados. Contacto: peru.labs.pe@gmail.com
