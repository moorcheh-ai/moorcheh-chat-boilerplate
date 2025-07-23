"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { branding } from "@/lib/branding-config";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b w-full" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center w-full">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image 
              src={branding.getAppLogo()} 
              alt={branding.getCompanyName()} 
              width={140} 
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/" className="text-base font-medium hover:underline" style={{ color: "var(--foreground)" }}>Home</Link>
            <Link href="/demo" className="text-base font-medium hover:underline" style={{ color: "var(--foreground)" }}>Demo</Link>
          </div>
          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center justify-end absolute right-4 top-5">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0">
                  <Menu className="h-6 w-6" style={{ color: "var(--foreground)" }} />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] py-12" style={{ background: "var(--background)", color: "var(--foreground)" }}>
                <nav className="flex flex-col gap-6">
                  <Link 
                    href="/" 
                    className="text-lg font-medium transition-colors hover:underline"
                    style={{ color: "var(--foreground)" }}
                    onClick={handleLinkClick}
                  >
                    Home
                  </Link>

                  <Link 
                    href="/demo" 
                    className="text-lg font-medium transition-colors hover:underline"
                    style={{ color: "var(--foreground)" }}
                    onClick={handleLinkClick}
                  >
                    Demo
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}