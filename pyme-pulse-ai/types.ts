
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  MARKETING = 'MARKETING',
  REVIEWS = 'REVIEWS',
  ANALYSIS = 'ANALYSIS',
  REPORT = 'REPORT'
}

export interface ToolResult {
  content: string;
  timestamp: Date;
}

export interface MarketingVariant {
  text: string;
  imagePrompt: string;
}

export interface MarketingOptions {
  product: string;
  target: string;
  platform: string;
  tone: string;
  length: 'short' | 'medium' | 'long';
}
