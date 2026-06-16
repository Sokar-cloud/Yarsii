const form = document.querySelector("#chat-form");
const input = document.querySelector("#message-input");
const messagesContainer = document.querySelector("#messages");
const statusElement = document.querySelector("#status");
const messages = [];

function addMessage(role, content, extraClass = "") {
  messages.push({ role, content });
  const bubble = document.createElement("div");
  bubble.className = `message ${role} ${extraClass}`.trim();
  bubble.textContent = content;
  messagesContainer.append(bubble);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function checkHealth() {
  try {
    const response = await fetch("/api/health");
    const health = await response.json();
    statusElement.textContent = health.aiEnabled
      ? `IA activa · Modelo ${health.model}`
      : "Modo demo · Falta configurar OPENAI_API_KEY";
  } catch {
    statusElement.textContent = "Servidor no disponible";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";
  form.querySelector("button").disabled = true;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Error desconocido");
    addMessage("assistant", data.reply);
  } catch (error) {
    addMessage("assistant", error.message, "error");
  } finally {
    form.querySelector("button").disabled = false;
    input.focus();
  }
});

addMessage("assistant", "¡Hola! Soy YarsiiBot. ¿En qué puedo ayudarte hoy?");
checkHealth();
