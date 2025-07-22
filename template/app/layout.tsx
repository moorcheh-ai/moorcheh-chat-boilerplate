import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { CustomizationProvider } from "../components/CustomizationProvider";
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
        <CustomizationProvider>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
            <main className="relative">
              {children}
            </main>
          </div>
        </CustomizationProvider>
      </body>
    </html>
  );
}
