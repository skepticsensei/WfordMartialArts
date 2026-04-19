import type { Metadata } from "next";
import Link from "next/link";
import { Bebas_Neue, Playfair_Display, JetBrains_Mono } from "next/font/google";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Design Previews | WMAC",
    template: "%s | WMAC Design Previews",
  },
  description: "Five design variants for the Weatherford Martial Arts Center site.",
};

export default function DesignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${bebas.variable} ${playfair.variable} ${jetbrains.variable} min-h-full flex flex-col`}>
      <div className="sticky top-0 z-50 bg-black text-white text-xs tracking-widest uppercase border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <Link href="/designs" className="font-bold hover:text-white/60">
            WMAC Design Previews
          </Link>
          <nav className="flex items-center gap-3 md:gap-5 overflow-x-auto">
            <Link href="/designs/dojo-ledger" className="hover:text-white/60 whitespace-nowrap">1 Dojo Ledger</Link>
            <Link href="/designs/iron-tatami" className="hover:text-white/60 whitespace-nowrap">2 Iron Tatami</Link>
            <Link href="/designs/kodo" className="hover:text-white/60 whitespace-nowrap">3 Kodo</Link>
            <Link href="/designs/scroll-seal" className="hover:text-white/60 whitespace-nowrap">4 Scroll &amp; Seal</Link>
            <Link href="/designs/zen-grid" className="hover:text-white/60 whitespace-nowrap">5 Zen Grid</Link>
          </nav>
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
