# Moorcheh Chat Boilerplate

A Next.js boilerplate for building AI-powered chat applications with customizable themes, fonts, and branding.

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Get your API key:**
   - Visit [Moorcheh Console API Keys](https://console.moorcheh.ai/api-keys)
   - Copy your API key

3. **Set up environment variables:**
   - Create `.env.local` in your project root
   - Add your API key:
```bash
NEXT_PUBLIC_MOORCHEH_API_KEY=your_api_key_here
```

4. **Configure API request body:**
   - Visit [Moorcheh Console Playground](https://console.moorcheh.ai/playground)
   - Configure your namespace, model, and settings
   - Copy the complete JSON configuration
   - Create `config/api-config.json` and paste the configuration
   - See `config/README.md` for detailed instructions

5. **Start development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your chat application.

**Test your customizations:** Visit [http://localhost:3000/demo](http://localhost:3000/demo) to test themes and fonts.

**Build your app:** Use `components/ui` for additional UI components throughout your application.

## Features

- **Next.js 15** with React 19 and TypeScript
- **Pre-built chat components** ready to use
- **Moorcheh AI integration** with easy configuration
- **Customizable themes** (light, dark, blue, green, custom)
- **30+ fonts** with Next.js optimization
- **Tailwind CSS** and Radix UI components
- **Complete branding system** via environment variables

## Configuration Guides

- **API Setup**: `config/README.md` - Configure your AI API
- **Branding**: `BRANDING_GUIDE.md` - Customize app name, logo, colors
- **Themes & Fonts**: `customize/README.md` - Change appearance

## Project Structure

```
your-project/
├── app/                    # Next.js pages
├── components/             # React components
│   ├── chat/              # Chat components
│   └── ui/                # UI components
├── config/                 # API configuration
├── customize/              # Themes and fonts
├── hooks/                  # React hooks
├── lib/                    # Utilities
└── public/                 # Static files
```

## Customization

### Change Theme
```typescript
// customize/themes/theme-config.ts
export const themeConfig = {
  defaultTheme: 'dark', // 'light', 'dark', 'blue', 'green'
};
```

### Change Fonts  
```typescript
// customize/fonts/font-config.ts
export const fontConfig = {
  primaryFont: 'Inter',
  monoFont: 'Fira Code',
};
```

### Change Chat Mode
```typescript
// lib/chat-config.ts
export const chatConfig = {
  type: 'interface', // 'interface' or 'widget'
};
```

### Change Branding
```bash
# .env.local
NEXT_PUBLIC_APP_NAME=My Chat App
NEXT_PUBLIC_APP_TITLE=My Chat
NEXT_PUBLIC_APP_LOGO=/logo.png
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or follow the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying).

## Support

- [Moorcheh Console](https://console.moorcheh.ai) - API configuration
- [Next.js Documentation](https://nextjs.org/docs) - Framework guide