'use client';

/**
 * CustomizationProvider Component
 * 
 * This component initializes and manages the customization system.
 * It automatically applies themes and fonts from the customize folder.
 */

import React, { useEffect, useState } from 'react';
import { CustomizationInitializer } from './CustomizationInitializer';
import { useCustomization } from '../hooks/useCustomization';
import { themeConfig } from '../customize/themes/theme-config';
import { branding } from '../lib/branding-config';

interface CustomizationProviderProps {
  children: React.ReactNode;
}

export function CustomizationProvider({ children }: CustomizationProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Force apply the theme from config on mount
    const initializeTheme = () => {
      try {
        // Get the default theme from config
        const configTheme = themeConfig.defaultTheme;
        
        // Check if we should override with saved theme
        let themeToUse = configTheme;
        if (themeConfig.persistTheme) {
          const savedTheme = localStorage.getItem(branding.getThemeStorageKey());
          // Only use saved theme if it exists and is valid
          if (savedTheme && savedTheme !== configTheme) {
            // If config theme changed, prefer config over saved theme
            console.log(`Theme config changed from saved "${savedTheme}" to "${configTheme}". Applying config theme.`);
            localStorage.setItem(branding.getThemeStorageKey(), configTheme);
          } else if (savedTheme) {
            themeToUse = savedTheme;
          }
        }

        // Apply theme class to html element for immediate effect
        const root = document.documentElement;
        
        // Remove all existing theme classes
        const existingClasses = Array.from(root.classList).filter(cls => cls.startsWith('theme-'));
        existingClasses.forEach(cls => root.classList.remove(cls));
        
        // Add new theme class
        if (themeToUse !== 'system') {
          root.classList.add(`theme-${themeToUse}`);
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize theme:', error);
        setIsInitialized(true);
      }
    };

    initializeTheme();
  }, []);

  return (
    <>
      <CustomizationInitializer />
      {children}
    </>
  );
} 