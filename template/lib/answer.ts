import { 
  buildApiRequestBody, 
  getApiEndpoint, 
  getApiHeaders, 
  validateApiConfig
} from './api-config';

export interface AnswerRequest {
  namespace: string;
  query: string;
  type?: string;
  top_k?: number;
  aiModel?: string;
  temperature?: number;
  kiosk_mode?: boolean;
  threshold?: number;
  chatHistory?: { role: string; content: string }[];
  headerPrompt?: string;
  footerPrompt?: string;
  [key: string]: unknown; // Allow additional custom fields
}

export interface AnswerResponse {
  answer?: string;
  response?: string;
  [key: string]: unknown;
}

/**
 * Fetch answer using the new API configuration system
 * This function now uses config/api-config.json for all request parameters
 */
export async function fetchAnswer(payload: AnswerRequest): Promise<AnswerResponse> {
  // Validate API configuration first
  const validation = validateApiConfig();
  if (!validation.isValid) {
    console.error('API Configuration errors:', validation.errors);
    throw new Error(`API Configuration invalid: ${validation.errors.join(', ')}`);
  }

  // Build the complete request body using the configuration
  const requestBody = buildApiRequestBody(
    payload.query,
    payload.chatHistory || [],
    payload // Any overrides from the payload
  );

  // Get endpoint and headers from configuration
  const endpoint = getApiEndpoint();
  const headers = getApiHeaders();

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API error (${res.status}): ${errorText}`);
    }

    return res.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use fetchAnswer instead
 */
export async function fetchAnswerLegacy(payload: AnswerRequest): Promise<AnswerResponse> {
  const res = await fetch("https://api.moorcheh.ai/v1/answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_MOORCHEH_API_KEY || "",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("API error");
  return res.json();
} 