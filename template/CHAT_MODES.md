# 💬 Chat Modes Configuration

Your chat application supports two distinct modes that can be easily switched by editing the configuration.

## 🔧 How to Switch Modes

Edit `lib/chat-config.ts` and change the `chatType`:

```typescript
export const chatConfig: ChatConfig = {
  // Change this line to switch modes:
  chatType: 'widget', // Options: 'widget' | 'interface'
  // ...
};
```

## 🎯 Widget Mode (`chatType: 'widget'`)

**Perfect for:** Customer support, help desk, embedded chat on websites

**Features:**
- ✅ **Positioned in corner** (bottom-right, bottom-left, top-right, top-left)
- ✅ **Floating toggle button** - Click to open/close
- ✅ **Minimizable** - Collapse without closing
- ✅ **Compact design** - Doesn't interfere with main content
- ✅ **Configurable size** - small, medium, large
- ✅ **Custom positioning** - Pixel-perfect offset control

### Widget Configuration:
```typescript
widget: {
  position: 'bottom-right',    // Corner position
  size: 'medium',              // small | medium | large
  animations: true,            // Enable/disable animations
  zIndex: 1000,               // Layer priority
  offset: {
    x: 24,                     // Distance from edge (px)
    y: 24,                     // Distance from edge (px)
  },
},
```

## 🖥️ Interface Mode (`chatType: 'interface'`)

**Perfect for:** Main chat applications, dedicated chat pages, full-featured interfaces

**Features:**
- ✅ **Full-screen layout** - Takes up main content area
- ✅ **Chat history sidebar** - Browse previous conversations
- ✅ **Multiple layout options** - sidebar, centered, fullscreen
- ✅ **Export functionality** - Save conversations
- ✅ **Responsive design** - Adapts to screen size
- ✅ **Professional appearance** - Clean, modern interface

### Interface Configuration:
```typescript
interface: {
  layout: 'sidebar',           // sidebar | centered | fullscreen
  showSidebar: true,           // Show/hide chat history
  maxWidth: '1200px',          // Max width for centered layout
  responsive: true,            // Enable responsive design
},
```

## 🎨 Current Behavior

### Widget Mode:
- Chat appears as a **floating button in the corner**
- Click the button to open the chat window
- Chat window appears above the button
- Main page content remains fully visible
- Perfect for non-intrusive assistance

### Interface Mode:
- Chat takes up the **main content area**
- Full-featured interface with sidebar
- Replaces the main page content
- Perfect for dedicated chat applications

## 🚀 Quick Test

1. **Try Widget Mode:**
   ```typescript
   chatType: 'widget',
   ```
   → Look for floating button in bottom-right corner

2. **Try Interface Mode:**
   ```typescript
   chatType: 'interface',
   ```
   → Full chat interface replaces main content

## 🎯 Widget Positioning Options

```typescript
// Bottom-right corner (default)
position: 'bottom-right',

// Bottom-left corner  
position: 'bottom-left',

// Top-right corner
position: 'top-right',

// Top-left corner
position: 'top-left',
```

## 📱 Responsive Behavior

- **Widget:** Always responsive, adapts to mobile screens
- **Interface:** Configurable responsive design

Both modes are fully theme-aware and will adapt to your chosen theme automatically! 