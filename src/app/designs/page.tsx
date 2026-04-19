import Link from "next/link";

const VARIANTS = [
  {
    slug: "dojo-ledger",
    number: "01",
    name: "Dojo Ledger",
    tagline: "Calm Japanese editorial",
    palette: ["#F7F3EB", "#171717", "#B21E2B"],
    description:
      "Rice-paper background, ink text, hanko-red accents. Noto Serif JP + Inter. Gentle dividers, generous whitespace, small-caps section labels. Reads like a literary journal.",
  },
  {
    slug: "iron-tatami",
    number: "02",
    name: "Iron Tatami",
    tagline: "Industrial brutalist",
    palette: ["#0A0A0A", "#E50914", "#E6E6E6"],
    description:
      "Near-black, concrete gray, emergency red. Bebas Neue condensed headings screaming in capitals, visible grid lines, sharp corners, no rounding. Built like a gym.",
  },
  {
    slug: "kodo",
    number: "03",
    name: "Kodo",
    tagline: "Modern athletic energy",
    palette: ["#1A1B3A", "#FFD700", "#00F0FF"],
    description:
      "Deep midnight gradient canvas, gold and cyan accents, oversized numerals. Feels like a premium training app — motion-forward, high contrast, aspirational.",
  },
  {
    slug: "scroll-seal",
    number: "04",
    name: "Scroll & Seal",
    tagline: "Traditional heritage",
    palette: ["#F4E8D4", "#2B1810", "#8B1A1A"],
    description:
      "Parchment cream, dark umber text, deep crimson with antique gold flourishes. Italic Playfair Display throughout, ornamental rules, classical hierarchy. A samurai library.",
  },
  {
    slug: "zen-grid",
    number: "05",
    name: "Zen Grid",
    tagline: "Swiss minimalism",
    palette: ["#FFFFFF", "#111111", "#E50914"],
    description:
      "Pure white, black type, one dot of red. 12-column grid exposed, JetBrains Mono captions, huge whitespace, numbered sections. Dieter Rams meets a dojo.",
  },
];

export default function DesignsIndex() {
  return (
    <div className="bg-neutral-950 text-white min-h-screen">
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-16 max-w-2xl">
          <div className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4">
            Weatherford Martial Arts Center
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight">
            Five directions.
            <br />
            <span className="text-white/40">Pick one.</span>
          </h1>
          <p className="mt-6 text-white/60 text-lg leading-relaxed">
            Same content, five distinct visual languages. Click through each to
            see the full single-page preview. When you have a favorite, we
            build the rest of the site in that direction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VARIANTS.map((v) => (
            <Link
              key={v.slug}
              href={`/designs/${v.slug}`}
              className="group block border border-white/10 hover:border-white/40 transition-colors p-6 md:p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs tracking-[0.3em] uppercase text-white/40 mb-2">
                    Variant {v.number}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{v.name}</h2>
                  <div className="text-white/60 mt-1">{v.tagline}</div>
                </div>
                <div className="flex gap-1">
                  {v.palette.map((c) => (
                    <div
                      key={c}
                      className="w-8 h-8 border border-white/20"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{v.description}</p>
              <div className="mt-6 text-xs tracking-[0.3em] uppercase text-white/50 group-hover:text-white">
                View preview &rarr;
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-xs tracking-widest uppercase text-white/40">
          Currently live: <Link href="/wfordmartialarts" className="underline hover:text-white">Dojo Ledger at /wfordmartialarts</Link>
        </div>
      </section>
    </div>
  );
}
