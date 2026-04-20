import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE, INSTRUCTORS } from "@/lib/wmac-constants";

export const metadata: Metadata = {
  title: "Our Instructors",
  description:
    "Meet Sensei Nathan Himes, head instructor and founder of Weatherford Martial Arts Center. Rokudan in Tomiki Aikido, with over 17 years of teaching experience in Weatherford, Texas.",
  alternates: { canonical: "/instructors" },
};

export default function InstructorsPage() {
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
            Instructors
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <div className="space-y-8">
          {INSTRUCTORS.map((inst, i) => (
            <div key={i} className="bg-white border border-gray p-6 md:p-8">
              <div className="mb-4">
                <h2 className="font-serif text-2xl font-bold text-ink">
                  {inst.name}
                </h2>
                <div className="text-sm text-red font-medium tracking-wide uppercase">
                  {inst.title}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {inst.arts.map((art) => (
                  <span
                    key={art}
                    className="text-[10px] tracking-widest uppercase px-2 py-0.5 bg-rice border border-gray text-ink/60"
                  >
                    {art}
                  </span>
                ))}
              </div>
              <p className="text-sm text-ink/70 leading-relaxed">{inst.bio}</p>
              {inst.media && inst.media.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray">
                  <h3 className="text-[10px] tracking-widest uppercase text-ink/50 mb-3">
                    Featured
                  </h3>
                  <ul className="space-y-2">
                    {inst.media.map((item) => (
                      <li key={item.url}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-red hover:text-red-dark transition-colors inline-flex items-center gap-1"
                        >
                          {item.label}
                          <span aria-hidden="true">&rarr;</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`${SITE.basePath}/contact`}
            className="bg-red hover:bg-red-dark text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors"
          >
            Contact the Dojo
          </Link>
        </div>
      </section>
    </>
  );
}
