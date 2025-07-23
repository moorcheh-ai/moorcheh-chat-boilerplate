import type { Metadata } from "next";
import "./globals.css";
import { CustomizationInitializer } from "../components/chat/CustomizationInitializer";
import { getBrandingConfig } from "../lib/branding-config";
import { getFontClasses } from "../lib/fonts";

const brandingConfig = getBrandingConfig();

export const metadata: Metadata = {
  title: brandingConfig.appTitle,
  description: brandingConfig.appDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${getFontClasses()} antialiased`}>
        <CustomizationInitializer />
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
          <main className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
