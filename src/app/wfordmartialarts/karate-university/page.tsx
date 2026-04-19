import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE, HOSTED_GROUPS } from "@/lib/wmac-constants";

export const metadata: Metadata = { title: "The Karate University" };

export default function KarateUniversityPage() {
  const group = HOSTED_GROUPS[0];

  return (
    <>
      <section className="bg-ink py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Image
            src={group.logo}
            alt={group.name}
            width={200}
            height={100}
            className="mx-auto mb-6 h-20 w-auto brightness-200 invert"
          />
          <span className="inline-block text-[10px] tracking-widest uppercase font-medium px-2 py-0.5 bg-red/20 text-red mb-3">
            Hosted at WMAC
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            {group.name}
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <p className="text-ink/80 leading-relaxed mb-8">{group.description}</p>

        <div className="bg-white border border-gray p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-ink mb-4">Program Highlights</h2>
          <ul className="space-y-2">
            {[
              "Structured belt-rank progression system",
              "Classes for children, teens, and adults",
              "Focus on discipline, confidence, and self-defense",
              "Traditional kata and kumite training",
              "Regular testing and advancement opportunities",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                <span className="text-red mt-0.5">&#9656;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`${SITE.basePath}/contact`}
            className="bg-red hover:bg-red-dark text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors text-center"
          >
            Inquire About Classes
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
