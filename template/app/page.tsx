"use client";

import { useEffect, useState } from "react";
import DynamicChat from "../components/DynamicChat";
import { getChatType, getWidgetConfig } from "../lib/chat-config";

export default function Home() {
  const [chatType, setChatType] = useState<'widget' | 'interface' | null>(null);

  useEffect(() => {
    setChatType(getChatType());
  }, []);

  // Get widget configuration for positioning
  const widgetConfig = getWidgetConfig();
  
  // Calculate position classes based on widget config
  // const getWidgetPositionClasses = () => {
  //   const { position, offset } = widgetConfig;
    
  //   const baseClasses = "fixed z-[1000]";
    
  //   switch (position) {
  //     case 'bottom-right':
  //       return `${baseClasses} bottom-${Math.floor(offset.y / 4)} right-${Math.floor(offset.x / 4)}`;
  //     case 'bottom-left':
  //       return `${baseClasses} bottom-${Math.floor(offset.y / 4)} left-${Math.floor(offset.x / 4)}`;
  //     case 'top-right':
  //       return `${baseClasses} top-${Math.floor(offset.y / 4)} right-${Math.floor(offset.x / 4)}`;
  //     case 'top-left':
  //       return `${baseClasses} top-${Math.floor(offset.y / 4)} left-${Math.floor(offset.x / 4)}`;
  //     default:
  //       return `${baseClasses} bottom-6 right-6`;
  //   }
  // };

  const getWidgetPositionStyles = () => {
    const { position, offset } = widgetConfig;
    
    switch (position) {
      case 'bottom-right':
        return { bottom: `${offset.y}px`, right: `${offset.x}px` };
      case 'bottom-left':
        return { bottom: `${offset.y}px`, left: `${offset.x}px` };
      case 'top-right':
        return { top: `${offset.y}px`, right: `${offset.x}px` };
      case 'top-left':
        return { top: `${offset.y}px`, left: `${offset.x}px` };
      default:
        return { bottom: '24px', right: '24px' };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        {/* Customization Demo */}
        {/* <CustomizationDemo /> */}
        
        {/* Dynamic Chat - Renders widget or interface based on config */}
        {chatType === 'widget' ? (
          // Widget mode - position in corner
          <div 
            className="fixed z-[1000]"
            style={{
              ...getWidgetPositionStyles(),
              zIndex: widgetConfig.zIndex
            }}
          >
            <DynamicChat />
          </div>
        ) : (
          // Interface mode - centered layout
          <div className="mt-6">
            <DynamicChat />
          </div>
        )}
      </main>
    </div>
  );
}
