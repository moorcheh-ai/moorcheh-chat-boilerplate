# Google Fonts Browser Guide

## 🌐 Browse All Google Fonts

Visit **[Google Fonts](https://fonts.google.com)** to explore 1,400+ font families!

## 🔍 How to Find and Add New Fonts

### 1. **Browse by Category**
- **[Sans Serif](https://fonts.google.com/?category=Sans+Serif)** - Clean, modern fonts
- **[Serif](https://fonts.google.com/?category=Serif)** - Traditional, readable fonts  
- **[Display](https://fonts.google.com/?category=Display)** - Bold, decorative fonts
- **[Handwriting](https://fonts.google.com/?category=Handwriting)** - Script and cursive fonts
- **[Monospace](https://fonts.google.com/?category=Monospace)** - Fixed-width fonts for code

### 2. **Popular Searches**
- **[Most Popular](https://fonts.google.com/?sort=popularity)** - Top trending fonts
- **[Newest](https://fonts.google.com/?sort=date)** - Recently added fonts
- **[Trending](https://fonts.google.com/?sort=trending)** - Currently trending fonts

### 3. **Filter by Properties**
- **Language Support** - Find fonts for your language
- **Font Thickness** - Thin to Extra Bold
- **Font Width** - Condensed to Extended
- **Font Slant** - Normal to Italic

## ➕ How to Add a New Google Font

### Step 1: Find Your Font
1. Go to [Google Fonts](https://fonts.google.com)
2. Browse or search for the font you want
3. Click on the font to see details

### Step 2: Get Font Information
From the Google Fonts page, note:
- **Font Name** (e.g., "Roboto Slab")
- **Available Weights** (e.g., 300, 400, 700)
- **URL Name** (from the URL, e.g., "Roboto+Slab")

### Step 3: Add to Available Fonts
Edit `customize/fonts/available-fonts.ts` and add:

```typescript
'Your Font Name': {
  name: 'Your Font Name',
  googleFontsName: 'Your+Font+Name', // From Google Fonts URL
  weights: [400, 700], // Available weights
  category: 'sans-serif', // or 'serif', 'display', 'handwriting', 'monospace'
  fallback: 'system-ui, sans-serif', // Appropriate fallback
  display: 'swap',
  subsets: ['latin'],
  description: 'Brief description of the font',
  designer: 'Font Designer Name',
  popularity: 3, // Rate 1-5
},
```

### Step 4: Use Your New Font
Edit `customize/fonts/font-config.ts`:

```typescript
export const fontConfig = {
  primaryFont: 'Your Font Name', // Your new font
  headingFont: 'Your Font Name',
  monoFont: 'JetBrains Mono',
  // ... rest of config
};
```

## 🎯 Recommended Fonts by Use Case

### **For Body Text (Primary Font)**
- **Inter** - Modern UI design
- **Open Sans** - Friendly and readable
- **Roboto** - Clean and professional
- **Lato** - Humanist and warm
- **Source Sans Pro** - Technical documentation

### **For Headings**
- **Poppins** - Modern and geometric
- **Montserrat** - Urban and bold
- **Playfair Display** - Elegant serif
- **Oswald** - Strong and impactful
- **Space Grotesk** - Unique and modern

### **For Code (Monospace)**
- **JetBrains Mono** - With programming ligatures
- **Fira Code** - Popular with developers
- **Source Code Pro** - Adobe's monospace
- **IBM Plex Mono** - Corporate and clean
- **Roboto Mono** - Consistent with Roboto

### **For Special Occasions**
- **Dancing Script** - Handwritten feel
- **Great Vibes** - Elegant script
- **Bebas Neue** - Bold display font
- **Pacifico** - Casual and friendly

## 🚀 Quick Font Combinations

### Modern & Professional
```typescript
primaryFont: 'Inter',
headingFont: 'Inter',
monoFont: 'JetBrains Mono',
```

### Creative & Unique
```typescript
primaryFont: 'Work Sans',
headingFont: 'Space Grotesk', 
monoFont: 'IBM Plex Mono',
```

### Editorial & Readable
```typescript
primaryFont: 'Merriweather',
headingFont: 'Playfair Display',
monoFont: 'Source Code Pro',
```

### Tech & Clean
```typescript
primaryFont: 'Roboto',
headingFont: 'Roboto',
monoFont: 'Roboto Mono',
```

## 🔧 Advanced Tips

### **Font Loading Performance**
- Limit to 2-3 font families maximum
- Only load weights you actually use
- Use `font-display: swap` for better performance
- Preload critical fonts

### **Language Support**
Check if fonts support your target languages:
- **Latin Extended** - European languages
- **Cyrillic** - Russian, Bulgarian, etc.
- **Greek** - Greek language
- **Arabic** - Arabic script
- **And many more...**

### **Font Pairing Rules**
1. **Contrast is key** - Pair serif with sans-serif
2. **Similar mood** - Match the personality
3. **Different roles** - Use different fonts for headings vs body
4. **Test together** - Always preview combinations

## 📱 Mobile Considerations
- Test fonts on small screens
- Ensure readability at different sizes
- Consider system font preferences
- Check loading speed on mobile networks

## 🎨 Custom CSS Variables

After adding fonts, they're available as CSS variables:
```css
.my-element {
  font-family: var(--font-primary);   /* Your primary font */
  font-family: var(--font-heading);   /* Your heading font */
  font-family: var(--font-mono);      /* Your monospace font */
}
```

## 🔗 Useful Resources

- **[Google Fonts](https://fonts.google.com)** - Browse all fonts
- **[Font Pair](https://fontpair.co)** - Font combination inspiration
- **[Type Scale](https://type-scale.com)** - Typography scale generator
- **[Google Fonts Helper](https://google-webfonts-helper.herokuapp.com)** - Self-hosting tool

---

**Happy font hunting!** 🎉 With 1,400+ Google Fonts available, you'll find the perfect typography for your project. 