import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/wmac-constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Background pattern - subtle Japanese wave */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.03) 20px,
              rgba(255,255,255,0.03) 21px
            )`,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
        <Image
          src="/logos/Weatherford_Martial_Arts.png"
          alt="Weatherford Martial Arts Center seal"
          width={120}
          height={120}
          className="w-24 h-24 md:w-30 md:h-30 mb-8"
          priority
        />

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          Weatherford<br />
          <span className="text-red">Martial Arts</span> Center
        </h1>

        <p className="font-serif text-lg md:text-xl text-rice/60 mb-2 italic">
          {SITE.tagline}
        </p>

        <p className="max-w-xl text-rice/50 text-sm md:text-base mb-8 leading-relaxed">
          Aikido &middot; Judo &middot; Daito Ryu Aikijujutsu
          <br />
          Weatherford, Texas
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`${SITE.basePath}/contact`}
            className="bg-red hover:bg-red-dark text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors"
          >
            Book Intro Session
          </Link>
          <Link
            href={`${SITE.basePath}/schedule`}
            className="border border-rice/30 hover:border-rice/60 text-rice px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors"
          >
            View Schedule
          </Link>
        </div>
      </div>
    </section>
  );
}
