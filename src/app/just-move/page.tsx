import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE, HOSTED_GROUPS } from "@/lib/wmac-constants";

export const metadata: Metadata = {
  title: "Just Move Fitness - Wellness Classes in Weatherford, TX",
  description:
    "Movement-based wellness with Autumn Nelson. Functional fitness, flexibility, and holistic health classes for every body, hosted at Weatherford Martial Arts Center.",
  alternates: { canonical: "/just-move" },
};

export default function JustMovePage() {
  const group = HOSTED_GROUPS[1];

  return (
    <>
      <section className="bg-ink py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Image
            src={group.logo}
            alt={group.name}
            width={100}
            height={100}
            className="mx-auto mb-6 w-20 h-20"
          />
          <span className="inline-block text-[10px] tracking-widest uppercase font-medium px-2 py-0.5 bg-teal/20 text-teal mb-3">
            Hosted at WMAC
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            {group.name}
          </h1>
          <p className="font-serif text-lg text-rice/60 italic mt-2">
            with {group.leader}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <p className="text-ink/80 leading-relaxed mb-8">{group.description}</p>

        <div className="bg-white border border-teal/20 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-ink mb-4">Class Offerings</h2>
          <ul className="space-y-2">
            {[
              "Morning Flow \u2014 Start your day with mindful movement",
              "Strength \u2014 Functional strength training for everyday life",
              "Flexibility \u2014 Improve range of motion and joint health",
              "HIIT \u2014 High-intensity intervals for cardiovascular fitness",
              "Weekend Warrior \u2014 A full-body Saturday challenge",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                <span className="text-teal mt-0.5">&#9656;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {group.externalUrl && (
            <a
              href={group.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal hover:opacity-90 text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors text-center"
            >
              Visit Just Move Fitness &rarr;
            </a>
          )}
          <Link
            href="/#schedule"
            className="border border-gray hover:border-teal text-ink px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors text-center"
          >
            View Schedule
          </Link>
        </div>
      </section>
    </>
  );
}
