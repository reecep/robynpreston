"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Packages", href: "/packages" },
  { label: "Why Us", href: "/why-us" },
  { label: "Reviews", href: "/reviews" },
  { label: "Stories", href: "/stories" },
  { label: "Media", href: "/media" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-stone-900 text-stone-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight hover:opacity-80 transition-opacity">
          <span className="text-amber-400 font-bold text-lg tracking-wider uppercase">REP Kenya Safaris</span>
          <span className="text-stone-400 text-xs tracking-widest uppercase">Robyn E. Preston</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-amber-400 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-4 py-2 rounded transition-colors"
          >
            Enquire
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-stone-700 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-stone-100 mb-1" />
          <span className="block w-5 h-0.5 bg-stone-100 mb-1" />
          <span className="block w-5 h-0.5 bg-stone-100" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-stone-800 border-t border-stone-700 px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-amber-400 transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
