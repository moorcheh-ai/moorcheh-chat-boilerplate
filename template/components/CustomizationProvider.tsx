'use client';

/**
 * CustomizationProvider Component
 * 
 * This component initializes and manages the customization system.
 * It automatically applies themes and fonts from the customize folder.
 */

import React from 'react';
import { CustomizationInitializer } from './CustomizationInitializer';

interface CustomizationProviderProps {
  children: React.ReactNode;
}

export function CustomizationProvider({ children }: CustomizationProviderProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-primary">
      <CustomizationInitializer />
      {children}
    </div>
  );
} 