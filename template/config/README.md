# 🔧 API Configuration

## How to Configure Your API

Simply paste your complete API request body into `api-config.json`. That's it!

### Example:

```json
{
  "namespace": "your-namespace",
  "query": "",
  "top_k": 5,
  "type": "text",
  "aiModel": "your-model",
  "temperature": 0.7,
  "kiosk_mode": false,
  "chatHistory": [],
  "headerPrompt": "Your system prompt here",
  "footerPrompt": "Your footer instructions here"
}
```

### What happens automatically:

- `query` gets filled with the user's message
- `chatHistory` gets filled with the conversation history
- Everything else stays exactly as you configured it

### To customize:

1. Get your API request body from your provider
2. Paste it into `config/api-config.json`
3. Restart your dev server: `npm run dev`
4. Done!

The system will use your exact configuration and only replace the dynamic fields (`query` and `chatHistory`) during chat interactions. 