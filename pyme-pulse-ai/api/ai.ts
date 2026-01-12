
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Manejo de CORS manual por si fuera necesario
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Use POST.' });
  }

  const { model, contents, config } = req.body;

  if (!process.env.API_KEY) {
    return res.status(500).json({ 
      error: "API_KEY no encontrada en Vercel. Verifique 'Settings > Environment Variables'." 
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const formattedContents = contents?.parts 
      ? contents 
      : { parts: [{ text: typeof contents === 'string' ? contents : JSON.stringify(contents) }] };

    const response = await ai.models.generateContent({
      model: model || 'gemini-3-flash-preview',
      contents: formattedContents,
      config: config
    });

    return res.status(200).json({
      text: response.text,
      candidates: response.candidates
    });
  } catch (error: any) {
    console.error("Error Gemini API:", error);
    return res.status(error.status || 500).json({ 
      error: error.message || "Error interno del servidor de IA." 
    });
  }
}
