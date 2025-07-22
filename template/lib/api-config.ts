/**
 * 🔧 API Configuration Manager
 * 
 * Users just paste their API request body into config/api-config.json
 * The system will use it as-is and only replace query and chatHistory dynamically
 */

import apiConfigJson from '../config/api-config.json';

export interface ApiRequestBody {
  namespace: string;
  query: string;
  top_k: number;
  type: string;
  aiModel: string;
  temperature: number;
  kiosk_mode: boolean;
  chatHistory: Array<{
    role: string;
    content: string;
  }>;
  headerPrompt: string;
  footerPrompt: string;
  [key: string]: unknown; // Allow additional custom fields
}

/**
 * Get the API request body template (directly from JSON)
 */
export function getApiRequestTemplate(): ApiRequestBody {
  return { ...apiConfigJson } as ApiRequestBody;
}

/**
 * Build the complete API request body for a chat message
 * Takes the JSON template and just replaces query and chatHistory
 */
export function buildApiRequestBody(
  query: string,
  chatHistory: Array<{ role: string; content: string }> = [],
  overrides: Partial<ApiRequestBody> = {}
): ApiRequestBody {
  const template = getApiRequestTemplate();
  
  // Use the template as-is and just replace the dynamic fields
  const requestBody: ApiRequestBody = {
    ...template,
    query,
    chatHistory,
    ...overrides
  };
  
  return requestBody;
}

/**
 * Get API endpoint URL
 */
export function getApiEndpoint(): string {
  return process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://api.moorcheh.ai/v1/answer';
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
 * Simple validation
 */
export function validateApiConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  try {
    const template = getApiRequestTemplate();
    
    if (!template.namespace) {
      errors.push('Namespace is required in API configuration');
    }
    
    if (!process.env.NEXT_PUBLIC_MOORCHEH_API_KEY) {
      errors.push('NEXT_PUBLIC_MOORCHEH_API_KEY environment variable is required');
    }
    
  } catch (error) {
    errors.push(`Configuration parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
} 