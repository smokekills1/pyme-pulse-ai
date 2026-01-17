
import { MarketingOptions, MarketingVariant } from "../types";

/**
 * Función centralizada para llamar al proxy de IA en el servidor.
 * Esto protege la API_KEY y cumple con las políticas de seguridad.
 */
const callAiProxy = async (payload: any) => {
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}: Problema de conexión.`);
    }

    return await response.json();
  } catch (e: any) {
    console.error("Error en comunicación con el Proxy de IA:", e);
    throw e;
  }
};

export const generateMarketingCopy = async (options: MarketingOptions): Promise<MarketingVariant[]> => {
  const prompt = `Actúa como un Experto en Marketing Senior para PYMES. Genera 3 variantes de anuncios para ${options.platform}. 
      DATOS DEL PRODUCTO: ${options.product}. 
      PÚBLICO OBJETIVO: ${options.target}. 
      TONO REQUERIDO: ${options.tone}. 
      LONGITUD: ${options.length}. 
      
      INSTRUCCIONES CRÍTICAS:
      1. Usa castellano de España profesional.
      2. No utilices emojis.
      3. IMPORTANTE: Tanto el campo "text" como el campo "imagePrompt" DEBEN ESTAR COMPLETAMENTE EN ESPAÑOL.
      4. El "imagePrompt" debe ser una descripción visual detallada para un fotógrafo o diseñador gráfico.
      
      Formato de salida: JSON array de objetos con las propiedades {text, imagePrompt}.`;

  const payload = {
    model: 'gemini-3-flash-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      responseMimeType: "application/json"
    }
  };

  const result = await callAiProxy(payload);
  
  try {
    // Intentamos parsear la respuesta. El proxy devuelve el campo .text
    const text = result.text || '[]';
    // Limpieza básica por si el modelo incluye bloques de código markdown
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Error parseando respuesta de marketing:", result.text);
    return [];
  }
};

export const respondToReview = async (review: string, business: string, tone: string = 'Profesional'): Promise<string> => {
  const prompt = `Como Director de Reputación de "${business}", responde a esta reseña: "${review}". Tono: ${tone}. Castellano profesional de España, empático y resolutivo. Max 90 palabras. No uses emojis.`;
  
  const payload = {
    model: 'gemini-3-flash-preview',
    contents: { parts: [{ text: prompt }] }
  };

  const result = await callAiProxy(payload);
  return result.text || "";
};

export const analyzeBusinessIdea = async (idea: string): Promise<string> => {
  const prompt = `Consultor Estratégico Senior. Realiza un análisis exhaustivo en castellano de España de: "${idea}". 
      ESTRUCTURA OBLIGATORIA:
      1. DIAGNÓSTICO DE SITUACIÓN
      2. ANÁLISIS DAFO (Puntos clave)
      3. ESTRATEGIAS RECOMENDADAS
      4. HOJA DE RUTA (Siguientes pasos)
      Usa un tono ejecutivo, directo y profesional.`;

  const payload = {
    model: 'gemini-3-pro-preview',
    contents: { parts: [{ text: prompt }] },
    config: { 
      thinkingConfig: { thinkingBudget: 4000 }
    }
  };

  const result = await callAiProxy(payload);
  return result.text || "";
};
