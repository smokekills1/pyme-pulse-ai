
import { MarketingOptions, MarketingVariant } from "../types.ts";

/**
 * Cliente de comunicación con el Backend Intermedio (Proxy).
 * En lugar de llamar directamente a Google, llamamos a nuestra propia API
 * para mantener la API_KEY segura en el servidor.
 */

async function callAIProxy(task: string, payload: any) {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task, payload })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la comunicación con el servidor');
  }
  
  return response.json();
}

export const generateMarketingCopy = async (options: MarketingOptions): Promise<MarketingVariant[]> => {
  const data = await callAIProxy('marketing', options);
  return data;
};

export const respondToReview = async (review: string, business: string) => {
  const data = await callAIProxy('review', { review, business });
  return data.text;
};

export const analyzeBusinessIdea = async (idea: string) => {
  const data = await callAIProxy('analysis', { idea });
  return data.text;
};
