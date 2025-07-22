# 🎨 Branding Customization Guide

This guide shows you how to completely customize your chat application's branding using environment variables.

## 🚀 Quick Setup

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

## 🎯 Complete Environment Variables

Create a `.env.local` file in your project root with these variables:

```bash
# 🔑 API Configuration
NEXT_PUBLIC_MOORCHEH_API_KEY=your_moorcheh_api_key_here

# 🚀 API Request Configuration (Optional - overrides config/api-config.json)
NEXT_PUBLIC_API_ENDPOINT=https://api.moorcheh.ai/v1/answer
NEXT_PUBLIC_API_NAMESPACE=Demo-doc
NEXT_PUBLIC_API_MODEL=anthropic.claude-3-7-sonnet-20250219-v1:0
NEXT_PUBLIC_API_TEMPERATURE=0.7
NEXT_PUBLIC_API_TOP_K=5
NEXT_PUBLIC_API_KIOSK_MODE=false

# 🎨 App Branding Configuration
# App Name - Used throughout the application
NEXT_PUBLIC_APP_NAME=Your AI Assistant

# App Title - Used in browser tab and metadata
NEXT_PUBLIC_APP_TITLE=Your Chat App

# App Subtitle/Description - Used in chat interface
NEXT_PUBLIC_APP_SUBTITLE=How can we help you today?

# App Description - Used in metadata
NEXT_PUBLIC_APP_DESCRIPTION=AI-powered chat application

# Logo Path - Path to your logo file in the public directory
NEXT_PUBLIC_APP_LOGO=/your-logo.png

# Company/Contact Information (used in footer)
NEXT_PUBLIC_COMPANY_NAME=Your Company
NEXT_PUBLIC_CONTACT_EMAIL=contact@yourcompany.com

# AI Assistant Name - Used in chat prompts and responses
NEXT_PUBLIC_AI_ASSISTANT_NAME=YourBot

# Storage Prefix - Used for localStorage keys (lowercase, no spaces)
NEXT_PUBLIC_STORAGE_PREFIX=yourcompany-chat

# Export File Prefix - Used when exporting chat conversations
NEXT_PUBLIC_EXPORT_PREFIX=YourCompany-chat
```

## 📍 Where Each Variable is Used

| Variable | Used In | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_APP_NAME` | Chat interface header, widget title | Main app name displayed to users |
| `NEXT_PUBLIC_APP_TITLE` | Browser tab, page metadata | HTML title tag |
| `NEXT_PUBLIC_APP_SUBTITLE` | Chat interface, metadata | Subtitle shown below main title |
| `NEXT_PUBLIC_APP_DESCRIPTION` | Page metadata, SEO | Meta description for search engines |
| `NEXT_PUBLIC_APP_LOGO` | Navbar, headers | Path to your logo image |
| `NEXT_PUBLIC_COMPANY_NAME` | Footer, navbar alt text | Your company/brand name |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Footer contact links | Support/contact email |
| `NEXT_PUBLIC_AI_ASSISTANT_NAME` | AI chat prompts | Name the AI uses to identify itself |
| `NEXT_PUBLIC_STORAGE_PREFIX` | Browser localStorage keys | Prefix for stored data |
| `NEXT_PUBLIC_EXPORT_PREFIX` | Downloaded chat files | Prefix for exported file names |

## 🖼️ Custom Logo Setup

1. **Add your logo to the `public` folder:**
   ```
   public/
   ├── your-logo.png
   └── favicon.ico
   ```

2. **Update the logo path:**
   ```bash
   NEXT_PUBLIC_APP_LOGO=/your-logo.png
   ```

3. **Recommended logo specs:**
   - Format: PNG, SVG, or JPG
   - Size: 140x40px (or similar aspect ratio)
   - Transparent background for PNG

## 🎨 Examples

### E-commerce Store
```bash
NEXT_PUBLIC_APP_NAME=ShopBot Assistant
NEXT_PUBLIC_APP_TITLE=ShopBot - Shopping Helper
NEXT_PUBLIC_APP_SUBTITLE=Find products, get recommendations, and shop smarter
NEXT_PUBLIC_COMPANY_NAME=ShopBot
NEXT_PUBLIC_AI_ASSISTANT_NAME=ShopBot
NEXT_PUBLIC_STORAGE_PREFIX=shopbot-chat
```

### SaaS Support
```bash
NEXT_PUBLIC_APP_NAME=TechCorp Support
NEXT_PUBLIC_APP_TITLE=TechCorp Help Center
NEXT_PUBLIC_APP_SUBTITLE=Get instant help with your account
NEXT_PUBLIC_COMPANY_NAME=TechCorp
NEXT_PUBLIC_AI_ASSISTANT_NAME=TechSupport
NEXT_PUBLIC_STORAGE_PREFIX=techcorp-support
```

### Personal Blog
```bash
NEXT_PUBLIC_APP_NAME=BlogBot
NEXT_PUBLIC_APP_TITLE=Ask BlogBot
NEXT_PUBLIC_APP_SUBTITLE=Ask questions about my blog posts
NEXT_PUBLIC_COMPANY_NAME=My Blog
NEXT_PUBLIC_AI_ASSISTANT_NAME=BlogBot
NEXT_PUBLIC_STORAGE_PREFIX=myblog-chat
```

## 🔧 Default Values

If you don't set any environment variables, the app will use these defaults:

- **App Name:** Moorcheh AI Assistant
- **App Title:** Moorcheh Chat
- **Subtitle:** Your intelligent chat companion
- **Logo:** /moorcheh-logo.png
- **Company:** Moorcheh
- **AI Name:** Moorcheh
- **Storage Prefix:** moorcheh-chat

## 🚨 Important Notes

1. **Environment variables must start with `NEXT_PUBLIC_`** to be accessible in the browser
2. **Restart your development server** after changing environment variables
3. **Don't commit `.env.local`** to version control (it's in .gitignore)
4. **Use `.env.example`** to document required variables for your team

## 🔄 Migration from Hardcoded Values

If you're upgrading from a version with hardcoded "Moorcheh" branding:

1. All hardcoded references are now automatically replaced with environment variables
2. If no environment variables are set, it will default to the original "Moorcheh" branding
3. Simply set your environment variables and restart - no code changes needed!

## 🆘 Troubleshooting

**Problem:** Changes not showing up
- **Solution:** Restart your development server (`npm run dev`)

**Problem:** Logo not displaying
- **Solution:** Ensure the logo file exists in the `public` folder and the path is correct

**Problem:** Some text still shows "Moorcheh"
- **Solution:** Check that you've set all relevant environment variables and restarted the server

## 📚 Next Steps

After customizing your branding, you might want to:
- [Customize themes and colors](customize/themes/README.md)
- [Change fonts](customize/fonts/README.md)
- [Configure the chat behavior](lib/chat-config.ts) 