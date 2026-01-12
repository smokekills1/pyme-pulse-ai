
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Función Serverless para Vercel/Netlify.
 * Actúa como proxy seguro para no exponer la API_KEY en el cliente.
 */
export default async function handler(req: any, res: any) {
  // Solo permitimos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { task, payload } = req.body;
  
  // Inicialización del cliente con la clave del entorno (segura en el servidor)
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    switch (task) {
      case 'marketing':
        // Tarea de texto básica: usamos flash-preview
        const mResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Genera 3 variantes de copy publicitario profesional para ${payload.platform}. 
            Producto/Servicio: ${payload.product}. 
            Público objetivo: ${payload.target}. 
            Tono: ${payload.tone}. 
            Longitud: ${payload.length}.
            Instrucción adicional: No uses emojis, mantén un estilo corporativo español de alta calidad.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { 
                    type: Type.STRING,
                    description: "El texto del anuncio o publicación."
                  },
                  imagePrompt: { 
                    type: Type.STRING,
                    description: "Descripción visual para generar una imagen que acompañe al texto."
                  }
                },
                required: ["text", "imagePrompt"]
              }
            }
          }
        });
        return res.status(200).json(JSON.parse(mResponse.text || '[]'));

      case 'review':
        // Respuesta rápida: usamos flash-preview
        const rResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Actúa como el Responsable de Comunicación de "${payload.business}". 
            Responde de forma profesional, empática e institucional a la siguiente reseña de un cliente: 
            "${payload.review}".
            Reglas: Sin emojis, sin lenguaje coloquial, máximo 150 palabras.`,
        });
        return res.status(200).json({ text: rResponse.text });

      case 'analysis':
        // Tarea compleja de razonamiento: usamos pro-preview
        const aResponse = await ai.models.generateContent({
          model: "gemini-3-pro-preview",
          contents: `Realiza un análisis de consultoría estratégica profundo para la siguiente idea o situación de negocio: 
            "${payload.idea}".
            Estructura la respuesta con:
            1. Análisis DAFO (Debilidades, Amenazas, Fortalezas, Oportunidades).
            2. Evaluación de viabilidad en el mercado actual.
            3. Tres recomendaciones críticas inmediatas.
            Usa un tono de consultor senior de McKinsey.`,
          config: {
            thinkingConfig: { thinkingBudget: 2000 }
          }
        });
        return res.status(200).json({ text: aResponse.text });

      default:
        return res.status(400).json({ message: 'Tarea no definida' });
    }
  } catch (error: any) {
    console.error('Error en el Proxy de IA:', error);
    return res.status(500).json({ 
      message: 'Error al procesar la solicitud con Gemini',
      details: error.message 
    });
  }
}
