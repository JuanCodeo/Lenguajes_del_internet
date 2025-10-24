import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyBE_-M7mytZn6kxM8FmGIzoPU2OW1DF6Aw";
const MODEL_NAME = "gemini-2.5-flash";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// 🔗 Elementos del DOM
const sendButton = document.getElementById("send-button");
const input = document.getElementById("prompt-input");
const chatHistory = document.getElementById("chat-history");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("error-message");

// 🚀 Enviar mensaje
sendButton.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const prompt = input.value.trim();
  if (!prompt) return;

  // Limpiar error anterior
  errorMessage.style.display = "none";

  // Mostrar mensaje del usuario
  appendMessage(prompt, "user");
  input.value = "";

  // Mostrar loader
  loader.style.display = "block";
  sendButton.disabled = true;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    appendMessage(response, "ai");
  } catch (error) {
    console.error(error);
    showError("Error al generar la respuesta. Intenta nuevamente.");
  } finally {
    loader.style.display = "none";
    sendButton.disabled = false;
    scrollToBottom();
  }
}

// 🧩 Función para añadir mensajes al chat
function appendMessage(text, sender = "ai") {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  msg.innerHTML = formatText(text);
  chatHistory.appendChild(msg);
  scrollToBottom();
}

// ✨ Formato de texto (detecta saltos de línea y asteriscos tipo markdown)
function formatText(text) {
  const formatted = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **negrita**
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // *cursiva*
    .replace(/\n/g, "<br>");
  return formatted;
}

// ⬇️ Scroll automático
function scrollToBottom() {
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// ⚠️ Mostrar errores
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  setTimeout(() => (errorMessage.style.display = "none"), 5000);
}

// 🔧 Inicialización
window.addEventListener("DOMContentLoaded", () => {
  loader.style.display = "none";
  errorMessage.style.display = "none";
  scrollToBottom();
});
