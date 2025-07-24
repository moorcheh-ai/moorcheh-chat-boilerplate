/**
 * 🔧 API Configuration Manager
 * 
 * Users just need to create config/api-config.json with their API settings
 * This module handles all API configuration logic including:
 * - Loading configuration from JSON
 * - Building request bodies with proper parameter handling
 * - Threshold parameter only included when kiosk_mode is true
 * - Validation and error handling
 */

import apiConfigJson from '../config/api-config.json';

export interface ApiRequestBody {
  namespace: string;
  query: string;
  top_k?: number;
  type?: string;
  aiModel?: string;
  temperature?: number;
  kiosk_mode?: boolean;
  threshold?: number; // Only included when kiosk_mode is true
  chatHistory: Array<{
    role: string;
    content: string;
  }>;
  headerPrompt?: string;
  footerPrompt?: string;
}

/**
 * Get the API request body template (directly from JSON)
 */
export function getApiRequestTemplate(): ApiRequestBody {
  return { ...apiConfigJson } as ApiRequestBody;
}

/**
 * Build the complete API request body for a chat message
 * - Uses the JSON template as base configuration
 * - Replaces query and chatHistory with dynamic values
 * - Applies any overrides from the payload
 * - Only includes threshold parameter when kiosk_mode is true
 */
export function buildApiRequestBody(
  query: string,
  chatHistory: Array<{ role: string; content: string }> = [],
  overrides: Partial<ApiRequestBody> = {}
): ApiRequestBody {
  const template = getApiRequestTemplate();
  
  // Merge template with overrides, excluding query and chatHistory which are handled separately
  const { query: _, chatHistory: __, ...templateWithoutDynamic } = template;
  const { query: ___, chatHistory: ____, ...overridesWithoutDynamic } = overrides;
  
  // Build the base request body
  const requestBody: ApiRequestBody = {
    ...templateWithoutDynamic,
    ...overridesWithoutDynamic,
    query,
    chatHistory,
  };
  
  // Only include threshold if kiosk_mode is true
  if (!requestBody.kiosk_mode && 'threshold' in requestBody) {
    delete requestBody.threshold;
  }
  
  return requestBody;
}

/**
 * Get API endpoint URL from environment or default
 */
export function getApiEndpoint(): string {
  return  'https://api.moorcheh.ai/v1/answer';
}

/**
 * Get API headers with authentication
 */
export function getApiHeaders(): Record<string, string> {
  const apiKey = process.env.NEXT_PUBLIC_MOORCHEH_API_KEY;
  
  return {
    'Content-Type': 'application/json',
    ...(apiKey && { 'x-api-key': apiKey })
  };
}

/**
 * Get simplified API configuration for chat-config.ts
 * This extracts the key settings that chat-config needs
 */
export function getApiConfigForChat() {
  const template = getApiRequestTemplate();
  
  return {
    namespace: template.namespace,
    model: template.aiModel,
    temperature: template.temperature,
    topK: template.top_k,
    // Only include threshold if kiosk_mode is true
    ...(template.kiosk_mode && typeof template.threshold === 'number' && {
      threshold: template.threshold
    }),
    kioskMode: template.kiosk_mode,
    type: template.type,
    headerPrompt: template.headerPrompt,
    footerPrompt: template.footerPrompt,
  };
}

/**
 * Validate API configuration
 */
export function validateApiConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  try {
    const template = getApiRequestTemplate();
    
    // Required fields validation
    if (!template.namespace) {
      errors.push('Namespace is required in API configuration');
    }
    
    if (!template.aiModel) {
      errors.push('AI Model is required in API configuration');
    }
    
    // Environment validation
    if (!process.env.NEXT_PUBLIC_MOORCHEH_API_KEY) {
      errors.push('NEXT_PUBLIC_MOORCHEH_API_KEY environment variable is required');
    }
    
    // Type validations
    if (template.top_k && (typeof template.top_k !== 'number' || template.top_k < 1)) {
      errors.push('top_k must be a positive number');
    }
    
    if (template.temperature && (typeof template.temperature !== 'number' || template.temperature < 0 || template.temperature > 2)) {
      errors.push('temperature must be a number between 0 and 2');
    }
    
    if (template.threshold && (typeof template.threshold !== 'number' || template.threshold < 0 || template.threshold > 1)) {
      errors.push('threshold must be a number between 0 and 1');
    }
    
    // Kiosk mode validation
    if (template.kiosk_mode && typeof template.threshold !== 'number') {
      errors.push('threshold is required when kiosk_mode is true');
    }
    
  } catch (error) {
    errors.push(`Configuration parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Helper to check if kiosk mode is enabled
 */
export function isKioskModeEnabled(): boolean {
  try {
    const template = getApiRequestTemplate();
    return Boolean(template.kiosk_mode);
  } catch {
    return false;
  }
}

/**
 * Helper to get default chat history from config
 */
export function getDefaultChatHistory(): Array<{ role: string; content: string }> {
  try {
    const template = getApiRequestTemplate();
    return template.chatHistory || [];
  } catch {
    return [];
  }
} 