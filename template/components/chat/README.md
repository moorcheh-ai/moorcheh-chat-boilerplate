# Dynamic Chat System

This folder contains a powerful, flexible chat system that can render as either a **widget** (floating button) or **interface** (full chat interface) based on your configuration.

## Quick Start

### 1. Choose Your Chat Type

Edit `lib/chat-config.ts`:

```typescript
export const chatConfig: ChatConfig = {
  chatType: 'widget', // or 'interface'
  // ... other config
};
```

### 2. Use the Dynamic Chat Component

```tsx
import { DynamicChat } from '@/components/chat';

export default function MyPage() {
  return <DynamicChat />;
}
```

That's it! The chat will automatically render as a widget or interface based on your config.

## Folder Structure

```
chat/
├── Chat.tsx              # Basic chat component
├── index.tsx             # Exports all chat components
├── README.md             # This file
├── chat-interface/       # Full chat interface components
│   ├── ChatWindow.tsx    # Main interface component
│   ├── MessageList.tsx   # Message display
│   └── MessageInput.tsx  # Input field
└── chat-widget/          # Chat widget components
    ├── ChatWidget.tsx    # Main widget component
    └── index.tsx         # Widget exports
```

## Chat Types

### 1. Widget (`chatType: 'widget'`)

A floating chat button that expands into a chat window.

**Features:**
- Floating button in corner of screen
- Expandable chat window
- Minimize/maximize functionality
- Configurable position, size, and animations
- Perfect for websites where chat is secondary

**Configuration:**
```typescript
widget: {
  position: 'bottom-right', // 'bottom-left', 'top-right', 'top-left'
  size: 'medium',          // 'small', 'medium', 'large'
  animations: true,         // Enable/disable animations
  zIndex: 1000,            // Z-index for layering
  offset: { x: 24, y: 24 } // Distance from screen edges
}
```

### 2. Interface (`chatType: 'interface'`)

A full chat interface with optional sidebar and multiple layouts.

**Features:**
- Full-screen chat interface
- Optional chat history sidebar
- Multiple layout options (sidebar, centered, fullscreen)
- Perfect for chat-focused applications

**Configuration:**
```typescript
interface: {
  layout: 'sidebar',       // 'sidebar', 'centered', 'fullscreen'
  showSidebar: true,       // Show/hide chat history
  maxWidth: '1200px',      // Max width for centered layout
  responsive: true         // Enable responsive design
}
```

## Configuration

### Main Configuration (`lib/chat-config.ts`)

```typescript
export const chatConfig: ChatConfig = {
  // Chat Type
  chatType: 'interface', // 'widget' | 'interface'
  
  // Widget Config
  widget: { /* ... */ },
  
  // Interface Config  
  interface: { /* ... */ },
  
  // Common Config (applies to both)
  common: {
    enableFileUpload: true,
    enableExport: true,
    enableHistory: true,
    maxMessages: 100,
    api: { /* API settings */ },
    branding: { /* Your branding */ }
  }
};
```

### API Configuration

```typescript
api: {
  namespace: 'Demo-doc',
  model: 'anthropic.claude-3-7-sonnet-20250219-v1:0',
  temperature: 0.7,
  topK: 3,
  threshold: 0.7
}
```

### Branding

```typescript
branding: {
  title: 'Your AI Assistant',
  subtitle: 'How can I help you today?',
  logo: '/your-logo.png'
}
```

## Theme Integration

Both chat types automatically work with your theme system:

1. **Automatic Theme Detection**: Reads from your global theme
2. **Custom Chat Themes**: Override with chat-specific themes
3. **CSS Variables**: Uses your theme's CSS variables
4. **Responsive**: Adapts to your theme's responsive settings

```typescript
// Optional: Override theme for specific chat type
widget: {
  theme: 'dark', // Force dark theme for widget
  // ... other config
},
interface: {
  theme: 'blue', // Force blue theme for interface
  // ... other config
}
```

## Advanced Usage

### Force Specific Chat Type

```tsx
import { WidgetChat, InterfaceChat } from '@/components/chat';

// Always render as widget (ignores config)
<WidgetChat />

// Always render as interface (ignores config)
<InterfaceChat />
```

### Conditional Rendering

```tsx
import { DynamicChat, getChatType } from '@/components/chat';

export default function MyPage() {
  const chatType = getChatType();
  
  return (
    <div>
      {chatType === 'widget' ? (
        <div>Page content with widget overlay</div>
      ) : (
        <div>Chat-focused layout</div>
      )}
      <DynamicChat />
    </div>
  );
}
```

### Configuration Helpers

```tsx
import { 
  isWidget, 
  isInterface, 
  getCommonConfig,
  getWidgetConfig,
  getInterfaceConfig 
} from '@/components/chat';

// Check chat type
if (isWidget()) {
  console.log('Using widget mode');
}

// Get configurations
const common = getCommonConfig();
const widget = getWidgetConfig();
const interface = getInterfaceConfig();
```

## Responsive Design

### Widget
- Always responsive
- Adapts to screen size automatically
- Touch-friendly on mobile

### Interface
- Configurable responsive behavior
- Mobile-first design
- Adaptive sidebar (hides on mobile)

## Performance

### Lazy Loading
Components are loaded dynamically based on chat type.

### Bundle Optimization
Only the required chat type is included in your bundle.

### Memory Management
Chat history is limited by `maxMessages` config.

## Troubleshooting

### Configuration Issues

```typescript
import { validateChatConfig } from '@/components/chat';

// Check if your config is valid
const isValid = validateChatConfig();
if (!isValid) {
  console.error('Invalid chat configuration');
}
```

### Common Issues

1. **Chat not appearing**: Check `chatType` in config
2. **Styling issues**: Verify theme integration
3. **API errors**: Check API configuration and keys
4. **Widget positioning**: Adjust `position` and `offset` values

## Examples

### E-commerce Site (Widget)
```typescript
chatConfig: {
  chatType: 'widget',
  widget: {
    position: 'bottom-right',
    size: 'medium',
    animations: true
  },
  common: {
    branding: {
      title: 'Shopping Assistant',
      subtitle: 'Need help finding something?'
    }
  }
}
```

### Support Dashboard (Interface)
```typescript
chatConfig: {
  chatType: 'interface',
  interface: {
    layout: 'sidebar',
    showSidebar: true,
    responsive: true
  },
  common: {
    enableHistory: true,
    enableExport: true,
    branding: {
      title: 'Support Chat',
      subtitle: 'We\'re here to help'
    }
  }
}
```

### Documentation Site (Centered Interface)
```typescript
chatConfig: {
  chatType: 'interface',
  interface: {
    layout: 'centered',
    showSidebar: false,
    maxWidth: '800px'
  },
  common: {
    branding: {
      title: 'AI Documentation Assistant',
      subtitle: 'Ask me about our docs'
    }
  }
}
```

## Migration

### From Old Chat Component

Replace:
```tsx
import { Chat } from '@/components/ui/chat';
<Chat />
```

With:
```tsx
import { DynamicChat } from '@/components/chat';
<DynamicChat />
```

### Update Configuration

1. Create `lib/chat-config.ts`
2. Move API settings to config
3. Update branding settings
4. Choose chat type

## Support

- Check configuration with `validateChatConfig()`
- Review console errors for validation issues
- Ensure all required dependencies are installed
- Verify API keys are set correctly

## Features

**Two Chat Types**: Widget and Interface  
**Dynamic Rendering**: Based on configuration  
**Theme Integration**: Works with your theme system  
**Responsive Design**: Mobile-friendly  
**File Upload**: Optional file upload support  
**Chat History**: Persistent chat sessions  
**Export**: Save chat conversations  
**Customizable**: Extensive configuration options  
**TypeScript**: Full type safety  
**Performance**: Optimized bundle sizes  

Happy chatting! 