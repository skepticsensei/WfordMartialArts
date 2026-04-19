import Image from "next/image";
import { DISCIPLINES, HOSTED_GROUPS, SITE, SCHEDULE } from "@/lib/wmac-constants";

export const metadata = { title: "Dojo Ledger" };

const RICE = "#F7F3EB";
const INK = "#171717";
const RED = "#B21E2B";
const GRAY = "#CFC8BC";

export default function DojoLedger() {
  return (
    <div
      className="font-serif"
      style={{
        background: RICE,
        color: INK,
        fontFamily: "var(--font-noto-serif-jp), serif",
      }}
    >
      {/* Hero */}
      <section className="px-4 py-20 md:py-32 max-w-5xl mx-auto">
        <div className="text-center">
          <Image
            src="/logos/Weatherford_Martial_Arts.png"
            alt="WMAC seal"
            width={120}
            height={120}
            className="mx-auto mb-8"
          />
          <div
            className="text-[11px] tracking-[0.4em] uppercase mb-4"
            style={{ color: RED, fontFamily: "var(--font-inter), sans-serif" }}
          >
            Weatherford, Texas &mdash; Est. {SITE.name.length > 0 ? "2024" : ""}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Traditional Arts.
            <br />
            Timeless Discipline.
          </h1>
          <p
            className="mt-8 max-w-xl mx-auto text-base leading-relaxed opacity-70"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {SITE.description}
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            <a
              href="#"
              className="px-7 py-3 text-xs tracking-[0.3em] uppercase text-white transition-opacity hover:opacity-85"
              style={{ background: RED }}
            >
              Start Training
            </a>
            <a
              href="#"
              className="px-7 py-3 text-xs tracking-[0.3em] uppercase border transition-opacity hover:opacity-70"
              style={{ borderColor: INK, color: INK }}
            >
              View Schedule
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* Disciplines */}
      <section className="px-4 py-20 max-w-6xl mx-auto">
        <SectionHead eyebrow="Our Disciplines" title="Three Paths" />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {DISCIPLINES.map((d) => (
            <article key={d.slug} className="border p-8 bg-white" style={{ borderColor: GRAY }}>
              <div
                className="text-5xl mb-4"
                style={{ color: RED }}
              >
                {d.japanese.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold mb-1">{d.name}</h3>
              <div className="text-xs tracking-[0.25em] uppercase opacity-60 mb-4" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                {d.subtitle}
              </div>
              <p className="text-sm opacity-70 leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                {d.shortDescription}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Divider />

      {/* Hosted */}
      <section className="px-4 py-20 max-w-6xl mx-auto">
        <SectionHead eyebrow="Programs in Residence" title="Community Partners" />
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {HOSTED_GROUPS.map((g) => (
            <article key={g.slug} className="border p-8 bg-white flex gap-6 items-start" style={{ borderColor: GRAY }}>
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-[#F7F3EB]">
                <Image src={g.logo} alt={g.name} width={64} height={64} className="object-contain" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{g.name}</h3>
                {g.leader && (
                  <div className="text-xs tracking-[0.25em] uppercase opacity-60 mb-3" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    with {g.leader}
                  </div>
                )}
                <p className="text-sm opacity-70 leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  {g.shortDescription}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Divider />

      {/* Schedule teaser */}
      <section className="px-4 py-20 max-w-4xl mx-auto">
        <SectionHead eyebrow="Weekly Training" title="A Glimpse of the Week" />
        <div className="mt-10 border bg-white" style={{ borderColor: GRAY }}>
          {SCHEDULE.slice(0, 3).map((day) => (
            <div key={day.day} className="border-b last:border-b-0 px-6 py-4" style={{ borderColor: GRAY }}>
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="text-lg font-bold">{day.day}</h4>
                <span className="text-xs tracking-[0.25em] uppercase opacity-50" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  {day.classes.length} classes
                </span>
              </div>
              <ul className="text-sm opacity-70 space-y-1" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                {day.classes.map((c, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="w-16 tabular-nums">{c.time}</span>
                    <span>{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="py-16 text-center text-xs tracking-[0.3em] uppercase opacity-50" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {SITE.name} &middot; {SITE.address}
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <div
        className="text-xs tracking-[0.4em] uppercase mb-3"
        style={{ color: RED, fontFamily: "var(--font-inter), sans-serif" }}
      >
        {eyebrow}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
    </div>
  );
}

function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <hr style={{ borderColor: GRAY }} />
    </div>
  );
}
