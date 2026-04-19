import Link from "next/link";
import Hero from "@/components/wmac/Hero";
import DisciplineCard from "@/components/wmac/DisciplineCard";
import ProgramCard from "@/components/wmac/ProgramCard";
import ScheduleTable from "@/components/wmac/ScheduleTable";
import { SITE, DISCIPLINES, HOSTED_GROUPS, FAQS } from "@/lib/wmac-constants";

const justMove = HOSTED_GROUPS.find((g) => g.slug === "just-move");

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Disciplines */}
      <section id="disciplines" className="max-w-6xl mx-auto px-4 py-16 md:py-20 scroll-mt-24">
        <div className="text-center mb-10">
          <div className="text-xs tracking-widest uppercase text-red mb-2">
            Our Disciplines
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
            Traditional Japanese Martial Arts
          </h2>
          <p className="mt-3 text-ink/50 max-w-xl mx-auto text-sm">
            Three complementary paths rooted in centuries of tradition, each offering a unique approach to self-development and self-defense.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DISCIPLINES.map((d) => (
            <DisciplineCard key={d.slug} {...d} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-gray" />
      </div>

      {/* Hosted Programs */}
      <section id="programs" className="max-w-6xl mx-auto px-4 py-16 md:py-20 scroll-mt-24">
        <div className="text-center mb-10">
          <div className="text-xs tracking-widest uppercase text-red mb-2">
            Programs in Residence
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
            Our Community Partners
          </h2>
          <p className="mt-3 text-ink/50 max-w-xl mx-auto text-sm">
            We proudly host these programs at our facility, expanding the range of training and wellness options available to our community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HOSTED_GROUPS.map((g) => (
            <ProgramCard key={g.slug} {...g} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-ink/60 mb-3">
            Teach martial arts, movement, or wellness? Our space is open to new partners.
          </p>
          <Link
            href={`${SITE.basePath}/partner`}
            className="inline-block border border-ink/20 hover:border-red hover:text-red text-ink px-5 py-2.5 text-xs font-medium tracking-wide uppercase transition-colors"
          >
            Become a Community Partner
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-gray" />
      </div>

      {/* Weekly Schedule */}
      <section id="schedule" className="max-w-6xl mx-auto px-4 py-16 md:py-20 scroll-mt-24">
        <div className="text-center mb-10">
          <div className="text-xs tracking-widest uppercase text-red mb-2">
            Class Times
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
            Weekly Schedule
          </h2>
        </div>

        <div className="bg-white border border-gray p-6 md:p-8 mb-6">
          <ScheduleTable />
        </div>

        <div className="flex flex-wrap gap-3 text-xs mb-6">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-ink/10 border border-ink/20"></span>
            Martial Arts
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-red-light border border-red/20"></span>
            Karate University
          </span>
        </div>

        {justMove?.externalUrl && (
          <div className="bg-teal/5 border border-teal/20 p-4 mb-8 text-sm text-ink/70">
            <strong className="text-ink">Just Move Fitness</strong> classes are
            also held at this facility on a separate schedule.{" "}
            <a
              href={justMove.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              See Autumn&apos;s site for current class times
            </a>
            .
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-ink/50 mb-4">
            Schedule subject to change. Contact us for the most current information.
          </p>
          <Link
            href={`${SITE.basePath}/contact`}
            className="inline-block bg-red hover:bg-red-dark text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors"
          >
            Book a Class
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-gray" />
      </div>

      {/* Start Here CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="bg-ink p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            New to Martial Arts?
          </h2>
          <p className="text-rice/60 max-w-lg mx-auto mb-6 text-sm leading-relaxed">
            No experience needed. We&apos;ll help you find the right art, prepare for your first class, and begin your journey with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`${SITE.basePath}/start-here`}
              className="bg-red hover:bg-red-dark text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors"
            >
              Start Here
            </Link>
            <Link
              href={`${SITE.basePath}/contact`}
              className="border border-rice/30 hover:border-rice/60 text-rice px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-gray" />
      </div>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-10">
          <div className="text-xs tracking-widest uppercase text-red mb-2">
            Common Questions
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
            Frequently Asked
          </h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-4">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="group bg-white border border-gray p-4 md:p-5"
            >
              <summary className="font-serif font-medium text-ink cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <span className="text-red text-lg ml-4 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
