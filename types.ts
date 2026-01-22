
// AppView enum defines the navigation views available in the application.
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  MARKETING = 'MARKETING',
  REVIEWS = 'REVIEWS',
  STRATEGY = 'STRATEGY',
  ANALYSIS = 'STRATEGY', // Alias for compatibility with Sidebar.tsx
  REPORT = 'REPORT'
}

// Export AppView as View to maintain compatibility with App.tsx.
export { AppView as View };

// MarketingOptions defines the configuration for generating marketing campaigns.
export interface MarketingOptions {
  product: string;
  target: string;
  platform: string;
  tone: string;
  length: string;
}

// MarketingVariant represents a single generated marketing copy and its visual concept.
export interface MarketingVariant {
  text: string;
  imagePrompt: string;
}

// Interface for grounded analysis results - CRITICAL FOR TS COMPILATION
export interface GroundedAnalysis {
  text: string;
  sources: Array<{
    title: string;
    uri: string;
  }>;
}
