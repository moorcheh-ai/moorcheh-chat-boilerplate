# 🔧 API Configuration Guide

## Quick Start

1. Create a new file named `api-config.json` in the `config` directory
2. Visit [Moorcheh Console](https://console.moorcheh.ai/playground) to generate your configuration
3. Copy the JSON configuration and paste it into `api-config.json`
4. Restart your development server with `npm run dev`

## Detailed Configuration Steps

### Step 1: Get Your API Configuration

1. Log in to [Moorcheh Console](https://console.moorcheh.ai)
2. Navigate to the Documentation section at `console.moorcheh.ai/docs`
3. Use the Playground at `console.moorcheh.ai/playground` to:
   - Test different settings
   - Generate your configuration
   - Verify the behavior

### Step 2: Create Configuration File

Create `api-config.json` in the `config` directory with your settings:

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

### Configuration Fields Explained

| Field | Description | Auto-filled? |
|-------|-------------|--------------|
| `namespace` | Your unique project namespace | No |
| `query` | The user's current message | Yes ✓ |
| `top_k` | Number of top results to return (1-10) | No |
| `type` | Response type (e.g., "text", "json") | No |
| `aiModel` | AI model to use for responses | No |
| `temperature` | Response creativity (0.0-1.0) | No |
| `kiosk_mode` | Enable/disable kiosk mode | No |
| `chatHistory` | Conversation history array | Yes ✓ |
| `headerPrompt` | System instructions at start | No |
| `footerPrompt` | Instructions at end of prompt | No |

### Important Notes

- Only `query` and `chatHistory` are automatically managed by the system
- All other fields remain exactly as you configure them
- Changes to `api-config.json` require a server restart
- Keep your configuration secure and never commit it to version control

## Troubleshooting

If you encounter issues:
1. Verify your configuration matches the example format
2. Ensure all required fields are present
3. Check that the values match your Moorcheh Console settings
4. Try regenerating the configuration in the Playground

Need help? Visit our [support documentation](https://console.moorcheh.ai/docs) for more information. 