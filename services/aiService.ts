
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingOptions, MarketingVariant, GroundedAnalysis } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") {
    throw new Error("API_KEY no detectada. Verifica las variables de entorno en Vercel.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateMarketingCopy = async (options: MarketingOptions): Promise<MarketingVariant[]> => {
  try {
    const ai = getAiClient();
    const prompt = `Actúa como Experto en Marketing Digital. 
    Genera 3 variantes de anuncios persuasivos para ${options.platform}.
    PRODUCTO: ${options.product}
    TARGET: ${options.target}
    TONO: ${options.tone}
    Devuelve estrictamente un array JSON con objetos que tengan 'text' e 'imagePrompt'.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              imagePrompt: { type: Type.STRING }
            },
            required: ["text", "imagePrompt"]
          }
        }
      }
    });
    
    return JSON.parse(response.text || "[]");
  } catch (error: any) {
    console.error("Error Marketing:", error);
    throw new Error(error.message || "Fallo en motor de marketing.");
  }
};

export const respondToReview = async (review: string, business: string, tone: string = 'Profesional'): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `Responde a esta reseña para la empresa "${business}": "${review}". Tono ${tone}. Máximo 60 palabras.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    return response.text || "Gracias por su comentario.";
  } catch (error: any) {
    throw new Error(`Error en Reseñas: ${error.message}`);
  }
};

export const analyzeBusinessIdea = async (idea: string): Promise<GroundedAnalysis> => {
  try {
    const ai = getAiClient();
    const prompt = `Actúa como un Consultor Senior de Estrategia de Negocio e Investigador de Mercado. 
    Analiza la siguiente propuesta utilizando DATOS REALES Y ACTUALES DE INTERNET: "${idea}". 
    Proporciona de forma estructurada:
    1. DIAGNÓSTICO DE VIABILIDAD (Menciona tendencias actuales si es posible)
    2. ANÁLISIS DAFO (Debilidades, Amenazas, Fortalezas, Oportunidades)
    3. COMPETIDORES O REFERENCIAS (Menciona empresas o soluciones reales)
    4. PLAN DE ACCIÓN (3 pasos críticos).
    Usa un tono profesional, ejecutivo y directo.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "El análisis no pudo completarse.";
    
    // Extract grounding sources
    const sources: any[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    return { text, sources };
  } catch (error: any) {
    console.error("Error Estrategia:", error);
    throw new Error(`Error Estratégico: ${error.message}`);
  }
};
