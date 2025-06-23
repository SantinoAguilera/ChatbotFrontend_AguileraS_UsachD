const { Ollama } = require('@llamaindex/ollama');

const MODEL_NAME = 'qwen3:1.7b'; // o el modelo que uses

const ollama = new Ollama({ model: MODEL_NAME });

exports.elAgente = {
  run: async (mensaje) => {
    const messages = [
      {
        role: "system",
        content: "Eres un asistente conversacional que ayuda al usuario.",
      },
      {
        role: "user",
        content: mensaje,
      },
    ];

    try {
      const respuestaIA = await ollama.chat({ messages });

      // Extraer contenido de la respuesta, puede variar según la API
      if (respuestaIA.message?.content) {
        // Eliminar el texto dentro de <think>...</think>
        const contenidoLimpio = respuestaIA.message.content.replace(/<think>.*?<\/think>/gis, '').trim();
        return contenidoLimpio;
      }
            if (respuestaIA.content) return respuestaIA.content;
      if (typeof respuestaIA === 'string') return respuestaIA;

      return "Lo siento, no pude procesar la respuesta.";
    } catch (error) {
      console.error('Error en Ollama:', error);
      throw error;
    }
  }
};