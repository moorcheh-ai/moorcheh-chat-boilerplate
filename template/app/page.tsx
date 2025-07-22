"use client";

import { CustomizationDemo } from "../components/CustomizationDemo";
import DynamicChat from "../components/DynamicChat";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        {/* Customization Demo */}
        <CustomizationDemo />
        
        {/* Dynamic Chat - Renders widget or interface based on config */}
        <div className="mt-12">
          <DynamicChat />
        </div>
      </main>
    </div>
  );
}
