import Image from "next/image";
import { DISCIPLINES, HOSTED_GROUPS, SITE, SCHEDULE } from "@/lib/wmac-constants";

export const metadata = { title: "Zen Grid" };

const BG = "#FFFFFF";
const FG = "#111111";
const MUTED = "#888888";
const RULE = "#EAEAEA";
const DOT = "#E50914";

const MONO = "var(--font-jetbrains), ui-monospace, monospace";
const SANS = "var(--font-inter), sans-serif";

export default function ZenGrid() {
  return (
    <div style={{ background: BG, color: FG, fontFamily: SANS }}>
      {/* Meta strip */}
      <div className="border-b" style={{ borderColor: RULE }}>
        <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-12 gap-4 text-xs tracking-widest uppercase" style={{ fontFamily: MONO, color: MUTED }}>
          <div className="col-span-6 md:col-span-3">WMAC / 2026</div>
          <div className="hidden md:block md:col-span-3">Weatherford, TX</div>
          <div className="hidden md:block md:col-span-3">3 arts &middot; 6 days</div>
          <div className="col-span-6 md:col-span-3 text-right">v.01</div>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b" style={{ borderColor: RULE }}>
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-40 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-2 text-xs tracking-widest uppercase" style={{ fontFamily: MONO, color: MUTED }}>
            &sect; 00
            <br />
            Intro
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="text-6xl md:text-[7rem] font-medium leading-[0.95] tracking-tight">
              A martial arts
              <br />
              center<span style={{ color: DOT }}>.</span> In
              <br />
              Weatherford.
            </h1>
          </div>
          <div className="col-span-12 md:col-start-3 md:col-span-7 mt-10">
            <p className="text-xl leading-relaxed" style={{ color: MUTED }}>
              Aikido. Judo. Daito Ryu Aikijujutsu. Plus karate and wellness in residence.
              Come train. Leave better at one thing than you were this morning.
            </p>
          </div>
          <div className="col-span-12 md:col-start-3 md:col-span-7 mt-12 flex flex-wrap gap-0 border-t" style={{ borderColor: RULE }}>
            <a
              href="#"
              className="flex-1 min-w-[200px] py-5 px-6 flex items-center justify-between border-r hover:bg-neutral-50 transition-colors"
              style={{ borderColor: RULE }}
            >
              <span className="text-sm">Book first class</span>
              <span style={{ color: MUTED }}>&rarr;</span>
            </a>
            <a
              href="#"
              className="flex-1 min-w-[200px] py-5 px-6 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <span className="text-sm">View schedule</span>
              <span style={{ color: MUTED }}>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="border-b" style={{ borderColor: RULE }}>
        <div className="max-w-6xl mx-auto px-4 py-24 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-2 text-xs tracking-widest uppercase mb-8" style={{ fontFamily: MONO, color: MUTED }}>
            &sect; 01
            <br />
            Disciplines
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-14">
              Three paths. Pick the one that fits<span style={{ color: DOT }}>.</span>
            </h2>
            <div className="divide-y" style={{ borderColor: RULE }}>
              {DISCIPLINES.map((d, i) => (
                <article
                  key={d.slug}
                  className="py-10 grid grid-cols-12 gap-4 items-start border-t"
                  style={{ borderColor: RULE }}
                >
                  <div className="col-span-12 md:col-span-2 text-xs tracking-widest uppercase" style={{ fontFamily: MONO, color: MUTED }}>
                    {String(i + 1).padStart(2, "0")} / {d.japanese}
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <h3 className="text-3xl font-medium mb-1">{d.name}</h3>
                    <div className="text-sm mb-4" style={{ color: MUTED }}>{d.subtitle}</div>
                    <p className="leading-relaxed" style={{ color: MUTED }}>{d.shortDescription}</p>
                  </div>
                  <div className="col-span-12 md:col-span-3 md:col-start-10 text-sm flex items-center gap-2 md:justify-end hover:underline cursor-pointer">
                    Learn more <span style={{ color: DOT }}>&rarr;</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hosted */}
      <section className="border-b" style={{ borderColor: RULE }}>
        <div className="max-w-6xl mx-auto px-4 py-24 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-2 text-xs tracking-widest uppercase mb-8" style={{ fontFamily: MONO, color: MUTED }}>
            &sect; 02
            <br />
            In residence
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-14">
              Two more reasons to drop in<span style={{ color: DOT }}>.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-0">
              {HOSTED_GROUPS.map((g, i) => (
                <article key={g.slug} className={`p-8 ${i === 0 ? "md:border-r" : ""} border-t`} style={{ borderColor: RULE }}>
                  <div className="flex items-center gap-4 mb-4">
                    <Image src={g.logo} alt={g.name} width={56} height={56} className="object-contain" />
                    <div>
                      <h3 className="text-xl font-medium">{g.name}</h3>
                      {g.leader && (
                        <div className="text-xs tracking-widest uppercase mt-0.5" style={{ fontFamily: MONO, color: MUTED }}>
                          {g.leader}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{g.shortDescription}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="border-b" style={{ borderColor: RULE }}>
        <div className="max-w-6xl mx-auto px-4 py-24 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-2 text-xs tracking-widest uppercase mb-8" style={{ fontFamily: MONO, color: MUTED }}>
            &sect; 03
            <br />
            Week
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-14">
              Mon&ndash;Sat, as scheduled<span style={{ color: DOT }}>.</span>
            </h2>
            <div className="border" style={{ borderColor: RULE }}>
              <div className="grid grid-cols-[100px_1fr] border-b" style={{ borderColor: RULE, fontFamily: MONO }}>
                <div className="py-3 px-4 text-xs tracking-widest uppercase border-r" style={{ borderColor: RULE, color: MUTED }}>Day</div>
                <div className="py-3 px-4 text-xs tracking-widest uppercase" style={{ color: MUTED }}>Classes</div>
              </div>
              {SCHEDULE.map((day, i) => (
                <div
                  key={day.day}
                  className={`grid grid-cols-[100px_1fr] ${i < SCHEDULE.length - 1 ? "border-b" : ""}`}
                  style={{ borderColor: RULE }}
                >
                  <div className="py-4 px-4 text-sm border-r tracking-widest uppercase" style={{ borderColor: RULE, fontFamily: MONO }}>
                    {day.day.slice(0, 3)}
                  </div>
                  <div className="py-4 px-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {day.classes.map((c, j) => (
                      <span key={j} className="inline-flex items-baseline gap-2">
                        <span className="tabular-nums text-xs" style={{ color: MUTED, fontFamily: MONO }}>{c.time}</span>
                        <span>{c.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b" style={{ borderColor: RULE }}>
        <div className="max-w-6xl mx-auto px-4 py-24 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-2 text-xs tracking-widest uppercase" style={{ fontFamily: MONO, color: MUTED }}>
            &sect; 04
            <br />
            Begin
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight">
              Show up once<span style={{ color: DOT }}>.</span>
              <br />
              See how it feels.
            </h2>
            <div className="mt-10 grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: MONO, color: MUTED }}>Call</div>
                <a href={`tel:${SITE.phone}`} className="hover:underline">{SITE.phone}</a>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: MONO, color: MUTED }}>Write</div>
                <a href={`mailto:${SITE.email}`} className="hover:underline">{SITE.email}</a>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: MONO, color: MUTED }}>Visit</div>
                {SITE.address}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-xs tracking-widest uppercase flex justify-between items-center" style={{ fontFamily: MONO, color: MUTED }}>
        <span>&copy; WMAC 2026</span>
        <span>Zen Grid &mdash; v.01</span>
      </footer>
    </div>
  );
}
