"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SITE, NAV_LINKS } from "@/lib/wmac-constants";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-rice/95 backdrop-blur-sm border-b border-gray">
      {/* Utility Strip */}
      <div className="bg-ink text-rice text-sm">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href={`tel:${SITE.phone}`} className="hover:text-red-light transition-colors">
              {SITE.phone}
            </a>
            <span className="hidden sm:inline text-gray">|</span>
            <span className="hidden sm:inline">{SITE.address}</span>
          </div>
          <Link
            href={`${SITE.basePath}/contact`}
            className="bg-red hover:bg-red-dark text-white px-3 py-0.5 text-xs font-medium tracking-wide uppercase transition-colors"
          >
            Book Intro
          </Link>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={SITE.basePath} className="flex items-center gap-3">
          <Image
            src="/logos/Weatherford_Martial_Arts.png"
            alt={SITE.name}
            width={44}
            height={44}
            className="w-11 h-11"
          />
          <div className="hidden sm:block">
            <div className="font-serif font-bold text-lg leading-tight text-ink">
              Weatherford
            </div>
            <div className="font-serif text-xs tracking-widest uppercase text-red">
              Martial Arts Center
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-ink/70 hover:text-red transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-ink"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray bg-rice">
          <ul className="max-w-6xl mx-auto px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-ink/70 hover:text-red transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
