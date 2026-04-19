import Image from "next/image";
import { DISCIPLINES, HOSTED_GROUPS, SITE, SCHEDULE } from "@/lib/wmac-constants";

export const metadata = { title: "Iron Tatami" };

const BG = "#0A0A0A";
const FG = "#E6E6E6";
const RED = "#E50914";
const STEEL = "#2A2A2A";
const CONCRETE = "#3A3A3A";

export default function IronTatami() {
  return (
    <div
      style={{
        background: BG,
        color: FG,
        backgroundImage: `linear-gradient(${STEEL} 1px, transparent 1px), linear-gradient(90deg, ${STEEL} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* Hero */}
      <section className="relative border-b px-4 py-24 md:py-36" style={{ borderColor: CONCRETE }}>
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute top-0 right-0 text-[10px] tracking-[0.3em] uppercase" style={{ color: RED }}>
            <span style={{ fontFamily: "var(--font-jetbrains), monospace" }}>/ WMAC — EST. 2024 — WEATHERFORD TX</span>
          </div>
          <div
            className="text-xs tracking-[0.4em] uppercase mb-6 pt-8"
            style={{ color: RED, fontFamily: "var(--font-jetbrains), monospace" }}
          >
            [ No. 01 ] &nbsp; Train hard. Train right.
          </div>
          <h1
            className="text-7xl md:text-[11rem] font-normal leading-[0.85] tracking-tight uppercase"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            Discipline
            <br />
            <span style={{ color: RED }}>Is Earned</span>
          </h1>
          <div className="mt-10 max-w-2xl grid grid-cols-[auto_1fr] gap-4 items-start">
            <div className="w-10 h-px mt-3" style={{ background: RED }} />
            <p className="text-lg leading-relaxed opacity-80">
              Japanese martial arts, taught without romance. Aikido, Judo, Daito Ryu Aikijujutsu.
              Show up, drill fundamentals, repeat. That&apos;s it.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-0">
            <a href="#" className="px-8 py-4 text-xs tracking-[0.3em] uppercase font-bold text-white hover:opacity-80" style={{ background: RED }}>
              Book a Trial
            </a>
            <a href="#" className="px-8 py-4 text-xs tracking-[0.3em] uppercase font-bold border border-l-0 hover:bg-white/5" style={{ borderColor: CONCRETE }}>
              Class Schedule
            </a>
          </div>
        </div>
      </section>

      {/* Disciplines — tactical cards */}
      <section className="border-b px-4 py-20" style={{ borderColor: CONCRETE }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: RED, fontFamily: "var(--font-jetbrains), monospace" }}>
                / Sec.02 / Disciplines
              </div>
              <h2 className="text-5xl md:text-7xl font-normal uppercase leading-none" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                Pick Your Fight
              </h2>
            </div>
            <div className="text-xs tracking-widest uppercase opacity-50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              [03 programs]
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-0 border" style={{ borderColor: CONCRETE }}>
            {DISCIPLINES.map((d, i) => (
              <article
                key={d.slug}
                className="p-8 border-r last:border-r-0 border-b md:border-b-0 hover:bg-white/5 transition-colors"
                style={{ borderColor: CONCRETE }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="text-xs tracking-[0.3em] uppercase"
                    style={{ color: RED, fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    0{i + 1}
                  </div>
                  <div className="text-3xl opacity-30" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>{d.japanese.charAt(0)}</div>
                </div>
                <h3 className="text-4xl uppercase leading-none mb-2" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                  {d.name}
                </h3>
                <div className="text-xs tracking-widest uppercase opacity-60 mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  {d.subtitle}
                </div>
                <p className="text-sm leading-relaxed opacity-70 mb-6">{d.shortDescription}</p>
                <div className="pt-4 border-t flex items-center justify-between text-xs tracking-widest uppercase" style={{ borderColor: CONCRETE }}>
                  <span className="opacity-50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>View.spec</span>
                  <span style={{ color: RED }}>&rarr;</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Hosted */}
      <section className="border-b px-4 py-20" style={{ borderColor: CONCRETE }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: RED, fontFamily: "var(--font-jetbrains), monospace" }}>
            / Sec.03 / In Residence
          </div>
          <h2 className="text-5xl md:text-7xl font-normal uppercase leading-none mb-12" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
            Affiliates
          </h2>
          <div className="grid md:grid-cols-2 gap-0 border" style={{ borderColor: CONCRETE }}>
            {HOSTED_GROUPS.map((g) => (
              <article key={g.slug} className="p-8 border-r last:border-r-0 border-b md:border-b-0 flex gap-6 items-start" style={{ borderColor: CONCRETE }}>
                <div className="w-20 h-20 flex-shrink-0 bg-white/5 flex items-center justify-center border" style={{ borderColor: CONCRETE }}>
                  <Image src={g.logo} alt={g.name} width={56} height={56} className="object-contain" />
                </div>
                <div>
                  <h3 className="text-3xl uppercase leading-none mb-2" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>{g.name}</h3>
                  {g.leader && (
                    <div className="text-xs tracking-widest uppercase mb-3" style={{ color: RED, fontFamily: "var(--font-jetbrains), monospace" }}>
                      w/ {g.leader}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed opacity-70">{g.shortDescription}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="border-b px-4 py-20" style={{ borderColor: CONCRETE }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: RED, fontFamily: "var(--font-jetbrains), monospace" }}>
            / Sec.04 / Mat Time
          </div>
          <h2 className="text-5xl md:text-7xl font-normal uppercase leading-none mb-12" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
            This Week
          </h2>
          <div className="border" style={{ borderColor: CONCRETE }}>
            {SCHEDULE.map((day) => (
              <div key={day.day} className="grid grid-cols-[140px_1fr] border-b last:border-b-0" style={{ borderColor: CONCRETE }}>
                <div className="p-4 border-r uppercase text-sm tracking-widest font-bold" style={{ borderColor: CONCRETE, background: "#151515" }}>
                  {day.day}
                </div>
                <div className="flex flex-wrap gap-0">
                  {day.classes.map((c, i) => (
                    <div key={i} className="p-4 text-sm border-r last:border-r-0 flex items-baseline gap-3" style={{ borderColor: CONCRETE }}>
                      <span className="text-xs opacity-50 tabular-nums" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{c.time}</span>
                      <span className="font-bold uppercase tracking-wide text-xs">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 relative" style={{ background: RED }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-6xl md:text-[10rem] font-normal uppercase leading-none" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
            Step on the Mat.
          </h2>
          <p className="mt-6 text-base opacity-90 max-w-xl mx-auto">
            First class is free. Wear something you can sweat in. {SITE.phone}.
          </p>
          <a href="#" className="inline-block mt-8 px-10 py-4 text-xs tracking-[0.3em] uppercase font-bold bg-black text-white hover:opacity-80">
            Book It
          </a>
        </div>
      </section>

      <div className="py-10 text-center text-xs tracking-[0.4em] uppercase opacity-40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
        // {SITE.name} — {SITE.address}
      </div>
    </div>
  );
}
