# Studio Carpeta

Studio Carpeta es una aplicación web de análisis jurídico-documental para abogados, asistentes legales, estudiantes, fiscales, analistas administrativos y usuarios no técnicos.

Proyecto publicado: [https://studio-carpeta.vercel.app/](https://studio-carpeta.vercel.app/)

## Qué Hace

- Permite subir documentos legales, administrativos o de referencia.
- Extrae texto en el navegador sin enviar el archivo completo al backend.
- Clasifica el documento antes de analizarlo.
- Genera un análisis claro en español.
- Detecta riesgos y extrae hechos mediante acciones enfocadas.
- Construye un canvas simple de teoría del caso solo cuando corresponde.
- Sugiere fuentes oficiales donde verificar información normativa.
- Permite copiar resultado, guardar análisis localmente, exportar JSON y exportar informe TXT.

La IA no reemplaza criterio legal. Organiza, resume y señala riesgos documentales. Toda norma o fuente sugerida debe verificarse oficialmente.

## Arquitectura

- Frontend estático en Vercel.
- Funciones serverless en `/api`.
- `/api/ai.js` realiza llamadas al proveedor de IA desde el servidor.
- `/api/models.js` queda como endpoint interno/de depuración.
- Persistencia demo en `localStorage`.
- Sin Supabase, sin base de datos externa y sin almacenamiento permanente de archivos.

## Variables de Entorno en Vercel

Configurar en el proyecto de Vercel:

```env
AI_API_KEY=
AI_BASE_URL=https://openrouter.ai/api/v1
AI_MODEL_DEFAULT=openrouter/free
AI_ALLOWED_MODELS=openrouter/free,nvidia/nemotron-3-ultra-550b-a55b:free,qwen/qwen3-coder:free,qwen/qwen3.6-plus-preview:free
AI_MAX_TOKENS=1200
```

Reglas actuales:

- La clave se lee solo desde `process.env.AI_API_KEY`.
- El frontend no muestra proveedor, modelo ni selector técnico.
- El backend usa el modelo por defecto silenciosamente.
- Solo se permiten modelos gratuitos: `openrouter/free` o modelos terminados en `:free`.

## Archivos Soportados

- PDF con texto seleccionable.
- DOCX.
- TXT.
- CSV.

Límites de demo:

- Tamaño máximo de archivo: 10 MB.
- Texto máximo enviado a IA: 25,000 caracteres.
- Si el texto supera el límite, se analiza la parte inicial y se informa al usuario.

## Limitaciones Actuales

- No incluye OCR. Los PDF escaneados o de solo imagen muestran un aviso claro.
- No verifica automáticamente normas, jurisprudencia o fuentes oficiales.
- Las fuentes oficiales se sugieren como lugares donde verificar.
- No hay almacenamiento cloud permanente.
- No se guarda el archivo original ni el texto extraído completo.
- El guardado local conserva solo análisis, clasificación, canvas si existe, nombre de archivo, fecha y notas.

## Desarrollo Local

Servir como sitio estático:

```bash
python -m http.server 8000
```

Abrir:

```text
http://127.0.0.1:8000/
```

## Checklist de Despliegue

- Confirmar que `index.html` carga:
  - `css/styles.css`
  - `js/legalSourcesCatalog.js`
  - `js/app.js`
- Confirmar variables de entorno en Vercel.
- Confirmar que `/api/ai` responde a `POST`.
- Confirmar que no hay claves en frontend.
- Confirmar que no aparece selector de modelo ni texto técnico del proveedor.
- Confirmar que PDF/DOCX se cargan solo al subir documentos.
- Confirmar que TXT/CSV no cargan librerías externas.

## Checklist Responsive

- Debe funcionar en desktop y móvil.
- Debe evitar scroll horizontal.
- El resultado del análisis debe ser legible.
- Los botones deben ser táctiles en móvil.
- Las tarjetas deben apilarse en una sola columna debajo de 768 px.
- El hero visual no debe dominar la pantalla móvil.

## Estructura Principal

```text
index.html
api/ai.js
api/models.js
css/styles.css
js/app.js
js/legalSourcesCatalog.js
assets/favicon.svg
.env.example
```

## Autor

Elaborado por Pierre R.

Correo: peru.labs.pe@gmail.com

© 2026 Pierre R. Todos los derechos reservados.
