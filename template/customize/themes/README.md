# Theme Customization Guide

This folder contains all theme-related customization options for your chat application.

## Files in This Folder

- `theme-config.ts` - **Main configuration** - Edit this to change your active theme
- `available-themes.ts` - **All available themes** - View and add new themes here
- `custom-themes.ts` - **Your custom themes** - Add your own theme variations here
- `README.md` - This guide

## Quick Start

### 1. Change Active Theme

Edit `theme-config.ts`:

```typescript
export const themeConfig = {
  defaultTheme: 'light', // Change to: 'dark', 'blue', 'green', or your custom theme
  enableSystemTheme: true, // Auto-detect system preference
  enableThemeToggle: true, // Show theme switcher in UI
};
```

### 2. Create a Custom Theme

Add to `custom-themes.ts`:

```typescript
export const customThemes = {
  purple: {
    '--background': 'oklch(0.98 0.02 300)',
    '--foreground': 'oklch(0.2 0.1 300)',
    '--primary': 'oklch(0.55 0.15 300)',
    // ... add all required variables
  },
};
```

## Available Themes

- **light** - Clean light theme
- **dark** - Elegant dark theme  
- **blue** - Ocean-inspired blue theme
- **green** - Nature-inspired green theme

## Theme Variables

Each theme must include these CSS variables:

### Core Colors
- `--background` - Main background color
- `--foreground` - Main text color
- `--primary` - Primary brand color
- `--primary-foreground` - Text on primary color

### Component Colors
- `--card` / `--card-foreground` - Card backgrounds and text
- `--popover` / `--popover-foreground` - Popover backgrounds and text
- `--secondary` / `--secondary-foreground` - Secondary elements
- `--muted` / `--muted-foreground` - Muted/disabled elements
- `--accent` / `--accent-foreground` - Accent elements

### Interactive Elements
- `--border` - Border colors
- `--input` - Input field borders
- `--ring` - Focus ring colors
- `--destructive` - Error/danger colors

### Charts & Data
- `--chart-1` through `--chart-5` - Chart color palette

### Sidebar (if using sidebar layout)
- `--sidebar` / `--sidebar-foreground`
- `--sidebar-primary` / `--sidebar-primary-foreground`
- `--sidebar-accent` / `--sidebar-accent-foreground`
- `--sidebar-border` / `--sidebar-ring`

## Color Format

Use **OKLCH** format for consistent colors:

```typescript
// OKLCH format: oklch(lightness chroma hue)
'--primary': 'oklch(0.55 0.18 240.53)', // Blue
'--primary': 'oklch(0.55 0.15 142.5)',  // Green
```

### OKLCH Benefits:
- **Consistent lightness** across hues
- **Better color mixing**
- **Perceptually uniform**

## Advanced Customization

### Theme-Specific Overrides

You can override specific components for certain themes:

```typescript
export const themeOverrides = {
  dark: {
    // Dark theme specific overrides
    '--special-component': 'oklch(0.3 0.1 240)',
  },
  blue: {
    // Blue theme specific overrides
    '--special-component': 'oklch(0.7 0.15 240)',
  },
};
```

### Dynamic Theme Properties

Add computed properties:

```typescript
export const dynamicProperties = {
  // Auto-generate hover states
  generateHoverStates: true,
  // Auto-generate disabled states  
  generateDisabledStates: true,
  // Custom opacity levels
  opacityLevels: {
    subtle: 0.1,
    muted: 0.3,
    emphasis: 0.9,
  },
};
```

## Responsive Themes

Create responsive theme variations:

```typescript
export const responsiveThemes = {
  mobile: {
    // Mobile-specific theme adjustments
    '--sidebar-width': '280px',
    '--content-padding': '1rem',
  },
  desktop: {
    // Desktop-specific theme adjustments
    '--sidebar-width': '320px',
    '--content-padding': '2rem',
  },
};
```

## Best Practices

1. **Test Accessibility**: Ensure good contrast ratios
2. **Use OKLCH**: For consistent color perception
3. **Follow Naming**: Keep variable names consistent
4. **Test All Components**: Verify theme works across all UI elements
5. **Document Custom Themes**: Add comments explaining your color choices

## Examples

### Creating a "Sunset" Theme

```typescript
sunset: {
  '--radius': '0.625rem',
  '--background': 'oklch(0.95 0.03 45)',     // Warm cream
  '--foreground': 'oklch(0.2 0.05 30)',     // Dark brown
  '--primary': 'oklch(0.6 0.2 45)',         // Orange
  '--primary-foreground': 'oklch(0.95 0.03 45)',
  '--secondary': 'oklch(0.9 0.05 45)',      // Light orange
  '--secondary-foreground': 'oklch(0.3 0.08 30)',
  // ... continue with all variables
},
```

## Hot Reload

Changes to theme files are automatically detected and applied during development. For production, rebuild your application after theme changes.

## Troubleshooting

- **Theme not applying**: Check that all required variables are defined
- **Colors look wrong**: Verify OKLCH values are in correct format
- **Build errors**: Ensure TypeScript types are correct
- **Performance issues**: Avoid too many theme variants

