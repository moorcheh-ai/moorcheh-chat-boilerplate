# Branding Customization Guide

This guide shows you how to completely customize your chat application's branding using environment variables.

## Quick Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with your branding:**
   ```bash
   # Your custom app name
   NEXT_PUBLIC_APP_NAME=MyCompany AI Assistant
   
   # Your app title (browser tab)
   NEXT_PUBLIC_APP_TITLE=MyCompany Chat
   
   # Your subtitle
   NEXT_PUBLIC_APP_SUBTITLE=How can we help you today?
   ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

That's it! Your app will now use your custom branding everywhere.

## Complete Environment Variables

Create a `.env.local` file in your project root with these variables:

```bash
# API Configuration
NEXT_PUBLIC_MOORCHEH_API_KEY=your_moorcheh_api_key_here

# API Request Configuration (Optional - overrides config/api-config.json)
NEXT_PUBLIC_API_ENDPOINT=https://api.moorcheh.ai/v1/answer
NEXT_PUBLIC_API_NAMESPACE=Demo-doc
NEXT_PUBLIC_API_MODEL=anthropic.claude-3-7-sonnet-20250219-v1:0
NEXT_PUBLIC_API_TEMPERATURE=0.7
NEXT_PUBLIC_API_TOP_K=5
NEXT_PUBLIC_API_KIOSK_MODE=false

# App Branding Configuration
# App Name - Used throughout the application
NEXT_PUBLIC_APP_NAME=Your AI Assistant

# App Title - Used in browser tab and metadata
NEXT_PUBLIC_APP_TITLE=Your Chat App

# App Subtitle - Used in chat interface
NEXT_PUBLIC_APP_SUBTITLE=How can I help you today?

# App Description - Used in metadata and SEO
NEXT_PUBLIC_APP_DESCRIPTION=AI-powered chat application with customizable themes and fonts

# App Logo - Path to logo in public directory
NEXT_PUBLIC_APP_LOGO=/logo.png

# Company Name - Used in footer and about sections
NEXT_PUBLIC_COMPANY_NAME=Your Company

# Contact Email - Used for support links
NEXT_PUBLIC_CONTACT_EMAIL=support@yourcompany.com

# AI Assistant Name - Used in chat prompts and responses
NEXT_PUBLIC_AI_ASSISTANT_NAME=Assistant

# Storage Prefix - Used for localStorage keys (optional)
NEXT_PUBLIC_STORAGE_PREFIX=your-app-chat

# Export Prefix - Used for exported chat files (optional)
NEXT_PUBLIC_EXPORT_PREFIX=YourApp-chat
```

## Branding Configuration Details

### **App Identity**

```bash
# Primary app name used throughout the UI
NEXT_PUBLIC_APP_NAME=MyCompany AI Assistant

# Browser tab title
NEXT_PUBLIC_APP_TITLE=MyCompany Chat

# Subtitle shown in chat interface
NEXT_PUBLIC_APP_SUBTITLE=How can we help you today?

# Meta description for SEO
NEXT_PUBLIC_APP_DESCRIPTION=AI-powered customer support chat
```

### **Visual Branding**

```bash
# Logo path (place your logo in public/ directory)
NEXT_PUBLIC_APP_LOGO=/your-logo.png

# Company name for footer/about
NEXT_PUBLIC_COMPANY_NAME=MyCompany Inc.
```

### **Contact Information**

```bash
# Support email for contact links
NEXT_PUBLIC_CONTACT_EMAIL=support@mycompany.com
```

### **AI Configuration**

```bash
# Name used in AI prompts and responses
NEXT_PUBLIC_AI_ASSISTANT_NAME=MyBot

# Custom AI behavior (optional)
NEXT_PUBLIC_AI_PERSONALITY=friendly and professional
```

### **Technical Settings**

```bash
# Prefix for localStorage keys (prevents conflicts)
NEXT_PUBLIC_STORAGE_PREFIX=mycompany-chat

# Prefix for exported chat files
NEXT_PUBLIC_EXPORT_PREFIX=MyCompany-chat
```

## Where Your Branding Appears

### **Browser & SEO**
- Browser tab title: `NEXT_PUBLIC_APP_TITLE`
- Meta description: `NEXT_PUBLIC_APP_DESCRIPTION`
- Open Graph tags: Uses app name and description

### **Chat Interface**
- Header title: `NEXT_PUBLIC_APP_NAME`
- Subtitle: `NEXT_PUBLIC_APP_SUBTITLE`
- Logo: `NEXT_PUBLIC_APP_LOGO`

### **AI Responses**
- Assistant name: `NEXT_PUBLIC_AI_ASSISTANT_NAME`
- Personality: `NEXT_PUBLIC_AI_PERSONALITY`

### **Export Files**
- Filename prefix: `NEXT_PUBLIC_EXPORT_PREFIX`
- Example: `MyCompany-chat-2024-01-15.txt`

### **Local Storage**
- Keys: `${NEXT_PUBLIC_STORAGE_PREFIX}-theme`, `${NEXT_PUBLIC_STORAGE_PREFIX}-data`

## Advanced Branding

### **Custom Logo Setup**

1. **Add your logo to the public directory:**
   ```
   public/
   ├── your-logo.png          # Main logo
   ├── your-logo-dark.png     # Dark theme variant (optional)
   └── favicon.ico            # Browser favicon
   ```

2. **Update environment variable:**
   ```bash
   NEXT_PUBLIC_APP_LOGO=/your-logo.png
   ```

3. **For dark theme support:**
   ```bash
   NEXT_PUBLIC_APP_LOGO_DARK=/your-logo-dark.png
   ```

### **Custom Favicon**

Replace `public/favicon.ico` with your custom favicon.

### **Custom Theme Colors**

While branding handles text and logos, you can customize colors using the theme system:

1. **Edit theme configuration:**
   ```typescript
   // customize/themes/theme-config.ts
   export const themeConfig = {
     defaultTheme: 'custom-brand', // Your custom theme
   };
   ```

2. **Create your brand theme:**
   ```typescript
   // customize/themes/custom-themes.ts
   export const customThemes = {
     'custom-brand': {
       '--primary': 'oklch(0.6 0.2 220)', // Your brand color
       '--background': 'oklch(0.98 0.02 220)',
       // ... other colors
     },
   };
   ```

## Environment File Templates

### **Minimal Setup** (`.env.local`)
```bash
# Required
NEXT_PUBLIC_MOORCHEH_API_KEY=your_api_key_here

# Basic Branding
NEXT_PUBLIC_APP_NAME=My Chat App
NEXT_PUBLIC_APP_TITLE=My Chat
NEXT_PUBLIC_APP_SUBTITLE=How can I help?
```

### **Complete Setup** (`.env.local`)
```bash
# API Configuration
NEXT_PUBLIC_MOORCHEH_API_KEY=your_api_key_here
NEXT_PUBLIC_API_ENDPOINT=https://api.moorcheh.ai/v1/answer

# Complete Branding
NEXT_PUBLIC_APP_NAME=MyCompany AI Assistant
NEXT_PUBLIC_APP_TITLE=MyCompany Support Chat
NEXT_PUBLIC_APP_SUBTITLE=We're here to help you 24/7
NEXT_PUBLIC_APP_DESCRIPTION=AI-powered customer support for MyCompany products and services
NEXT_PUBLIC_APP_LOGO=/mycompany-logo.png
NEXT_PUBLIC_COMPANY_NAME=MyCompany Inc.
NEXT_PUBLIC_CONTACT_EMAIL=support@mycompany.com
NEXT_PUBLIC_AI_ASSISTANT_NAME=MyBot
NEXT_PUBLIC_STORAGE_PREFIX=mycompany-support
NEXT_PUBLIC_EXPORT_PREFIX=MyCompany-Support
```

## Troubleshooting

### **Branding Not Updating**
1. Restart your development server after changing environment variables
2. Clear browser cache and localStorage
3. Check that variable names are spelled correctly (case-sensitive)

### **Logo Not Displaying**
1. Ensure logo file is in `public/` directory
2. Check file path in `NEXT_PUBLIC_APP_LOGO`
3. Verify file format (PNG, JPG, SVG supported)
4. Check file permissions

### **Environment Variables Not Working**
1. File must be named exactly `.env.local`
2. Variables must start with `NEXT_PUBLIC_`
3. No spaces around the `=` sign
4. Restart development server after changes

## Related Documentation

- [Branding Customization](BRANDING_GUIDE.md) - Customize app branding
- [Theme Configuration](customize/themes/README.md) - Customize themes
- [Font Configuration](customize/fonts/README.md) - Customize fonts
- [API Configuration](API_CONFIGURATION_GUIDE.md) - Configure API settings 