# YarsiiBot

Chatbot web en español con inteligencia artificial usando Node.js y la API de OpenAI.

## Requisitos

- Node.js 20 o superior.
- Una API key de OpenAI.

## Instalación

```bash
cp .env.example .env
```

Edita `.env` y coloca tu clave real en `OPENAI_API_KEY`.

## Ejecutar

```bash
OPENAI_API_KEY=tu_api_key_aqui npm start
```

Abre <http://localhost:3000> en tu navegador.

## Modo demo

Si no configuras `OPENAI_API_KEY`, la interfaz funciona en modo demo y muestra un mensaje indicando cómo activar la IA real.

## Archivos principales

- `server.js`: servidor Node.js y endpoint `/api/chat` que llama a OpenAI Responses API.
- `public/index.html`: estructura de la interfaz del chat.
- `public/styles.css`: diseño visual responsive.
- `public/app.js`: lógica del chat en el navegador.
