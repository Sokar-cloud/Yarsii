import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = process.env.PORT || 3000;
const model = process.env.OPENAI_MODEL || "gpt-5.5";
const publicDir = join(process.cwd(), "public");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function cleanMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message) => ["user", "assistant"].includes(message.role) && typeof message.content === "string")
    .slice(-12)
    .map((message) => ({ role: message.role, content: message.content.slice(0, 2000) }));
}

async function askOpenAI(messages) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      instructions:
        "Eres YarsiiBot, un asistente amable que responde en español claro, breve y útil. Si no sabes algo, dilo y pide más contexto.",
      input: messages,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "OpenAI no respondió correctamente.");
  return data.output_text || "No pude generar una respuesta. Inténtalo de nuevo.";
}

async function handleChat(request, response) {
  try {
    const body = await readJsonBody(request);
    const messages = cleanMessages(body.messages);
    const lastUserMessage = messages.findLast((message) => message.role === "user");

    if (!lastUserMessage) {
      return sendJson(response, 400, { error: "Escribe un mensaje para conversar con el bot." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return sendJson(response, 200, {
        reply:
          "Modo demo: configura OPENAI_API_KEY en el servidor para activar respuestas reales con IA. Mientras tanto, puedo ayudarte a probar la interfaz.",
      });
    }

    const reply = await askOpenAI(messages);
    return sendJson(response, 200, { reply });
  } catch (error) {
    console.error("Chat request failed", error);
    return sendJson(response, 500, { error: "No pude conectarme con la IA. Revisa la API key o intenta más tarde." });
  }
}

async function serveStatic(pathname, response) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const safePath = normalize(decodeURIComponent(requestedPath)).replace(/^\.\.(\/|\\|$)/, "");
  const filePath = join(publicDir, safePath);

  try {
    const file = await readFile(filePath);
    response.writeHead(200, { "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream" });
    response.end(file);
  } catch {
    sendJson(response, 404, { error: "Archivo no encontrado." });
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/api/health") {
    return sendJson(response, 200, { ok: true, aiEnabled: Boolean(process.env.OPENAI_API_KEY), model });
  }

  if (request.method === "POST" && url.pathname === "/api/chat") {
    return handleChat(request, response);
  }

  if (request.method === "GET") {
    return serveStatic(url.pathname, response);
  }

  return sendJson(response, 405, { error: "Método no permitido." });
});

server.listen(port, () => {
  console.log(`YarsiiBot listo en http://localhost:${port}`);
});
