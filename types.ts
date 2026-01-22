
/**
 * PYME-Pulse AI - Definiciones de Tipos Globales
 * Versión: 1.0.1 (Limpieza de caché Vercel)
 */

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  MARKETING = 'MARKETING',
  REVIEWS = 'REVIEWS',
  STRATEGY = 'STRATEGY',
  ANALYSIS = 'STRATEGY', // Alias para mantener compatibilidad
  REPORT = 'REPORT'
}

export type View = AppView;

export interface MarketingOptions {
  product: string;
  target: string;
  platform: string;
  tone: string;
  length: string;
}

export interface MarketingVariant {
  text: string;
  imagePrompt: string;
}

export interface GroundedAnalysis {
  text: string;
  sources: Array<{
    title: string;
    uri: string;
  }>;
}
