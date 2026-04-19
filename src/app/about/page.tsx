import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE } from "@/lib/wmac-constants";

export const metadata: Metadata = {
  title: "About Our Dojo",
  description:
    "A traditional Japanese martial arts dojo in Weatherford, Texas dedicated to Aikido, Judo, Daito Ryu Aikijujutsu, and community wellness. Learn about our mission and training philosophy.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink pt-2 pb-16 md:pt-3 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Image
            src="/logos/Weatherford_Martial_Arts.png"
            alt="WMAC Seal"
            width={240}
            height={240}
            className="mx-auto mb-2 md:mb-3 w-48 h-48 md:w-60 md:h-60"
          />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            About Our Dojo
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <div className="space-y-6 text-ink/80 leading-relaxed mb-12">
          <p>
            Weatherford Martial Arts Center is more than a training facility; it is a
            community dedicated to the study and preservation of traditional Japanese martial arts.
            Located in Weatherford, Texas, our dojo provides a focused, respectful environment
            where students of all backgrounds can pursue excellence in Aikido, Judo, and
            Daito Ryu Aikijujutsu.
          </p>
          <p>
            Our training philosophy draws from centuries of martial tradition. We believe that
            authentic practice develops not just physical skill, but character, awareness, and
            resilience that carry into every aspect of life. Every class begins and ends with
            the traditional etiquette that connects us to the lineage of masters who came before.
          </p>
          <p>
            Beyond our core disciplines, we are proud to host partner programs that complement
            our mission. The Karate University brings structured karate training to our community,
            while Just Move Fitness with Autumn Nelson offers wellness and fitness classes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-white border border-gray p-6">
            <h2 className="font-serif text-lg font-bold text-ink mb-2">Our Mission</h2>
            <p className="text-sm text-ink/70 leading-relaxed">
              To preserve and transmit traditional Japanese martial arts while fostering a
              welcoming community of lifelong learners in Weatherford, Texas.
            </p>
          </div>
          <div className="bg-white border border-gray p-6">
            <h2 className="font-serif text-lg font-bold text-ink mb-2">Dojo Etiquette</h2>
            <p className="text-sm text-ink/70 leading-relaxed">
              Respect, sincerity, and dedication guide our training. We bow entering and
              leaving the mat, maintain a clean training space, and treat every partner as
              a gift to our practice.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href={`${SITE.basePath}/start-here`}
            className="bg-red hover:bg-red-dark text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors"
          >
            Begin Your Journey
          </Link>
        </div>
      </section>
    </>
  );
}
