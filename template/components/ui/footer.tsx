"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div>
              <span className="text-xl font-bold text-[#1e40af]">Moorcheh</span>
              <p className="text-gray-500 text-sm mt-2">
                Edge AI solutions for small and medium enterprises
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Discord</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515c-.245.43-.412.983-.504 1.438a18.816 18.816 0 0 0-5.674 0 6.303 6.303 0 0 0-.504-1.438A19.788 19.788 0 0 0 3.677 4.37a20.249 20.249 0 0 0-2.88 11.433c1.88 1.413 3.93 2.558 6.089 3.361a15.83 15.83 0 0 0 1.342-2.211c-.736-.277-1.442-.618-2.106-1.013.176-.127.349-.258.515-.394 4.216 1.932 8.796 1.932 12.96 0l.515.394c-.67.395-1.372.736-2.106 1.013.45.751.923 1.492 1.342 2.211 2.16-.806 4.22-1.946 6.092-3.366a20.204 20.204 0 0 0-2.877-11.433z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">X</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Threads</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.7 7.1a7.5 7.5 0 0 0-7.15-1.68c-.82.23-1.16.93-1.5 1.62-.34.7-.54 1.15-.85 1.44-.3.29-.74.49-1.6.54-.85.05-1.22 1.02-.77 1.63.44.6 1.13.4 1.3.37.56-.1 1.02-.35 1.5-.65.5-.3.98.23.98.82v5.48c0 .58.92.9 1.27.44a9.4 9.4 0 0 0 1.84-5.85c0-.36.07-.72.24-1 .18-.29.47-.5.75-.62.57-.25 1.12-.45 1.96-.79.84-.34 1.7-.7 2.54-1.23.82-.53 1.51-1.19 2.01-2 .5-.82.53-1.53.1-2.04-.42-.52-1.07-.53-1.62-.03-.29.26-.55.55-.77.84-.41.54-.76 1-.97 1.29-.4.55-1 .35-1 .35s1.1-2 1.62-2.78c.51-.78 1.05-1.52 1.74-2.07.68-.55 1.45-.92 2.21-.84.77.08 1.52.53 1.6 1.51.08.97-.16 1.81-.8 2.7-.63.9-1.57 1.76-2.59 2.5-1.02.75-2.13 1.35-3.13 1.65-1 .32-2.01.62-2.65 1.39-.65.76-.7 1.78-.66 2.61.04.83.17 1.48.38 2.2.2.7.62 1.45 1.41 1.91.8.45 1.91.54 2.82.05.92-.5 1.65-1.53 2.02-2.89.36-1.36.44-3.07.4-5.02-.01-.5.74-.6.94-.21 1.24 2.35 2.48 5.73 1.75 8.63-.73 2.9-2.94 5.31-5.89 6.2-2.96.88-6.64.12-9.04-2.1-2.4-2.22-3.54-5.82-2.95-9.42.62-3.5 3.14-6.9 6.56-8.3.24-.1.35-.39.25-.63-.09-.23-.39-.35-.63-.24-3.88 1.58-6.8 5.4-7.5 9.46-.73 4.05.57 8.23 3.34 10.82 2.77 2.58 6.98 3.45 10.48 2.35 3.5-1.11 6.15-3.99 7.03-7.49.87-3.5-.4-7.15-1.71-9.91-.11-.24-.4-.34-.65-.22-.23.11-.33.4-.22.65.03.08.06.15.1.23-.02-.02-.03-.03-.05-.05-4.1 2.34-2.06 1.17-3.68 2.1a4.1 4.1 0 0 0-1.18.94c-.32.36-.18.36-.18.88Z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454c.979 0 1.775-.773 1.775-1.729V1.729C24 .774 23.204 0 22.225 0z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">Products</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/products/overview" className="text-base text-gray-500 hover:text-gray-700">
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/chatbot" className="text-base text-gray-500 hover:text-gray-700">
                      Moorcheh Chat Bot
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/sdk" className="text-base text-gray-500 hover:text-gray-700">
                      Moorcheh SDK
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/edge" className="text-base text-gray-500 hover:text-gray-700">
                      Moorcheh on Edge
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/pricing" className="text-base text-gray-500 hover:text-gray-700">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/documentation" className="text-base text-gray-500 hover:text-gray-700">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides" className="text-base text-gray-500 hover:text-gray-700">
                      Guides
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base text-gray-500 hover:text-gray-700">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/research" className="text-base text-gray-500 hover:text-gray-700">
                      Research
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-base text-gray-500 hover:text-gray-700">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase">Contact</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="mailto:contact@moorcheh.com" className="text-base text-gray-500 hover:text-gray-700">
                      contact@moorcheh.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+123456789" className="text-base text-gray-500 hover:text-gray-700">
                      +1 (234) 567-89
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 xl:text-center">
            &copy; {new Date().getFullYear()} Edge AI Innovations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 