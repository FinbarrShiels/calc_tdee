"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  // Use useState to track if the mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left side */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <Logo />
              <span className="font-bold text-xl text-gray-800">TDEE Calculator</span>
            </div>
          </Link>

          {/* Desktop menu - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-green-600 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile menu button - visible only on mobile */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-green-600 focus:outline-none"
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/faq"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 