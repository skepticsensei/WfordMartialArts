import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE, HOSTED_GROUPS } from "@/lib/wmac-constants";

export const metadata: Metadata = {
  title: "Dark Veil Dance - Fusion Dance Classes in Weatherford, TX",
  description:
    "Fusion dance classes blending styles and traditions into an expressive movement practice. Dark Veil Dance, hosted at Weatherford Martial Arts Center.",
  alternates: { canonical: "/dark-veil-dance" },
};

export default function DarkVeilDancePage() {
  const group = HOSTED_GROUPS.find((g) => g.slug === "dark-veil-dance")!;

  return (
    <>
      <section className="bg-ink py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-4">
            <span className="inline-block text-[10px] tracking-widest uppercase font-medium px-2 py-0.5 bg-purple/30 text-purple-light">
              Hosted at WMAC
            </span>
          </div>
          <Image
            src={group.logo}
            alt={group.name}
            width={240}
            height={120}
            className="mx-auto mb-6 h-24 w-auto invert"
          />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            {group.name}
          </h1>
          <p className="mt-3 text-rice/60 text-sm tracking-widest uppercase">
            Fusion Dance
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <p className="text-ink/80 leading-relaxed mb-8">{group.description}</p>

        <div className="bg-white border border-gray p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-ink mb-4">Program Highlights</h2>
          <ul className="space-y-2">
            {[
              "Fusion dance blending multiple styles and traditions",
              "Focus on creative expression and musicality",
              "Welcoming to all experience levels",
              "Supportive, community-oriented atmosphere",
              "Explore movement beyond a single discipline",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                <span className="text-purple mt-0.5">&#9656;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`${SITE.basePath}/contact`}
            className="bg-purple hover:bg-ink text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors text-center"
          >
            Inquire About Classes
          </Link>
          <Link
            href="/#schedule"
            className="border border-gray hover:border-purple text-ink px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors text-center"
          >
            View Schedule
          </Link>
        </div>
      </section>
    </>
  );
}
