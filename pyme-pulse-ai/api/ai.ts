
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Configuración de Headers para estabilidad en Vercel
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Use POST.' });
  }

  if (!process.env.API_KEY) {
    console.error("ERROR: API_KEY no configurada.");
    return res.status(500).json({ 
      error: "Error de Servidor: No se encontró la API_KEY en las variables de entorno de Vercel." 
    });
  }

  const { model, contents, config } = req.body;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Aseguramos que contents sea un objeto válido para el SDK
    const payload = {
      model: model || 'gemini-3-flash-preview',
      contents: contents?.parts ? contents : { parts: [{ text: String(contents) }] },
      config: config || {}
    };

    const result = await ai.models.generateContent(payload);

    return res.status(200).json({
      text: result.text,
      candidates: result.candidates
    });
  } catch (error: any) {
    console.error("Error en Gemini Proxy:", error);
    
    // Capturar errores específicos de cuota o clave inválida
    const status = error.status || 500;
    const message = error.message || "Error desconocido al procesar la IA.";
    
    return res.status(status).json({ error: `IA Service Error: ${message}` });
  }
}
