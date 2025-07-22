Create-namespace : 



curl -X POST "https://api.moorcheh.ai/v1/namespaces" \
  -H "Content-Type: application/json" \
  -H "x-api-Key: your-api-key-here" \
  -d '{
    "namespace_name": "my-documents",
    "type": "text"
  }'

curl -X POST "https://api.moorcheh.ai/v1/namespaces" \
  -H "Content-Type: application/json" \
  -H "x-api-Key: your-api-key-here" \
  -d '{
    "namespace_name": "my-embeddings",
    "type": "vector",
    "vector_dimension": 1536
  }'


List namespace:


curl -X GET "https://api.moorcheh.ai/v1/namespaces" \
  -H "Content-Type: application/json" \
  -H "x-api-Key: your-api-key-here"

Delete namespace : 

curl -X DELETE "https://api.moorcheh.ai/v1/namespaces/my-documents" \
  -H "Content-Type: application/json" \
  -H "x-api-Key: your-api-key-here"


Upload-text: 
curl -X POST "https://api.moorcheh.ai/v1/namespaces/my-namespace/documents" \
  -H "x-api-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "documents": [
      {
        "id": "doc-001", 
        "text": "This is the first document about Moorcheh."
      },
    ]
  }'

Upload vector:
curl -X POST "https://api.moorcheh.ai/v1/namespaces/my-vector-namespace/vectors" \
  -H "x-api-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "vectors": [
      {
        "id": "vector-001",
        "vector": [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
        "category": "product",
        "product_id": "12345"
      }
    ]
  }'


Search-text:

curl -X POST "https://api.moorcheh.ai/v1/search" \
  -H "Content-Type: application/json" \
  -H "x-api-Key: your-api-key-here" \
  -d '{
    "query": "machine learning algorithms",
    "namespaces": ["my-documents", "research-papers"],
    "top_k": 10,
    "threshold": 0.1
  }'

Search-vector:
curl -X POST "https://api.moorcheh.ai/v1/search" \
  -H "Content-Type: application/json" \
  -H "x-api-Key: your-api-key-here" \
  -d '{
    "query": [0.1, 0.2, 0.3, ..., 0.768],
    "namespaces": ["vector-embeddings"],
    "top_k": 5,
    "kiosk_mode": true
  }'
Gen-airesponse
curl -X POST "https://api.moorcheh.ai/v1/answer" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key-here" \
  -d '{
    "namespace": "technical-docs",
    "query": "How do I implement Moorcheh?",
    "type": "text",
    "top_k": 3,
    "threshold": 0.7,
    "aiModel": "anthropic.claude-3-7-sonnet-20250219-v1:0",
    "temperature": 0.5,
    "kiosk_mode": true,
    "headerPrompt": "You are a technical assistant.",
    "footerPrompt": "Provide step-by-step instructions."
  }'

Body:
{
  "namespace": "my-docs",
  "query": "How does that compare to traditional hosting?",
  "top_k": 3,
  "type": "text",
  "aiModel": "anthropic.claude-3-7-sonnet-20250219-v1:0",
  "temperature": 0.7,
  "kiosk_mode": true,
  "threshold": 0.7,
  "chatHistory": [
    {
      "role": "user",
      "content": "What are serverless benefits?"
    },
    {
      "role": "assistant", 
      "content": "Serverless offers automatic scaling..."
    }
  ],
  "headerPrompt": "You are a helpful AI assistant. Based on the provided context and chat history, please answer the user's query.",
  "footerPrompt": "Provide a clear and concise answer."
}

