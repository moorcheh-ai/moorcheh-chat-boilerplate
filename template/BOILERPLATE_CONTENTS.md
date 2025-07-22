# Moorcheh Chat Boilerplate - Repository Contents

This document outlines what should be included in your boilerplate repository for users to get started quickly.

## **ESSENTIAL FILES** (Must Include)

### **Core Configuration**
```
lib/
├── chat-config.ts              # MAIN CONFIG - Users configure chat type here
├── answer.ts                   # API integration with Moorcheh
├── utils.ts                    # Utility functions
└── themes.ts                   # Theme utilities
```

### **Dynamic Chat System**
```
components/
├── DynamicChat.tsx             # MAIN COMPONENT - Auto-renders based on config
├── chat/
│   ├── Chat.tsx               # Basic chat component
│   ├── index.tsx              # Exports all chat components
│   └── README.md              # Complete usage guide
├── chat-interface/            # Full chat interface
│   ├── ChatWindow.tsx         # Main interface component
│   ├── MessageList.tsx        # Message display
│   ├── MessageInput.tsx       # Input field
│   └── FileUploader.tsx       # File upload functionality
└── chat-widget/               # Floating widget
    ├── ChatWidget.tsx         # Main widget component
    └── index.tsx              # Widget exports
```

### **UI Components** (Keep Essential Only)
```
components/ui/
├── button.tsx                 # Required by chat components
├── card.tsx                   # Required by chat components
├── input.tsx                  # Required by chat components
├── avatar.tsx                 # Required by chat components
├── badge.tsx                  # Optional but commonly used
├── dialog.tsx                 # Optional but useful
├── toast.tsx                  # Optional for notifications
├── toaster.tsx                # Goes with toast
└── theme-toggle.tsx           # For theme switching
```

### **Theme System**
```
customize/
├── themes/
│   ├── theme-config.ts        # Main theme configuration
│   ├── available-themes.ts    # All available themes
│   ├── custom-themes.ts       # User custom themes
│   └── README.md              # Theme-specific guide
├── fonts/
│   ├── font-config.ts         # Main font configuration  
│   ├── available-fonts.ts     # All available fonts
│   ├── custom-fonts.ts        # User custom fonts
│   └── README.md              # Font guide
└── README.md                  # Customization overview
```

### **Configuration Files**
```
config/
├── api-config.json            # API request configuration
└── README.md                  # Configuration guide
```

### **App Structure**
```
app/
├── layout.tsx                 # Root layout with font/theme setup
├── page.tsx                   # Main page with DynamicChat
├── globals.css                # Global styles with theme variables
└── demo/
    └── page.tsx               # Demo page showing all features
```

### **Hooks**
```
hooks/
├── useChat.ts                 # Chat functionality hook
├── useCustomization.ts        # Theme/font management
└── useWidgets.ts              # Widget-specific functionality
```

### **Documentation**
```
├── README.md                  # MAIN README - Getting started guide
├── components/chat/README.md  # Complete chat system guide
├── customize/README.md        # Customization overview
├── customize/themes/README.md # Theme customization guide
└── customize/fonts/README.md  # Font customization guide
```

### **Development Files**
```
├── next.config.ts             # Next.js configuration
├── tailwind.config.js         # Tailwind configuration with theme support
├── components.json            # shadcn/ui configuration
├── package.json               # Dependencies and scripts
└── SETUP.md                  # Step-by-step setup guide
```

## **OPTIONAL FILES** (Nice to Have)

### **Additional Components**
- `components/CustomizationDemo.tsx` - Live theme/font preview
- `components/CustomizationProvider.tsx` - Theme context provider
- `components/navbar.tsx` - Navigation component

### **Additional Hooks**
- `hooks/useTheme.ts` - Theme management
- `hooks/useLocalStorage.ts` - Local storage utilities

### **Additional Pages**
- `app/settings/page.tsx` - Settings page
- `app/about/page.tsx` - About page

## **STRUCTURE OVERVIEW**

```
moorcheh-chat-boilerplate/
├── bin/
│   └── index.js               # CLI tool for creating projects
├── package.json               # Main package.json for CLI tool
├── README.md                  # CLI tool documentation
└── template/                  # The actual boilerplate template
    ├── app/                   # Next.js app directory
    ├── components/            # React components
    ├── customize/             # Theme and font customization
    ├── config/                # Configuration files
    ├── hooks/                 # Custom hooks
    ├── lib/                   # Utilities
    ├── public/                # Static assets
    ├── package.json           # Template dependencies
    └── README.md              # Template documentation
```

## **PACKAGE.JSON STRUCTURE**

### **CLI Package** (`/package.json`)
```json
{
  "name": "moorcheh-chat-boilerplate",
  "version": "1.0.0",
  "bin": {
    "moorcheh-chat-boilerplate": "./bin/index.js"
  },
  "files": [
    "bin/",
    "template/",
    "README.md"
  ]
}
```

### **Template Package** (`/template/package.json`)
```json
{
  "name": "moorcheh-chat-app",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "15.x",
    "react": "19.x",
    "tailwindcss": "^3.x"
  }
}
```

## **SETUP PROCESS**

### **User Experience:**

1. **Install CLI:**
   ```bash
   npm install -g moorcheh-chat-boilerplate
   ```

2. **Create Project:**
   ```bash
   npx moorcheh-chat-boilerplate my-chat-app
   ```

3. **Navigate and Install:**
   ```bash
   cd my-chat-app
   npm install
   ```

4. **Configure API:**
   - Set `NEXT_PUBLIC_MOORCHEH_API_KEY` in `.env.local`
   - Optionally customize `config/api-config.json`

5. **Configure Chat:**
   - Edit `lib/chat-config.ts` to choose widget or interface mode
   - Customize branding, themes, fonts

6. **Start Development:**
   ```bash
   npm run dev
   ```

## **CHECKLIST FOR BOILERPLATE**

### **Essential Features**
- [ ] Dynamic chat system (widget + interface)
- [ ] Complete theme customization system
- [ ] Font customization system
- [ ] API configuration system
- [ ] Responsive design
- [ ] TypeScript support
- [ ] Create comprehensive README.md

### **Chat System**
- [ ] Widget mode with floating button
- [ ] Interface mode with full chat
- [ ] Configuration-based rendering
- [ ] File upload support
- [ ] Chat history
- [ ] Export functionality

### **Customization**
- [ ] 4+ built-in themes (light, dark, blue, green)
- [ ] Custom theme creation
- [ ] 50+ Google Fonts support
- [ ] Custom font upload
- [ ] Hot reload for customizations

### **Documentation**
- [ ] Complete setup guide
- [ ] Chat system documentation
- [ ] Theme customization guide
- [ ] Font customization guide
- [ ] API configuration guide

### **Developer Experience**
- [ ] TypeScript throughout
- [ ] ESLint configuration
- [ ] Hot reload
- [ ] Clear error messages
- [ ] Helpful comments in code

## **MAIN README.md TEMPLATE**

Create a main README.md with:

```markdown
# Your Project Name

Built with Moorcheh Chat Boilerplate - A complete Next.js chat application.

## Features

- **Dual Chat Modes**: Widget (floating) or Interface (full-page)
- **Complete Customization**: Themes, fonts, and branding
- **AI Integration**: Ready-to-use Moorcheh AI connection
- **TypeScript**: Full type safety
- **Responsive**: Mobile-first design

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Add your NEXT_PUBLIC_MOORCHEH_API_KEY
   ```

3. **Start development:**
   ```bash
   npm run dev
   ```

## Configuration

### Chat Mode
Edit `lib/chat-config.ts` to switch between widget and interface mode.

### Customization
- Themes: `customize/themes/theme-config.ts`
- Fonts: `customize/fonts/font-config.ts`
- API: `config/api-config.json`

## Documentation

- [Chat System Guide](components/chat/README.md)
- [Theme Customization](customize/README.md)
- [API Configuration](API_CONFIGURATION_GUIDE.md)

## Support

Need help? Check the documentation or open an issue.
```

## **FINAL NOTES**

**Priority Order:**
1. **Core chat functionality** (widget + interface)
2. **Configuration system** (easy switching between modes)
3. **Theme system** (light/dark + custom)
4. **Documentation** (clear setup guide)
5. **Font system** (nice to have)
6. **Advanced features** (file upload, export, etc.)

**Remember:**
- Keep it simple for users to get started
- Provide clear documentation
- Test the entire setup process
- Make customization intuitive 