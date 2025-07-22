# Font Customization Guide

This folder contains all font-related customization options for your chat application.

## 📁 Files in This Folder

- `font-config.ts` - **Main configuration** - Edit this to change your active fonts
- `available-fonts.ts` - **50+ curated fonts** - Popular Google Fonts selection  
- `custom-fonts.ts` - **Your custom fonts** - Add custom font configurations here
- `google-fonts-browser.md` - **🌐 Browse 1,400+ Google Fonts** - Complete guide to finding and adding fonts
- `README.md` - This guide

## 🔤 Quick Start

### 1. Change Active Font

Edit `font-config.ts`:

```typescript
export const fontConfig = {
  primaryFont: 'Inter', // Main UI font
  headingFont: 'Inter', // Headings font (can be different)
  monoFont: 'JetBrains Mono', // Code/monospace font
  enableGoogleFonts: true, // Load fonts from Google Fonts
};
```

### 2. Add a New Google Font

**Want more fonts?** Check out `google-fonts-browser.md` for access to 1,400+ Google Fonts!

Quick add to `available-fonts.ts`:

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

## 🎯 Available Font Categories

We now include **50+ carefully curated Google Fonts** across all categories:

### **Sans-Serif Fonts (15+ fonts)**
- **Inter** - Modern, highly legible UI font
- **Roboto** - Google's signature font family
- **Open Sans** - Friendly and approachable
- **Poppins** - Geometric with rounded edges
- **Lato** - Humanist with warm characteristics
- **Montserrat** - Urban and bold
- **Work Sans** - Optimized for work environments
- **Plus many more...**

### **Serif Fonts (8+ fonts)**  
- **Merriweather** - Designed for screen reading
- **Playfair Display** - High-contrast display serif
- **Lora** - Well-balanced contemporary serif
- **PT Serif** - Transitional with humanist features
- **Crimson Text** - Inspired by old-style typefaces
- **And more classic serifs...**

### **Monospace Fonts (6+ fonts)**
- **JetBrains Mono** - Coding font with ligatures ⭐
- **Fira Code** - Programming ligatures ⭐
- **Source Code Pro** - Adobe's monospace
- **IBM Plex Mono** - Corporate monospace
- **Roboto Mono** - Consistent with Roboto
- **Space Mono** - Original fixed-width

### **Display Fonts (4+ fonts)**
- **Space Grotesk** - Modern geometric display
- **Oswald** - Bold gothic revival
- **Raleway** - Elegant sans-serif
- **Bebas Neue** - All-caps display font

### **Handwriting Fonts (3+ fonts)**
- **Dancing Script** - Lively casual script
- **Great Vibes** - Elegant connecting script
- **Pacifico** - Friendly brush script

### **🌐 Want Even More?**
Check `google-fonts-browser.md` to access all **1,400+ Google Fonts**!

## 🔧 Font Configuration Options

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
- **300** - Light
- **400** - Regular (normal)
- **500** - Medium  
- **600** - Semi-bold
- **700** - Bold
- **800** - Extra-bold
- **900** - Black

## 🌐 Google Fonts Integration

### Automatic Loading

When `enableGoogleFonts: true`, fonts are automatically loaded from Google Fonts CDN:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Performance Optimization

- **Preconnect**: Establishes early connection to Google Fonts
- **Font-display: swap**: Shows fallback font immediately, swaps when loaded
- **Subset loading**: Only loads required character sets
- **Weight optimization**: Only loads specified font weights

## 🎨 CSS Variables

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

## 🔧 Advanced Customization

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

## 🎯 Font Pairing Examples

### Modern & Clean
```typescript
primaryFont: 'Inter',
headingFont: 'Inter', 
monoFont: 'JetBrains Mono',
```

### Editorial Style
```typescript
primaryFont: 'Lora',
headingFont: 'Playfair Display',
monoFont: 'Source Code Pro',
```

### Friendly & Approachable
```typescript
primaryFont: 'Open Sans',
headingFont: 'Poppins',
monoFont: 'Fira Code',
```

### Technical & Professional
```typescript
primaryFont: 'Roboto',
headingFont: 'Roboto',
monoFont: 'JetBrains Mono',
```

## 🚀 Best Practices

1. **Limit Font Variations**: Use 2-3 fonts maximum
2. **Optimize Loading**: Only load required weights and subsets
3. **Test Readability**: Ensure good contrast and legibility
4. **Consider Performance**: Each font adds to page load time
5. **Fallback Fonts**: Always provide system font fallbacks
6. **Accessibility**: Ensure fonts work well for all users

## 🔄 Hot Reload

Font changes are automatically applied during development. For production, fonts are optimized and cached for better performance.

## 🐛 Troubleshooting

- **Font not loading**: Check Google Fonts name spelling
- **Performance issues**: Reduce number of font weights
- **CORS errors**: Verify font file URLs are accessible
- **Layout shifts**: Use proper font-display values
- **Mobile issues**: Test font sizes on various screen sizes

## 📱 Mobile Considerations

- Use larger font sizes for better readability
- Ensure touch targets are appropriately sized
- Test on various devices and screen densities
- Consider system font preferences

Happy font customization! ✨ 