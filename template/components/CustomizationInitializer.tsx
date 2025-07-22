'use client';

/**
 * CustomizationInitializer Component
 * 
 * This component runs on the client side to initialize the customization system.
 * It ensures themes and fonts are applied as early as possible.
 */

import { useEffect } from 'react';
import { themes } from '../customize/themes/available-themes';
import { customThemes } from '../customize/themes/custom-themes';
import { themeConfig } from '../customize/themes/theme-config';
import { fontConfig } from '../customize/fonts/font-config';
import { availableFonts, generateGoogleFontsUrl } from '../customize/fonts/available-fonts';
import { customFonts, generateFontFaceCSS } from '../customize/fonts/custom-fonts';

export function CustomizationInitializer() {
  useEffect(() => {
    const initializeCustomization = () => {
      try {
        // Combine all themes
        const allThemes = { ...themes, ...customThemes };
        
        // Get the theme to apply
        let themeToApply = themeConfig.defaultTheme;
        
        // Check for saved theme
        if (themeConfig.persistTheme) {
          const savedTheme = localStorage.getItem('moorcheh-chat-theme');
          if (savedTheme && (savedTheme === 'system' || allThemes[savedTheme])) {
            themeToApply = savedTheme;
          }
        }

        // Handle system theme
        if (themeToApply === 'system') {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          themeToApply = prefersDark ? 'dark' : 'light';
        }

        // Apply theme
        const theme = allThemes[themeToApply];
        if (theme) {
          const root = document.documentElement;
          Object.entries(theme).forEach(([property, value]) => {
            root.style.setProperty(property, value);
          });
          root.classList.add(`theme-${themeToApply}`);
        }

        // Apply fonts
        const root = document.documentElement;
        
        // Get font definitions
        const primaryFont = availableFonts[fontConfig.primaryFont] || customFonts[fontConfig.primaryFont];
        const headingFont = availableFonts[fontConfig.headingFont] || customFonts[fontConfig.headingFont];
        const monoFont = availableFonts[fontConfig.monoFont] || customFonts[fontConfig.monoFont];

        // Apply font CSS variables
        if (primaryFont) {
          root.style.setProperty('--font-primary', `'${primaryFont.name}', ${primaryFont.fallback}`);
        }
        if (headingFont) {
          root.style.setProperty('--font-heading', `'${headingFont.name}', ${headingFont.fallback}`);
        }
        if (monoFont) {
          root.style.setProperty('--font-mono', `'${monoFont.name}', ${monoFont.fallback}`);
        }

        // Load Google Fonts if enabled
        if (fontConfig.enableGoogleFonts) {
          const googleFonts = [fontConfig.primaryFont, fontConfig.headingFont, fontConfig.monoFont]
            .filter(fontName => availableFonts[fontName]?.googleFontsName)
            .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

          if (googleFonts.length > 0) {
            // Remove existing Google Fonts link
            const existingLink = document.getElementById('google-fonts');
            if (existingLink) {
              existingLink.remove();
            }

            // Add preconnect links for performance
            const preconnect1 = document.createElement('link');
            preconnect1.rel = 'preconnect';
            preconnect1.href = 'https://fonts.googleapis.com';
            
            const preconnect2 = document.createElement('link');
            preconnect2.rel = 'preconnect';
            preconnect2.href = 'https://fonts.gstatic.com';
            preconnect2.crossOrigin = 'anonymous';

            // Add Google Fonts stylesheet
            const googleFontsUrl = generateGoogleFontsUrl(googleFonts);
            const link = document.createElement('link');
            link.id = 'google-fonts';
            link.rel = 'stylesheet';
            link.href = googleFontsUrl;

            document.head.appendChild(preconnect1);
            document.head.appendChild(preconnect2);
            document.head.appendChild(link);
          }
        }

        // Load custom fonts
        const customFontNames = [fontConfig.primaryFont, fontConfig.headingFont, fontConfig.monoFont]
          .filter(fontName => customFonts[fontName]);

        customFontNames.forEach(fontName => {
          const existingStyle = document.getElementById(`custom-font-${fontName}`);
          if (existingStyle) {
            existingStyle.remove();
          }

          const css = generateFontFaceCSS(fontName);
          if (css) {
            const style = document.createElement('style');
            style.id = `custom-font-${fontName}`;
            style.textContent = css;
            document.head.appendChild(style);
          }
        });

      } catch (error) {
        console.error('Failed to initialize customization:', error);
      }
    };

    // Initialize immediately
    initializeCustomization();

    // Listen for system theme changes if system theme is enabled
    if (themeConfig.enableSystemTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => {
        const currentTheme = localStorage.getItem('moorcheh-chat-theme');
        if (currentTheme === 'system') {
          initializeCustomization();
        }
      };
      
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, []);

  return null; // This component doesn't render anything
} 