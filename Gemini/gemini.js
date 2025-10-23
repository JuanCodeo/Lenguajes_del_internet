import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyBE_-M7mytZn6kxM8FmGIzoPU2OW1DF6Aw";
const MODEL_NAME = "gemini-2.5-flash";

const generateButton = document.getElementById("generate-button");
const promptInput = document.getElementById("prompt-input");
const storyOutput = document.getElementById("story-output");

generateButton.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    alert("Por favor, ingresa un tema para la historia.");
    return;
  }

  try {
    // 1. Inicializar cliente
    const genAI = new GoogleGenerativeAI(API_KEY);

    // 2. Obtener modelo
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // 3. Crear prompt completo (todo en un solo string)
    const fullPrompt = `Quiero que actúes como un creador experto de prompts para inteligencia artificial.
Tu tarea es generar un prompt que sirva para crear una historia original y creativa.
El prompt debe incluir: "${prompt}". 
    No hagas preguntas, usa toda tu creatividad.`;

    // 4. Llamar a generar contenido
    const result = await model.generateContent(fullPrompt);

    // 5. Extraer y mostrar respuesta
    const response = await result.response;
    const text = response.text();

    storyOutput.innerText = text;
    console.log("Historia generada:", text);

  } catch (error) {
    console.error("Error al generar la historia:", error);
    storyOutput.innerText = "⚠️ Error al generar la historia. Revisa la consola.";
  }
});
