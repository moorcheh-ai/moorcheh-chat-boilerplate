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
import { logger } from './logger';
import { VALIDATION_CONSTANTS } from './constants';

/** Moorcheh `/v1/answer` request body (snake_case). See https://docs.moorcheh.ai/api-reference/ai/generate */
export interface ApiRequestBody {
  namespace: string;
  query: string;
  top_k?: number;
  type?: string;
  ai_model?: string;
  temperature?: number;
  kiosk_mode?: boolean;
  threshold?: number; // Only included when kiosk_mode is true
  chat_history: Array<{
    role: string;
    content: string;
  }>;
  header_prompt?: string;
  footer_prompt?: string;
  structured_response?: Record<string, unknown>;
}

const LEGACY_API_KEY_MAP: Record<string, string> = {
  aiModel: 'ai_model',
  chatHistory: 'chat_history',
  headerPrompt: 'header_prompt',
  footerPrompt: 'footer_prompt',
  kioskMode: 'kiosk_mode',
  topK: 'top_k',
  structuredResponse: 'structured_response',
};

/**
 * Maps deprecated camelCase keys to snake_case when the snake_case key is absent.
 * Moorcheh deprecated camelCase for removal May 2026.
 */
export function normalizeApiConfigKeys(input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...input };
  for (const [legacy, snake] of Object.entries(LEGACY_API_KEY_MAP)) {
    if (legacy in out && !(snake in out)) {
      out[snake] = out[legacy];
    }
    if (legacy in out) {
      delete out[legacy];
    }
  }
  return out;
}

/**
 * Get the API request body template (directly from JSON)
 */
export function getApiRequestTemplate(): ApiRequestBody {
  const raw = apiConfigJson as Record<string, unknown>;
  return normalizeApiConfigKeys(raw) as unknown as ApiRequestBody;
}

/**
 * Build the complete API request body for a chat message
 * - Uses the JSON template as base configuration
 * - Replaces query and chat_history with dynamic values
 * - Applies any overrides from the payload
 * - Only includes threshold parameter when kiosk_mode is true
 */
export function buildApiRequestBody(
  query: string,
  chat_history: Array<{ role: string; content: string }> = [],
  overrides: Partial<ApiRequestBody> = {}
): ApiRequestBody {
  const template = getApiRequestTemplate();
  
  // Merge template with overrides, excluding query and chat_history which are handled separately
  const { query: _unusedQuery, chat_history: _unusedChatHistory, ...templateWithoutDynamic } = template;
  const { query: _unusedOverrideQuery, chat_history: _unusedOverrideChatHistory, ...overridesWithoutDynamic } =
    overrides;
  
  // Build the base request body
  const merged: Record<string, unknown> = {
    ...templateWithoutDynamic,
    ...overridesWithoutDynamic,
    query,
    chat_history,
  };

  const requestBody = normalizeApiConfigKeys(merged) as unknown as ApiRequestBody;
  
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
  return process.env.NEXT_PUBLIC_MOORCHEH_API_ENDPOINT || 'https://api.moorcheh.ai/v1/answer';
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
    ai_model: template.ai_model,
    temperature: template.temperature,
    top_k: template.top_k,
    // Only include threshold if kiosk_mode is true
    ...(template.kiosk_mode && typeof template.threshold === 'number' && {
      threshold: template.threshold
    }),
    kiosk_mode: template.kiosk_mode,
    type: template.type,
    header_prompt: template.header_prompt,
    footer_prompt: template.footer_prompt,
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
    
    if (!template.ai_model) {
      errors.push('ai_model is required in API configuration');
    }
    
    // Environment validation
    if (!process.env.NEXT_PUBLIC_MOORCHEH_API_KEY) {
      errors.push('NEXT_PUBLIC_MOORCHEH_API_KEY environment variable is required');
    }
    
    // Type validations
    if (template.top_k && (typeof template.top_k !== 'number' || template.top_k < VALIDATION_CONSTANTS.MIN_TOP_K || template.top_k > VALIDATION_CONSTANTS.MAX_TOP_K)) {
      errors.push(`top_k must be a number between ${VALIDATION_CONSTANTS.MIN_TOP_K} and ${VALIDATION_CONSTANTS.MAX_TOP_K}`);
    }
    
    if (template.temperature && (typeof template.temperature !== 'number' || template.temperature < VALIDATION_CONSTANTS.MIN_TEMPERATURE || template.temperature > VALIDATION_CONSTANTS.MAX_TEMPERATURE)) {
      errors.push(`temperature must be a number between ${VALIDATION_CONSTANTS.MIN_TEMPERATURE} and ${VALIDATION_CONSTANTS.MAX_TEMPERATURE}`);
    }
    
    if (template.threshold && (typeof template.threshold !== 'number' || template.threshold < VALIDATION_CONSTANTS.MIN_THRESHOLD || template.threshold > VALIDATION_CONSTANTS.MAX_THRESHOLD)) {
      errors.push(`threshold must be a number between ${VALIDATION_CONSTANTS.MIN_THRESHOLD} and ${VALIDATION_CONSTANTS.MAX_THRESHOLD}`);
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
    return template.chat_history || [];
  } catch {
    return [];
  }
} 