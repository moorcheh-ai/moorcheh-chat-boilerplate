/**
 * Chat Configuration
 * 
 * This file controls which type of chat implementation to use in your application.
 * Change the chatType to switch between different chat implementations.
 */

import { getBrandingConfig } from './branding-config';

export type ChatType = 'widget' | 'interface';

export interface ChatConfig {
  /** The type of chat implementation to use */
  chatType: ChatType;
  
  /** Widget-specific configuration */
  widget: {
    /** Position of the widget on screen */
    position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Widget size when minimized */
    size: 'small' | 'medium' | 'large';
    /** Enable/disable widget animations */
    animations: boolean;
    /** Widget theme (inherits from global theme if not specified) */
    theme?: string;
    /** Custom widget icon */
    icon?: string;
    /** Widget z-index */
    zIndex: number;
    /** Offset from screen edges */
    offset: {
      x: number;
      y: number;
    };
  };
  
  /** Interface-specific configuration */
  interface: {
    /** Layout type for the interface */
    layout: 'sidebar' | 'centered' | 'fullscreen';
    /** Show/hide chat history sidebar */
    showSidebar: boolean;
    /** Maximum width for centered layout */
    maxWidth: string;
    /** Enable/disable responsive design */
    responsive: boolean;
    /** Interface theme (inherits from global theme if not specified) */
    theme?: string;
  };
  
  /** Common configuration for both types */
  common: {
    /** Enable/disable file uploads */
    enableFileUpload: boolean;
    /** Enable/disable chat export */
    enableExport: boolean;
    /** Enable/disable chat history */
    enableHistory: boolean;
    /** Maximum number of messages to store */
    maxMessages: number;
    /** API configuration */
    api: {
      namespace: string;
      model: string;
      temperature: number;
      topK: number;
      threshold: number;
    };
    /** Branding */
    branding: {
      title: string;
      subtitle?: string;
      logo?: string;
    };
  };
}

/**
 *  MAIN CHAT CONFIGURATION
 * 
 * Change these settings to customize your chat application
 * Branding is now automatically loaded from environment variables
 */
export const chatConfig: ChatConfig = {
  // Chat Type - Change this to switch between widget and interface
  chatType: 'interface', // Options: 'widget' | 'interface'
  
  // Widget Configuration
  widget: {
    position: 'bottom-right',
    size: 'medium',
    animations: true,
    zIndex: 1000,
    offset: {
      x: 24, // 24px from right edge
      y: 24, // 24px from bottom edge
    },
  },
  
  // Interface Configuration
  interface: {
    layout: 'sidebar',
    showSidebar: true,
    maxWidth: '1200px',
    responsive: true,
  },
  
  // Common Configuration
  common: {
    enableFileUpload: true,
    enableExport: true,
    enableHistory: true,
    maxMessages: 100,
    api: {
      namespace: 'Demo-doc',
      model: 'anthropic.claude-3-7-sonnet-20250219-v1:0',
      temperature: 0.7,
      topK: 3,
      threshold: 0.7,
    },
    // Branding - Automatically loaded from environment variables
    // Set NEXT_PUBLIC_APP_NAME, NEXT_PUBLIC_APP_SUBTITLE, etc. in .env.local
    branding: {
      title: getBrandingConfig().appName,
      subtitle: getBrandingConfig().appSubtitle,
      logo: getBrandingConfig().appLogo,
    },
  },
};

/**
 * Configuration Helpers
 */

// Get current chat type
export function getChatType(): ChatType {
  return chatConfig.chatType;
}

// Check if current type is widget
export function isWidget(): boolean {
  return chatConfig.chatType === 'widget';
}

// Check if current type is interface
export function isInterface(): boolean {
  return chatConfig.chatType === 'interface';
}

// Get widget configuration
export function getWidgetConfig() {
  return chatConfig.widget;
}

// Get interface configuration
export function getInterfaceConfig() {
  return chatConfig.interface;
}

// Get common configuration
export function getCommonConfig() {
  return chatConfig.common;
}

/**
 * Theme Integration
 */

// Get theme for current chat type
export function getChatTheme(): string | undefined {
  if (isWidget()) {
    return chatConfig.widget.theme;
  } else {
    return chatConfig.interface.theme;
  }
}

/**
 * Responsive Helpers
 */

// Check if responsive design is enabled
export function isResponsive(): boolean {
  if (isWidget()) {
    return true; // Widgets are always responsive
  } else {
    return chatConfig.interface.responsive;
  }
}

/**
 * Validation
 */

// Validate configuration
export function validateChatConfig(): boolean {
  try {
    // Validate chat type
    if (!['widget', 'interface'].includes(chatConfig.chatType)) {
      console.error('Invalid chat type:', chatConfig.chatType);
      return false;
    }
    
    // Validate widget config
    if (isWidget()) {
      const { position, size, zIndex, offset } = chatConfig.widget;
      if (!['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(position)) {
        console.error('Invalid widget position:', position);
        return false;
      }
      if (!['small', 'medium', 'large'].includes(size)) {
        console.error('Invalid widget size:', size);
        return false;
      }
      if (typeof zIndex !== 'number' || zIndex < 0) {
        console.error('Invalid widget zIndex:', zIndex);
        return false;
      }
      if (typeof offset.x !== 'number' || typeof offset.y !== 'number') {
        console.error('Invalid widget offset:', offset);
        return false;
      }
    }
    
    // Validate interface config
    if (isInterface()) {
      const { layout } = chatConfig.interface;
      if (!['sidebar', 'centered', 'fullscreen'].includes(layout)) {
        console.error('Invalid interface layout:', layout);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error validating chat config:', error);
    return false;
  }
} 