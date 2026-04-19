import Link from "next/link";
import type { Metadata } from "next";
import { SITE, DISCIPLINES } from "@/lib/wmac-constants";

export const metadata: Metadata = {
  title: "Aikido Classes in Weatherford, TX",
  description:
    "Learn Aikido at Weatherford Martial Arts Center. A defensive Japanese martial art emphasizing harmony, redirection of force, and self-defense without aggression. All levels welcome.",
  alternates: { canonical: "/aikido" },
};

export default function AikidoPage() {
  const art = DISCIPLINES[0];

  return (
    <>
      {/* Header Banner */}
      <section className="bg-ink py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-xs tracking-widest uppercase text-red mb-2">
            {art.japanese}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">
            {art.name}
          </h1>
          <p className="font-serif text-lg text-rice/60 italic">{art.subtitle}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <p className="text-ink/80 leading-relaxed mb-8">{art.description}</p>

        <div className="bg-white border border-gray p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-ink mb-2">Who It&apos;s For</h2>
          <p className="text-sm text-ink/70">{art.forWhom}</p>
        </div>

        <div className="bg-white border border-gray p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-ink mb-4">What You&apos;ll Gain</h2>
          <ul className="space-y-2">
            {art.outcomes.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                <span className="text-red mt-0.5">&#9656;</span>
                {o}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`${SITE.basePath}/contact`}
            className="bg-red hover:bg-red-dark text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors text-center"
          >
            Book Intro Session
          </Link>
          <Link
            href={`${SITE.basePath}/schedule`}
            className="border border-gray hover:border-red text-ink px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors text-center"
          >
            View Schedule
          </Link>
        </div>
      </section>
    </>
  );
}
