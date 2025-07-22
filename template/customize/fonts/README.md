# Font Customization Guide

This folder contains all font-related customization options for your chat application.

## Files in This Folder

- `font-config.ts` - Main configuration - Edit this to change your active fonts
- `available-fonts.ts` - 50+ curated fonts - Popular Google Fonts selection  
- `custom-fonts.ts` - Your custom fonts - Add custom font configurations here
- `google-fonts-browser.md` - Browse 1,400+ Google Fonts - Complete guide to finding and adding fonts
- `README.md` - This guide

##  Two Font Loading Approaches

This project supports **both** Next.js optimized fonts and dynamic font loading:

### 1. **Next.js Optimized Fonts** (Recommended for Performance)

**Best for:** Static font choices that don't change at runtime

```typescript
import { Inter, Saira } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const saira = Saira({
  subsets: ['latin'],
  display: 'swap', 
  variable: '--font-saira',
});
```

**Benefits:**
-  Automatic font optimization
-  Zero layout shift
-  Preloading support
-  Better Core Web Vitals
-  Self-hosted by Next.js

### 2. **Dynamic Font Loading** (Current System)

**Best for:** Runtime font switching and customization

```typescript
// Fonts loaded dynamically from Google Fonts
export const fontConfig = {
  primaryFont: 'Saira', // Can be changed at runtime
  headingFont: 'Roboto',
  monoFont: 'Fira Code',
  enableGoogleFonts: true, // Loads from Google Fonts CDN
};
```

**Benefits:**
- Runtime font switching
- User customization
- Smaller initial bundle
- Easy to add new fonts

## Hybrid Approach (Best of Both Worlds)

Our current implementation uses **both approaches**:

1. **Next.js fonts** for optimal performance of configured fonts
2. **Dynamic loading** for runtime customization

```typescript
// In lib/fonts.ts - Next.js optimized fonts
export const nextFontMap = {
  'Inter': inter,
  'Saira': saira,
  'Roboto': roboto,
  // ... 30+ pre-optimized fonts
} as const;

// Dynamic switching based on font-config.ts
export function getFontClasses() {
  const primaryFont = nextFontMap[fontConfig.primaryFont];
  const monoFont = nextFontMap[fontConfig.monoFont];
  
  return `${primaryFont?.variable} ${monoFont?.variable}`;
}
```

## Quick Start

### 1. Change Active Font

Edit `font-config.ts`:

```typescript
export const fontConfig = {
  primaryFont: 'Inter', // Main UI font (Next.js optimized)
  headingFont: 'Roboto', // Headings font (Next.js optimized)
  monoFont: 'Fira Code', // Code/monospace font (Next.js optimized)
  enableGoogleFonts: true, // Fallback to Google Fonts CDN
};
```

### 2. Add a New Next.js Optimized Font

Want to add a new font with Next.js optimization?

**Step 1:** Add the import in `lib/fonts.ts`:

```typescript
import { Your_New_Font } from "next/font/google";

export const yourNewFont = Your_New_Font({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-your-new-font',
});
```

**Step 2:** Add to the font map:

```typescript
export const nextFontMap = {
  // ... existing fonts
  'Your New Font': yourNewFont,
} as const;
```

**Step 3:** Update `available-fonts.ts` (for metadata):

```typescript
export const availableFonts = {
  // ... existing fonts
  'Your New Font': {
    name: 'Your New Font',
    googleFontsName: 'Your+New+Font',
    weights: [400, 700],
    category: 'sans-serif',
    fallback: 'system-ui, sans-serif',
    popularity: 4,
  },
};
```

### 3. Add a Dynamic-Only Font

For fonts not pre-optimized with Next.js:

```typescript
// In available-fonts.ts
export const availableFonts = {
  // ... existing fonts
  'Your Dynamic Font': {
    name: 'Your Dynamic Font',
    googleFontsName: 'Your+Dynamic+Font',
    weights: [400, 700],
    category: 'sans-serif',
    fallback: 'system-ui, sans-serif',
    popularity: 4,
  },
};
```

The system will automatically fall back to Google Fonts CDN loading for fonts not in the Next.js map.

## Available Font Categories

We include 30+ **Next.js optimized** fonts plus 50+ **dynamic fonts**:

### Sans-Serif Fonts (15+ fonts)
- **Saira** - Modern geometric sans-serif with excellent readability (DEFAULT)
- **Inter** - Modern, highly legible UI font **Next.js Optimized**
- **Roboto** - Google's signature font family **Next.js Optimized**
- **Open Sans** - Friendly and approachable **Next.js Optimized**
- **Poppins** - Geometric with rounded edges **Next.js Optimized**
- **Lato** - Humanist with warm characteristics **Next.js Optimized**
- **Montserrat** - Urban and bold **Next.js Optimized**
- **Work Sans** - Optimized for work environments **Next.js Optimized**
- Plus many more...

### Serif Fonts (8+ fonts)  
- **Merriweather** - Designed for screen reading **Next.js Optimized**
- **Playfair Display** - High-contrast display serif **Next.js Optimized**
- **Lora** - Well-balanced contemporary serif **Next.js Optimized**
- **PT Serif** - Transitional with humanist features **Next.js Optimized**
- **Crimson Text** - Inspired by old-style typefaces **Next.js Optimized**
- And more classic serifs...

### Monospace Fonts (6+ fonts)
- **Fira Code** - Programming ligatures (DEFAULT) **Next.js Optimized**
- **JetBrains Mono** - Coding font with ligatures **Next.js Optimized**
- **Source Code Pro** - Adobe's monospace **Next.js Optimized**
- **IBM Plex Mono** - Corporate monospace **Next.js Optimized**
- **Roboto Mono** - Consistent with Roboto **Next.js Optimized**
- **Space Mono** - Original fixed-width **Next.js Optimized**

### Display Fonts (4+ fonts)
- **Space Grotesk** - Modern geometric display **Next.js Optimized**
- **Oswald** - Bold gothic revival **Next.js Optimized**
- **Raleway** - Elegant sans-serif **Next.js Optimized**
- **Bebas Neue** - All-caps display font **Next.js Optimized**

### Handwriting Fonts (3+ fonts)
- **Dancing Script** - Lively casual script **Next.js Optimized**
- **Great Vibes** - Elegant connecting script **Next.js Optimized**
- **Pacifico** - Friendly brush script **Next.js Optimized**

### Want Even More?
Check `google-fonts-browser.md` to access all 1,400+ Google Fonts.

## Font Configuration Options

### Font Properties

Each font configuration includes:

```typescript
{
  name: 'Inter',                    // Display name
  googleFontsName: 'Inter',         // Google Fonts API name
  weights: [400, 500, 600, 700],    // Available font weights
  category: 'sans-serif',           // Font category
  fallback: 'system-ui, sans-serif', // Fallback fonts
  preload: true,                    // Preload for performance
  display: 'swap',                  // Font display strategy
  subsets: ['latin', 'latin-ext'],  // Character subsets
}
```

### Font Weights
- 300 - Light
- 400 - Regular (normal)
- 500 - Medium  
- 600 - Semi-bold
- 700 - Bold
- 800 - Extra-bold
- 900 - Black

## Google Fonts Integration

### Next.js Optimized Loading (Automatic)

When fonts are in the `nextFontMap`, they're automatically optimized:

```html
<!-- Next.js generates optimized font loading -->
<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous">
```

### Dynamic Loading (Fallback)

When `enableGoogleFonts: true` and font not in Next.js map:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Performance Optimization

- **Next.js fonts**: Zero layout shift, automatic preloading
- **Dynamic fonts**: Preconnect, font-display: swap, subset loading
- **Hybrid approach**: Best performance for configured fonts, flexibility for others

## CSS Variables

Fonts are applied using CSS variables:

```css
:root {
  --font-primary: 'Inter', system-ui, sans-serif;
  --font-heading: 'Inter', system-ui, sans-serif;  
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}
```

### Using Fonts in Components

```typescript
// Tailwind CSS classes
className="font-primary text-base"     // Primary font
className="font-heading text-2xl"     // Heading font  
className="font-mono text-sm"         // Monospace font

// Or CSS variables
style={{ fontFamily: 'var(--font-primary)' }}
```

## Advanced Customization

### Custom Font Files

For custom font files (not from Google Fonts):

```typescript
// In custom-fonts.ts
export const customFonts = {
  'MyCustomFont': {
    name: 'MyCustomFont',
    fontFiles: [
      { weight: 400, style: 'normal', url: '/fonts/MyCustomFont-Regular.woff2' },
      { weight: 700, style: 'normal', url: '/fonts/MyCustomFont-Bold.woff2' },
    ],
    category: 'sans-serif',
    fallback: 'Arial, sans-serif',
  },
};
```

### Font Loading Strategy

```typescript
export const fontLoadingConfig = {
  // Preload critical fonts
  preloadFonts: ['Inter-400', 'Inter-600'],
  
  // Font display strategy
  fontDisplay: 'swap', // 'auto', 'block', 'swap', 'fallback', 'optional'
  
  // Timeout for font loading
  fontTimeout: 3000, // milliseconds
  
  // Enable font optimization
  enableOptimization: true,
};
```

### Responsive Typography

```typescript
export const responsiveTypography = {
  // Base font size scaling
  baseSize: {
    mobile: '14px',
    tablet: '15px', 
    desktop: '16px',
  },
  
  // Heading scale ratios
  scaleRatio: {
    mobile: 1.2,
    tablet: 1.25,
    desktop: 1.3,
  },
  
  // Line height adjustments
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};
```

## Font Pairing Examples

### Current Default (Next.js Optimized)
```typescript
primaryFont: 'Saira',      // Next.js Optimized
headingFont: 'Saira',      // Next.js Optimized
monoFont: 'Fira Code',     // Next.js Optimized
```

### Modern & Clean (Next.js Optimized)
```typescript
primaryFont: 'Inter',         // Next.js Optimized
headingFont: 'Inter',         // Next.js Optimized
monoFont: 'JetBrains Mono',   // Next.js Optimized
```

### Editorial Style (Next.js Optimized)
```typescript
primaryFont: 'Lora',             // Next.js Optimized
headingFont: 'Playfair Display', // Next.js Optimized
monoFont: 'Source Code Pro',     // Next.js Optimized
```

### Friendly & Approachable (Next.js Optimized)
```typescript
primaryFont: 'Open Sans',     // Next.js Optimized
headingFont: 'Poppins',       // Next.js Optimized
monoFont: 'Fira Code',        // Next.js Optimized
```

### Technical & Professional (Next.js Optimized)
```typescript
primaryFont: 'Roboto',        // Next.js Optimized
headingFont: 'Roboto',        // Next.js Optimized
monoFont: 'JetBrains Mono',   // Next.js Optimized
```

## Best Practices

### Performance
1. **Use Next.js optimized fonts** for better performance
2. **Limit Font Variations**: Use 2-3 fonts maximum
3. **Optimize Loading**: Only load required weights and subsets
4. **Fallback Fonts**: Always provide system font fallbacks

### Development
1. **Test Readability**: Ensure good contrast and legibility
2. **Consider Performance**: Each font adds to page load time
3. **Accessibility**: Ensure fonts work well for all users
4. **Mobile**: Test font sizes on various screen sizes

### Adding New Fonts
1. **First choice**: Add to Next.js optimized fonts in `lib/fonts.ts`
2. **Second choice**: Add to dynamic fonts in `available-fonts.ts`
3. **Custom fonts**: Use `custom-fonts.ts` for self-hosted fonts

## Hot Reload

Font changes are automatically applied during development. For production, Next.js optimized fonts are pre-built and cached for better performance.

## Troubleshooting

### Next.js Font Issues
- **Import error**: Check font name spelling in `next/font/google`
- **Variable not working**: Ensure font variable is added to `getFontClasses()`
- **Font not loading**: Check if font is in `nextFontMap`

### Dynamic Font Issues
- **Font not loading**: Check Google Fonts name spelling
- **Performance issues**: Reduce number of font weights
- **CORS errors**: Verify font file URLs are accessible
- **Layout shifts**: Use proper font-display values

### General Issues
- **Mobile issues**: Test font sizes on various screen sizes
- **Accessibility**: Ensure sufficient contrast ratios
- **Loading slow**: Use Next.js optimized fonts for better performance

## Migration Guide

### From Dynamic-Only to Hybrid

1. Keep your existing `font-config.ts` settings
2. Fonts in `nextFontMap` will be automatically optimized
3. Other fonts will fall back to dynamic loading
4. No breaking changes required

### Adding Next.js Optimization

```typescript
// Before (dynamic only)
primaryFont: 'MyFont', // Loads from Google Fonts CDN

// After (Next.js optimized)
// 1. Add to lib/fonts.ts
import { My_Font } from "next/font/google";
export const myFont = My_Font({...});

// 2. Add to nextFontMap
'MyFont': myFont,

// 3. Keep same font-config.ts
primaryFont: 'MyFont', // Now Next.js optimized!
```

## Summary

**Recommended Approach**: Use the hybrid system
- Configure fonts in `font-config.ts`
- Popular fonts get Next.js optimization automatically
- Unlimited fonts available via dynamic loading
- Best performance + maximum flexibility

**Your question**: Yes, `import { Inter, Saira } from "next/font/google"` is the correct Next.js way, and our system now supports both approaches! 