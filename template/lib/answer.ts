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
}

export interface AnswerResponse {
  answer?: string;
  response?: string;
  [key: string]: unknown;
}

export async function fetchAnswer(payload: AnswerRequest): Promise<AnswerResponse> {
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