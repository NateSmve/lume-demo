"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/#collection", label: "Shop" },
  { href: "/#story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-800/50 bg-stone-950/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl tracking-[0.2em] uppercase text-amber-100 hover:text-amber-300 transition-colors"
        >
          Lume
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-stone-800 text-amber-100"
                  : "text-stone-400 hover:text-amber-100 hover:bg-stone-800/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#collection"
            className="ml-4 px-4 py-2 rounded-lg text-sm font-semibold bg-amber-700 text-amber-50 hover:bg-amber-600 transition-colors"
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-stone-400 hover:text-amber-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-800/50 bg-stone-950 px-6 py-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm font-medium text-stone-400 hover:text-amber-100 hover:bg-stone-800/50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#collection"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-2 rounded-lg text-sm font-semibold bg-amber-700 text-amber-50 hover:bg-amber-600 transition-colors text-center mt-2"
          >
            Shop Now
          </Link>
        </div>
      )}
    </nav>
  );
}
