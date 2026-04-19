import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/wmac-constants";

export const metadata: Metadata = {
  title: "Become a Community Partner",
  description:
    "Teach martial arts, movement, or wellness at Weatherford Martial Arts Center. Independent instructors and small programs welcome; community-minded rental rates in Weatherford, TX.",
  alternates: { canonical: "/partner" },
};

const offerings = [
  {
    heading: "A clean, matted training floor",
    body: "A professional dojo space kept in ready condition, suitable for martial arts, movement, yoga, and mind-body practices.",
  },
  {
    heading: "Flexible scheduling",
    body: "We work around our existing classes to find a time that fits your program, whether it's a weekly class, a recurring workshop, or an occasional seminar.",
  },
  {
    heading: "A shared community",
    body: "Your program gets visibility alongside our established martial arts and fitness offerings, and access to students who already value the training environment.",
  },
  {
    heading: "Community-minded rates",
    body: "Our pricing is structured to be genuinely accessible for independent instructors and small programs. We'd rather see the space used than sit empty.",
  },
];

export default function PartnerPage() {
  return (
    <>
      <section className="bg-ink pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-xs tracking-widest uppercase text-red mb-2">
            Become a Community Partner
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Teach Your Practice at WMAC
          </h1>
          <p className="font-serif text-lg text-rice/60 max-w-2xl mx-auto">
            Looking for a professional space to teach in Weatherford? We would love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <div className="space-y-6 text-ink/80 leading-relaxed mb-12">
          <p>
            Weatherford Martial Arts Center welcomes independent instructors and small programs
            who are looking for a facility to teach from. Whether you lead martial arts,
            functional movement, yoga, meditation, or a complementary discipline, the dojo may
            be a good fit for your work.
          </p>
          <p>
            We believe a dojo is strongest as part of a wider community of practice. Hosting
            other teachers broadens the options available to our students, supports instructors
            who are just starting out, and helps serve the Weatherford area well.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {offerings.map((item) => (
            <div key={item.heading} className="bg-white border border-gray p-6">
              <h2 className="font-serif text-lg font-bold text-ink mb-2">{item.heading}</h2>
              <p className="text-sm text-ink/70 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray p-6 md:p-8 mb-12">
          <h2 className="font-serif text-xl font-bold text-ink mb-3">Who this is for</h2>
          <ul className="space-y-2 text-sm text-ink/70">
            <li className="flex items-start gap-2">
              <span className="text-red mt-0.5">&#9656;</span>
              Independent martial arts or movement instructors ready to build their own program
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red mt-0.5">&#9656;</span>
              Visiting teachers offering workshops, seminars, or short-format intensives
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red mt-0.5">&#9656;</span>
              Small studios needing secondary space without the commitment of a long-term lease
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red mt-0.5">&#9656;</span>
              Wellness and mind-body practitioners looking for a calm, professional setting
            </li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-ink mb-3">Ready to talk?</h2>
          <p className="text-sm text-ink/60 mb-6 max-w-md mx-auto">
            Send us a note about what you teach and we&apos;ll schedule a time to walk through
            the space together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`${SITE.basePath}/contact`}
              className="bg-red hover:bg-red-dark text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors"
            >
              Reach Out
            </Link>
            <a
              href={`tel:${SITE.phone.replace(/\D/g, "")}`}
              className="border border-gray hover:border-red text-ink px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors"
            >
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
