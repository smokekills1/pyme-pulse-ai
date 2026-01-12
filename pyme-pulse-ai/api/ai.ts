
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Use POST.' });
  }

  const { model, contents, config } = req.body;

  if (!process.env.API_KEY) {
    console.error("CRÍTICO: API_KEY no configurada en Vercel.");
    return res.status(500).json({ 
      error: "Error de configuración: No se detecta la clave API_KEY en Vercel. Por favor, revise 'Settings > Environment Variables'." 
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Normalizamos contents para que siempre sea el formato que espera el SDK { parts: [...] }
    const formattedContents = typeof contents === 'string' 
      ? { parts: [{ text: contents }] }
      : contents;

    const response = await ai.models.generateContent({
      model: model || 'gemini-3-flash-preview',
      contents: formattedContents,
      config: config
    });

    if (!response || !response.text) {
      throw new Error("La IA no devolvió contenido válido.");
    }

    return res.status(200).json({
      text: response.text,
      candidates: response.candidates
    });
  } catch (error: any) {
    console.error("Error en la ejecución de Gemini:", error);
    
    // Si es un error de cuota o clave inválida de Google
    if (error.message?.includes('API key not valid')) {
      return res.status(401).json({ error: "La API_KEY proporcionada no es válida. Genere una nueva en Google AI Studio." });
    }

    return res.status(500).json({ 
      error: `Error de la IA: ${error.message || "Error desconocido en el servidor."}` 
    });
  }
}
