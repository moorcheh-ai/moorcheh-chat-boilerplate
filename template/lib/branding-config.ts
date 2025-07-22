/**
 * 🎨 Branding Configuration
 * 
 * This file manages all branding-related configuration using environment variables.
 * Users can customize their app by setting these variables in .env.local
 */

export interface BrandingConfig {
  /** App name used throughout the application */
  appName: string;
  /** App title used in browser tab and metadata */
  appTitle: string;
  /** App subtitle/description used in chat interface */
  appSubtitle: string;
  /** App description used in metadata */
  appDescription: string;
  /** Logo path in public directory */
  appLogo: string;
  /** Company name */
  companyName: string;
  /** Contact email */
  contactEmail: string;
  /** AI assistant name used in prompts */
  aiAssistantName: string;
  /** Storage prefix for localStorage keys */
  storagePrefix: string;
  /** Export file prefix for downloaded files */
  exportPrefix: string;
}

/**
 * Get branding configuration from environment variables
 * Falls back to default "Moorcheh" branding if not set
 */
export function getBrandingConfig(): BrandingConfig {
  return {
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'Moorcheh AI Assistant',
    appTitle: process.env.NEXT_PUBLIC_APP_TITLE || 'Moorcheh Chat',
    appSubtitle: process.env.NEXT_PUBLIC_APP_SUBTITLE || 'Your intelligent chat companion',
    appDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'AI-powered chat application with customizable themes and fonts',
    appLogo: process.env.NEXT_PUBLIC_APP_LOGO || '/moorcheh-logo.png',
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Moorcheh',
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@moorcheh.ai',
    aiAssistantName: process.env.NEXT_PUBLIC_AI_ASSISTANT_NAME || 'Moorcheh',
    storagePrefix: process.env.NEXT_PUBLIC_STORAGE_PREFIX || 'moorcheh-chat',
    exportPrefix: process.env.NEXT_PUBLIC_EXPORT_PREFIX || 'Moorcheh-chat',
  };
}

/**
 * Helper functions to get specific branding values
 */
export const branding = {
  getAppName: () => getBrandingConfig().appName,
  getAppTitle: () => getBrandingConfig().appTitle,
  getAppSubtitle: () => getBrandingConfig().appSubtitle,
  getAppDescription: () => getBrandingConfig().appDescription,
  getAppLogo: () => getBrandingConfig().appLogo,
  getCompanyName: () => getBrandingConfig().companyName,
  getContactEmail: () => getBrandingConfig().contactEmail,
  getAiAssistantName: () => getBrandingConfig().aiAssistantName,
  getStoragePrefix: () => getBrandingConfig().storagePrefix,
  getExportPrefix: () => getBrandingConfig().exportPrefix,
  
  // Storage key helpers
  getThemeStorageKey: () => `${getBrandingConfig().storagePrefix}-theme`,
  getChatDataStorageKey: () => `${getBrandingConfig().storagePrefix}-data`,
  
  // Export filename helper
  getExportFilename: (date?: Date) => {
    const dateStr = (date || new Date()).toISOString().split('T')[0];
    return `${getBrandingConfig().exportPrefix}-${dateStr}.txt`;
  },
  
  // AI prompt helper
  getAiPrompt: (customPrompt?: string) => {
    if (customPrompt) return customPrompt;
    return `You are a helpful AI assistant named ${getBrandingConfig().aiAssistantName}.`;
  }
}; 