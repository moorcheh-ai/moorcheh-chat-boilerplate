# Next.js Font System

This project uses **Next.js Font Optimization** (`next/font/google`) for better performance and no layout shift.

## Current Configuration

**Default Fonts:**
- **Primary/Body**: Saira (your default choice)
- **Headings**: Saira 
- **Code/Mono**: Fira Code

## How to Change Fonts

### 1. Edit `lib/fonts.ts`

Change the `fontConfig` object:

```typescript
export const fontConfig = {
  primary: inter,      // Change to any available font
  heading: poppins,    // Can be different from primary
  mono: jetbrainsMono, // For code blocks
};
```

### 2. Available Fonts

Pre-configured fonts you can use immediately:
- `saira` (current default)
- `inter`
- `roboto`
- `openSans`
- `poppins`
- `lato`
- `firaCode` (current mono default)
- `jetbrainsMono`
- `sourceCodePro`

### 3. Add New Fonts

To add a new Google Font:

```typescript
// 1. Import it
import { Your_New_Font } from "next/font/google";

// 2. Configure it
export const yourNewFont = Your_New_Font({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-your-new-font',
});

// 3. Add to availableFonts
export const availableFonts = {
  // ... existing fonts
  yourNewFont,
};
```

## Benefits of Next.js Font Optimization

✅ **Better Performance**: Fonts served from your domain  
✅ **No Layout Shift**: Proper fallback handling  
✅ **Automatic Optimization**: Better caching and compression  
✅ **Type Safety**: Full TypeScript support  
✅ **Self-Hosted**: No external requests to Google Fonts  

## CSS Variables

The fonts create these CSS variables:
- `--font-primary`: Main UI font (Saira)
- `--font-heading`: Headings font (Saira)  
- `--font-mono`: Code font (Fira Code)

Use in components:
```css
.my-element {
  font-family: var(--font-primary);
}
```

Or with Tailwind:
```tsx
<div className="font-primary">Text using primary font</div>
<h1 className="font-heading">Heading using heading font</h1>
<code className="font-mono">Code using mono font</code>
``` 