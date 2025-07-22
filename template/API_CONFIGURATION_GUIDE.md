# 🔧 API Configuration Guide

This guide shows you how to completely customize your API requests by simply pasting your API request body into a JSON file.

## 🚀 Quick Setup

**Just paste your API body into `config/api-config.json`:**

1. **Edit `config/api-config.json`:**
   ```json
   {
     "apiEndpoint": "https://your-api.com/v1/answer",
     "requestBodyTemplate": {
       "namespace": "your-namespace",
       "query": "",
       "top_k": 5,
       "type": "text",
       "aiModel": "your-preferred-model",
       "temperature": 0.7,
       "kiosk_mode": false,
       "chatHistory": [],
       "headerPrompt": "Your custom system prompt",
       "footerPrompt": "Your custom footer instructions"
     }
   }
   ```

2. **Restart your development server:**
   ```bash
   npm run dev
   ```

**That's it!** The system will automatically use your request body template and fill in the `query` and `chatHistory` from user interactions.

## 📋 Complete API Configuration

### JSON Configuration File (`config/api-config.json`)

```json
{
  "apiEndpoint": "https://api.moorcheh.ai/v1/answer",
  "defaultRequestBody": {
    "namespace": "Demo-doc",
    "top_k": 5,
    "type": "text",
    "aiModel": "anthropic.claude-3-7-sonnet-20250219-v1:0",
    "temperature": 0.7,
    "kiosk_mode": false,
    "headerPrompt": "You are a helpful AI assistant. Based on the provided context and chat history, please answer the user's query. If the context is not sufficient, say you don't have enough information.",
    "footerPrompt": "Base your answers on the context provided..."
  },
  "headers": {
    "Content-Type": "application/json"
  },
  "dynamicFields": {
    "query": "user_input",
    "chatHistory": "chat_history"
  },
  "environmentOverrides": {
    "namespace": "NEXT_PUBLIC_API_NAMESPACE",
    "aiModel": "NEXT_PUBLIC_API_MODEL",
    "temperature": "NEXT_PUBLIC_API_TEMPERATURE",
    "top_k": "NEXT_PUBLIC_API_TOP_K",
    "kiosk_mode": "NEXT_PUBLIC_API_KIOSK_MODE"
  }
}
```

## 🎯 Configuration Fields Explained

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `apiEndpoint` | string | Your API endpoint URL | `"https://api.moorcheh.ai/v1/answer"` |
| `namespace` | string | Knowledge base namespace | `"Demo-doc"` |
| `top_k` | number | Number of context chunks to retrieve | `5` |
| `type` | string | Query type | `"text"` |
| `aiModel` | string | AI model to use | `"anthropic.claude-3-7-sonnet-20250219-v1:0"` |
| `temperature` | number | Response creativity (0-2) | `0.7` |
| `kiosk_mode` | boolean | Enable kiosk mode | `false` |
| `headerPrompt` | string | System prompt for the AI | Custom instructions |
| `footerPrompt` | string | Additional context instructions | Custom context handling |

## 🌍 Environment Variable Overrides

You can override any configuration value using environment variables:

```bash
# API Configuration
NEXT_PUBLIC_API_ENDPOINT=https://your-api.com/v1/answer
NEXT_PUBLIC_API_NAMESPACE=your-namespace
NEXT_PUBLIC_API_MODEL=gpt-4
NEXT_PUBLIC_API_TEMPERATURE=0.8
NEXT_PUBLIC_API_TOP_K=10
NEXT_PUBLIC_API_KIOSK_MODE=true
```

**Priority:** Environment Variables > JSON Configuration > Defaults

## 🎨 Real-World Examples

### Example 1: E-commerce Support Bot

**config/api-config.json:**
```json
{
  "apiEndpoint": "https://api.yourstore.com/v1/answer",
  "defaultRequestBody": {
    "namespace": "ecommerce-support",
    "top_k": 8,
    "type": "text",
    "aiModel": "gpt-4",
    "temperature": 0.3,
    "kiosk_mode": false,
    "headerPrompt": "You are a helpful e-commerce support assistant. Help customers with orders, products, and general inquiries. Be friendly and professional.",
    "footerPrompt": "Always prioritize customer satisfaction. If you cannot help with an issue, direct them to human support."
  }
}
```

### Example 2: Technical Documentation Bot

**config/api-config.json:**
```json
{
  "apiEndpoint": "https://api.techcorp.com/v1/answer",
  "defaultRequestBody": {
    "namespace": "tech-docs",
    "top_k": 5,
    "type": "text",
    "aiModel": "anthropic.claude-3-7-sonnet-20250219-v1:0",
    "temperature": 0.1,
    "kiosk_mode": false,
    "headerPrompt": "You are a technical documentation assistant. Provide accurate, detailed technical information based on the documentation context.",
    "footerPrompt": "Always include code examples when relevant. If information is not in the documentation, clearly state that."
  }
}
```

### Example 3: Customer Service with Custom Headers

**config/api-config.json:**
```json
{
  "apiEndpoint": "https://api.customerservice.com/v1/chat",
  "defaultRequestBody": {
    "namespace": "customer-service",
    "top_k": 3,
    "type": "conversation",
    "aiModel": "custom-model-v2",
    "temperature": 0.5,
    "kiosk_mode": true,
    "priority": "high",
    "department": "support"
  },
  "headers": {
    "Content-Type": "application/json",
    "X-Service-Version": "2.0",
    "X-Department": "customer-support"
  }
}
```

## 🔄 Dynamic Fields

The system automatically handles these dynamic fields:

- **`query`**: Filled with user input
- **`chatHistory`**: Filled with conversation history

You don't need to configure these - they're handled automatically.

## 🛡️ Validation & Error Handling

The system automatically validates your configuration:

```typescript
import { validateApiConfig } from '@/lib/api-config';

const validation = validateApiConfig();
if (!validation.isValid) {
  console.log('Configuration errors:', validation.errors);
}
```

**Common validation errors:**
- Missing API endpoint
- Invalid temperature (must be 0-2)
- Missing API key
- Invalid top_k (must be positive number)

## 🚀 Advanced Usage

### Custom Request Body Fields

Add any custom fields to your request body:

```json
{
  "defaultRequestBody": {
    "namespace": "custom",
    "customField": "customValue",
    "metadata": {
      "source": "web-app",
      "version": "1.0"
    }
  }
}
```

### Multiple Configurations

Create different configurations for different environments:

```bash
# Development
config/api-config.json

# Production
config/api-config.prod.json

# Staging
config/api-config.staging.json
```

### Runtime Configuration Changes

```typescript
import { createCustomApiConfig } from '@/lib/api-config';

const customConfig = createCustomApiConfig({
  defaultRequestBody: {
    temperature: 0.9,
    top_k: 10
  }
});
```

## 🔧 Migration from Old System

If you're upgrading from the old hardcoded system:

1. **Your existing code will still work** - backward compatibility is maintained
2. **Gradually migrate** by updating `config/api-config.json`
3. **Remove hardcoded values** from your components
4. **Use environment variables** for environment-specific settings

## 🆘 Troubleshooting

**Problem:** API requests failing
- **Solution:** Check `validateApiConfig()` for configuration errors

**Problem:** Environment variables not working
- **Solution:** Ensure they start with `NEXT_PUBLIC_` and restart dev server

**Problem:** Custom fields not being sent
- **Solution:** Add them to `defaultRequestBody` in your JSON config

**Problem:** Headers not being sent
- **Solution:** Check the `headers` section in your JSON config

## 📚 Related Guides

- [Branding Customization](BRANDING_GUIDE.md) - Customize app branding
- [Theme Configuration](customize/themes/README.md) - Customize themes
- [Chat Configuration](lib/chat-config.ts) - Configure chat behavior

## 🎯 Best Practices

1. **Use JSON configuration** for complex request bodies
2. **Use environment variables** for sensitive data and environment-specific settings
3. **Validate configuration** in development
4. **Test thoroughly** after making changes
5. **Document custom fields** for your team
6. **Version control** your configuration files
7. **Keep sensitive data** in environment variables, not JSON files 