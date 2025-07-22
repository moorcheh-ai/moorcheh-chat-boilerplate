# 🚀 Moorcheh Chat Boilerplate - Repository Contents

This document outlines what should be included in your boilerplate repository for users to get started quickly.

## 📦 **ESSENTIAL FILES** (Must Include)

### 🎯 **Core Configuration**
```
lib/
├── chat-config.ts              # 🔥 MAIN CONFIG - Users configure chat type here
├── answer.ts                   # API integration with Moorcheh
├── utils.ts                    # Utility functions
└── themes.ts                   # Theme utilities
```

### 🚀 **Dynamic Chat System**
```
components/
├── DynamicChat.tsx             # 🔥 MAIN COMPONENT - Auto-renders based on config
├── chat/
│   ├── Chat.tsx               # Basic chat component
│   ├── index.tsx              # Exports all chat components
│   └── README.md              # 📖 Complete usage guide
├── chat-interface/            # Full chat interface
│   ├── ChatWindow.tsx         # Main interface component
│   ├── MessageList.tsx        # Message display
│   ├── MessageInput.tsx       # Input field
│   └── FileUploader.tsx       # File upload functionality
└── chat-widget/               # Floating widget
    ├── ChatWidget.tsx         # Main widget component
    └── index.tsx              # Widget exports
```

### 🎨 **UI Components** (Keep Essential Only)
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

### 🎨 **Theme System**
```
customize/
├── README.md                  # Theme customization guide
├── themes/
│   ├── theme-config.ts        # Main theme configuration
│   ├── available-themes.ts    # Pre-built themes
│   ├── custom-themes.ts       # User custom themes
│   └── README.md              # Theme-specific guide
└── fonts/
    ├── font-config.ts         # Font configuration
    ├── available-fonts.ts     # Available fonts
    ├── custom-fonts.ts        # Custom fonts
    └── README.md              # Font guide
```

### 🔗 **Customization System**
```
components/
├── CustomizationProvider.tsx  # Theme/font provider
├── CustomizationInitializer.tsx # Auto-applies customizations
└── CustomizationDemo.tsx      # Shows theme/font examples
```

### 🪝 **Essential Hooks**
```
hooks/
├── useChat.ts                 # Chat functionality
├── useCustomization.ts        # Theme/font management
└── useWidgets.ts              # Widget management (if needed)
```

### 📱 **App Structure**
```
app/
├── layout.tsx                 # Root layout with providers
├── page.tsx                   # Homepage with DynamicChat
├── chat/
│   └── page.tsx              # Dedicated chat page
└── globals.css               # Global styles with CSS variables
```

### ⚙️ **Configuration Files**
```
├── package.json               # Dependencies and scripts
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind configuration
├── components.json           # shadcn/ui configuration
└── postcss.config.mjs        # PostCSS configuration
```

## 📚 **DOCUMENTATION** (Must Include)

### 📖 **User Documentation**
```
├── README.md                  # 🔥 MAIN README - Getting started guide
├── components/chat/README.md  # Complete chat system guide
├── customize/README.md        # Customization overview
├── customize/themes/README.md # Theme customization guide
└── customize/fonts/README.md  # Font customization guide
```

### 🎯 **Quick Start Files**
```
├── .env.example              # Environment variables template
└── SETUP.md                  # Step-by-step setup guide
```

## 🔧 **DEPENDENCIES** (Auto-installed)

### 📦 **Essential Dependencies**
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^3.0.0",
    "lucide-react": "^0.400.0",
    "date-fns": "^3.0.0",
    "react-markdown": "^9.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

## 🚫 **EXCLUDE FROM BOILERPLATE**

### ❌ **Development Files**
```
❌ node_modules/
❌ .next/
❌ .git/
❌ dist/
❌ build/
```

### ❌ **User-Specific Files**
```
❌ .env.local
❌ .env
❌ *.log
❌ .DS_Store
❌ Thumbs.db
```

### ❌ **Unnecessary UI Components**
```
❌ components/ui/accordion.tsx      # Remove if not needed
❌ components/ui/alert-dialog.tsx   # Remove if not needed
❌ components/ui/breadcrumb.tsx     # Remove if not needed
❌ components/ui/carousel.tsx       # Remove if not needed
❌ components/ui/chart.tsx          # Remove if not needed
❌ components/ui/command.tsx        # Remove if not needed
❌ components/ui/drawer.tsx         # Remove if not needed
❌ components/ui/form.tsx           # Remove if not needed
❌ components/ui/hover-card.tsx     # Remove if not needed
❌ components/ui/kanban.tsx         # Remove if not needed
❌ components/ui/menubar.tsx        # Remove if not needed
❌ components/ui/navigation-menu.tsx # Remove if not needed
❌ components/ui/pagination.tsx     # Remove if not needed
❌ components/ui/popover.tsx        # Remove if not needed
❌ components/ui/resizable.tsx      # Remove if not needed
❌ components/ui/sidebar.tsx        # Remove if not needed
❌ components/ui/slider.tsx         # Remove if not needed
❌ components/ui/table.tsx          # Remove if not needed
❌ components/ui/tabs.tsx           # Remove if not needed
```

## 📋 **BOILERPLATE SETUP CHECKLIST**

### ✅ **Pre-Package Checklist**
- [ ] All essential files included
- [ ] Remove unused UI components
- [ ] Set default configuration in `chat-config.ts`
- [ ] Create comprehensive README.md
- [ ] Include .env.example with required variables
- [ ] Test both widget and interface modes
- [ ] Verify theme system works
- [ ] Check all TypeScript types
- [ ] Remove development-specific code
- [ ] Clean up console.logs and comments

### ✅ **Default Configuration Settings**
```typescript
// In lib/chat-config.ts - Set sensible defaults
export const chatConfig: ChatConfig = {
  chatType: 'interface', // Start with interface as default
  
  widget: {
    position: 'bottom-right',
    size: 'medium',
    animations: true,
    zIndex: 1000,
    offset: { x: 24, y: 24 },
  },
  
  interface: {
    layout: 'sidebar',
    showSidebar: true,
    maxWidth: '1200px',
    responsive: true,
  },
  
  common: {
    enableFileUpload: true,
    enableExport: true,
    enableHistory: true,
    maxMessages: 100,
    api: {
      namespace: 'Demo-doc', // User will change this
      model: 'anthropic.claude-3-7-sonnet-20250219-v1:0',
      temperature: 0.7,
      topK: 3,
      threshold: 0.7,
    },
    branding: {
      title: 'AI Assistant', // Generic default
      subtitle: 'How can I help you today?',
      logo: '/logo.png', // User will replace
    },
  },
};
```

## 🎯 **MAIN README.md TEMPLATE**

Create a main README.md with:

```markdown
# 🚀 Moorcheh Chat Boilerplate

A production-ready Next.js chat application with AI integration.

## ⚡ Quick Start

1. **Clone & Install**
   ```bash
   git clone [your-repo]
   cd [project-name]
   npm install
   ```

2. **Configure API**
   ```bash
   cp .env.example .env.local
   # Add your NEXT_PUBLIC_MOORCHEH_API_KEY
   ```

3. **Choose Chat Type**
   Edit `lib/chat-config.ts`:
   ```typescript
   export const chatConfig = {
     chatType: 'widget', // or 'interface'
     // ...
   };
   ```

4. **Run**
   ```bash
   npm run dev
   ```

## 🎨 Features
- ✅ Widget & Interface modes
- ✅ Theme system with 4+ themes
- ✅ Font customization
- ✅ TypeScript ready
- ✅ Mobile responsive
- ✅ File upload support
- ✅ Chat history
- ✅ Export conversations

## 📖 Documentation
- [Chat System Guide](components/chat/README.md)
- [Theme Customization](customize/README.md)
- [Configuration Options](lib/chat-config.ts)
```

## 🔥 **Key Success Factors**

1. **🎯 Single Configuration File**: `lib/chat-config.ts` is the main entry point
2. **📖 Comprehensive Documentation**: Multiple README files for different aspects
3. **🚀 Immediate Usability**: Works out of the box with sensible defaults
4. **🎨 Easy Customization**: Clear configuration options
5. **💪 Production Ready**: All error handling and TypeScript types included
6. **📱 Responsive**: Mobile-first design
7. **🎨 Theme Integration**: Seamless theme system

This structure ensures users can:
- **Get started in 5 minutes** ⚡
- **Switch chat types with 1 line** 🔄
- **Customize everything easily** 🎨
- **Deploy to production immediately** 🚀 