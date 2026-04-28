import Image from "next/image";
import KioskProgramCard from "@/components/wmac/KioskProgramCard";
import QuoteRotator from "@/components/wmac/QuoteRotator";
import PhotoSlideshow from "@/components/wmac/PhotoSlideshow";
import UpcomingClass from "@/components/wmac/UpcomingClass";
import GlossaryRotator from "@/components/wmac/GlossaryRotator";
import { SITE, HOSTED_GROUPS, PEACEFUL_STORM, QUOTES, DOJO_TERMS } from "@/lib/wmac-constants";
import { getKioskPhotos } from "@/lib/kiosk-photos";

export default function KioskHomePage() {
  const photos = getKioskPhotos();

  return (
    <>
      <section className="relative overflow-hidden bg-ink">

        <div className="relative max-w-6xl mx-auto px-4 pt-3 pb-5 md:pt-4 md:pb-6 flex flex-col items-center text-center">
          <Image
            src="/logos/Weatherford_Martial_Arts.png"
            alt="Weatherford Martial Arts Center seal"
            width={320}
            height={320}
            className="w-40 h-40 md:w-56 md:h-56 mb-2"
            priority
          />
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-1">
            Weatherford <span className="text-red">Martial Arts</span> Center
          </h1>
          <p className="font-serif text-sm md:text-base text-rice/60 italic">
            {SITE.tagline}
          </p>
        </div>
      </section>

      <QuoteRotator quotes={QUOTES} />

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-4 pt-1 pb-4 md:pt-2 md:pb-6">
        <PhotoSlideshow photos={photos} />
      </section>

      <UpcomingClass />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-gray" />
      </div>

      {/* Hosted Programs */}
      <section id="programs" className="max-w-6xl mx-auto px-4 py-6 md:py-8 scroll-mt-24">
        <div className="text-center mb-5">
          <div className="text-xs tracking-widest uppercase text-red mb-1">
            On the Mat
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink">
            What&rsquo;s Practiced Here
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <KioskProgramCard {...PEACEFUL_STORM} />
          {HOSTED_GROUPS.map((g) => (
            <KioskProgramCard key={g.slug} {...g} />
          ))}
        </div>
      </section>

      <GlossaryRotator terms={DOJO_TERMS} />
    </>
  );
}
