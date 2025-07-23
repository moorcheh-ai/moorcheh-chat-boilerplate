# Branding Guide

Customize your chat application's branding using environment variables.

## Quick Setup

1. Create `.env.local` in your project root:
```bash
# Required API key
NEXT_PUBLIC_MOORCHEH_API_KEY=your_api_key_here

# Basic branding
NEXT_PUBLIC_APP_NAME=My Chat App
NEXT_PUBLIC_APP_TITLE=My Chat
NEXT_PUBLIC_APP_SUBTITLE=How can I help you today?
```

2. Restart your development server:
```bash
npm run dev
```

## All Branding Options

```bash
# App Identity
NEXT_PUBLIC_APP_NAME=Your AI Assistant
NEXT_PUBLIC_APP_TITLE=Your Chat App
NEXT_PUBLIC_APP_SUBTITLE=How can I help you today?
NEXT_PUBLIC_APP_DESCRIPTION=AI-powered chat application

# Visual
NEXT_PUBLIC_APP_LOGO=/logo.png
NEXT_PUBLIC_COMPANY_NAME=Your Company

# Contact
NEXT_PUBLIC_CONTACT_EMAIL=support@yourcompany.com

# AI Assistant
NEXT_PUBLIC_AI_ASSISTANT_NAME=Assistant

# Technical (optional)
NEXT_PUBLIC_STORAGE_PREFIX=your-app-chat
NEXT_PUBLIC_EXPORT_PREFIX=YourApp-chat
```

## Where Branding Appears

- **Browser tab**: `APP_TITLE`
- **Chat header**: `APP_NAME`
- **Chat subtitle**: `APP_SUBTITLE`
- **Logo**: `APP_LOGO` (place file in `public/` folder)
- **AI responses**: `AI_ASSISTANT_NAME`
- **Exported files**: `EXPORT_PREFIX-chat-2024-01-15.txt`

## Custom Logo

1. Add your logo to `public/your-logo.png`
2. Set: `NEXT_PUBLIC_APP_LOGO=/your-logo.png`
3. Replace `public/favicon.ico` with your favicon

## Troubleshooting

- Restart server after changing environment variables
- Variables must start with `NEXT_PUBLIC_`
- File must be named `.env.local`
- No spaces around `=` sign
- Logo files go in `public/` directory

## Additional Customization

For fonts and themes customization, see `/customize/README.md` 