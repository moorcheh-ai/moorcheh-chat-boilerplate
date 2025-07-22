import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { CustomizationProvider } from "../components/CustomizationProvider";

export const metadata: Metadata = {
  title: "Moorcheh Chat",
  description: "AI-powered chat application with customizable themes and fonts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <CustomizationProvider>
          <Navbar />
          {children}
        </CustomizationProvider>
      </body>
    </html>
  );
}
