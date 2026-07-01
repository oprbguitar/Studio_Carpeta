# Biblioteca Fiscal Inteligente

Aplicación web para organizar fuentes, estudiar un expediente fiscal y realizar análisis jurídico/documental asistido por IA mediante modelos gratuitos configurados en Vercel.

## Página publicada

[Ver Studio Carpeta en Vercel](https://studio-carpeta.vercel.app/)

## Funciones

- Navegación sin recarga: Inicio, Biblioteca IA, Análisis del caso, Notas e Historial.
- Análisis temporal de documentos PDF, DOCX, TXT y CSV.
- Consultas IA-Legal reales mediante `/api/ai` en Vercel.
- Modelo gratuito seleccionado silenciosamente desde el backend.
- Mapa del caso con nodos arrastrables y posiciones guardadas en `localStorage`.
- Notas editables, búsqueda global, modal del caso e historial automático.
- Escritorio compacto sin scroll de página y diseño móvil con navegación adaptada.
- HTML, CSS y JavaScript puro con funciones serverless de Vercel.

## IA en Vercel

La clave del proveedor debe permanecer solo en variables de entorno del servidor. No se expone en el frontend.



Reglas de seguridad:

- `/api/ai.js` lee la clave solo desde `process.env.AI_API_KEY`.
- Solo se aceptan `openrouter/free` o modelos terminados en `:free`.
- Los modelos pagados se rechazan antes de llamar al proveedor.
- Las respuestas siguen una estructura fija de análisis peruano legal, fiscal y documental, e indican cuando falta información.
- `/api/models.js` se conserva como endpoint interno/de depuración, pero la interfaz no expone selector de modelos.

## Privacidad documental

- Los archivos se procesan temporalmente en el navegador.
- El texto extraído se envía a `/api/ai` junto con la pregunta, datos del caso y notas disponibles.
- No se guarda contenido documental ni metadatos de archivos en `localStorage`.
- Tras recibir la respuesta, el archivo y el texto extraído se limpian de la interfaz y memoria de la app.
- Límite de demo: 4 MB por archivo y 20,000 caracteres enviados al análisis.

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
