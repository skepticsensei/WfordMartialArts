import Image from "next/image";
import { DISCIPLINES, HOSTED_GROUPS, SITE, SCHEDULE } from "@/lib/wmac-constants";

export const metadata = { title: "Kodo" };

const INDIGO = "#1A1B3A";
const GOLD = "#FFD700";
const CYAN = "#00F0FF";
const MAGENTA = "#E91E63";

export default function Kodo() {
  return (
    <div
      className="text-white overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 20% 0%, ${MAGENTA}22 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, ${CYAN}22 0%, transparent 50%), ${INDIGO}`,
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* Hero */}
      <section className="px-4 py-20 md:py-32 relative">
        <div className="max-w-6xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-widest uppercase mb-8 border backdrop-blur-sm"
            style={{ borderColor: `${GOLD}44`, background: `${GOLD}11`, color: GOLD }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
            Now enrolling &middot; Spring cohort
          </div>
          <h1 className="text-6xl md:text-[9rem] font-black leading-[0.9] tracking-tighter">
            Move with
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${GOLD}, ${MAGENTA}, ${CYAN})`,
              }}
            >
              intention.
            </span>
          </h1>
          <div className="mt-10 grid md:grid-cols-[2fr_1fr] gap-8 items-end max-w-5xl">
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              Centuries-old arts, modern training. Aikido, Judo, Daito Ryu &mdash; plus wellness and
              karate &mdash; under one roof in Weatherford.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <div className="text-4xl font-bold tabular-nums" style={{ color: GOLD }}>3</div>
                <div className="text-white/60 uppercase tracking-widest text-xs mt-1">Disciplines</div>
              </div>
              <div>
                <div className="text-4xl font-bold tabular-nums" style={{ color: CYAN }}>6</div>
                <div className="text-white/60 uppercase tracking-widest text-xs mt-1">Days / week</div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#"
              className="relative group overflow-hidden px-8 py-4 rounded-full font-bold text-black hover:scale-105 transition-transform"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${MAGENTA})` }}
            >
              <span className="relative z-10">Start 7-Day Trial &rarr;</span>
            </a>
            <a
              href="#"
              className="px-8 py-4 rounded-full font-bold border text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: `${CYAN}66`, color: CYAN }}
            >
              Watch Intro
            </a>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="text-xs tracking-widest uppercase mb-2" style={{ color: CYAN }}>
                01 &mdash; Paths
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight">
                What do you want to <span style={{ color: GOLD }}>master</span>?
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {DISCIPLINES.map((d, i) => {
              const accent = [GOLD, CYAN, MAGENTA][i];
              return (
                <article
                  key={d.slug}
                  className="relative p-8 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/30 transition-colors"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${accent}22, transparent 60%)` }}
                  />
                  <div className="relative">
                    <div
                      className="text-7xl mb-6 font-black leading-none"
                      style={{ color: accent }}
                    >
                      {d.japanese.charAt(0)}
                    </div>
                    <div className="text-xs tracking-widest uppercase mb-2" style={{ color: accent }}>
                      0{i + 1} / {d.subtitle}
                    </div>
                    <h3 className="text-3xl font-bold mb-3">{d.name}</h3>
                    <p className="text-sm text-white/70 leading-relaxed mb-6">{d.shortDescription}</p>
                    <div className="flex items-center gap-2 text-sm font-bold group-hover:gap-4 transition-all" style={{ color: accent }}>
                      Explore <span>&rarr;</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hosted */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs tracking-widest uppercase mb-2" style={{ color: CYAN }}>
            02 &mdash; Also here
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-12">
            Programs in <span style={{ color: MAGENTA }}>residence</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {HOSTED_GROUPS.map((g) => {
              const accent = g.accent === "red" ? MAGENTA : CYAN;
              return (
                <article
                  key={g.slug}
                  className="p-8 rounded-3xl border border-white/10 backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="flex items-start gap-5 mb-5">
                    <div
                      className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center"
                      style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}
                    >
                      <Image src={g.logo} alt={g.name} width={56} height={56} className="object-contain" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{g.name}</h3>
                      {g.leader && (
                        <div className="text-sm mt-1" style={{ color: accent }}>
                          with {g.leader}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{g.shortDescription}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs tracking-widest uppercase mb-2" style={{ color: CYAN }}>
            03 &mdash; This week
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-12">
            Ready when <span style={{ color: GOLD }}>you are</span>.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {SCHEDULE.map((day) => (
              <div
                key={day.day}
                className="p-5 rounded-2xl border border-white/10"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="text-xs tracking-widest uppercase font-bold mb-3" style={{ color: GOLD }}>
                  {day.day.slice(0, 3)}
                </div>
                <ul className="space-y-2">
                  {day.classes.map((c, i) => (
                    <li key={i}>
                      <div className="text-xs tabular-nums text-white/50">{c.time}</div>
                      <div className="text-sm font-bold leading-tight">{c.name}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div
          className="max-w-6xl mx-auto rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${MAGENTA}, ${GOLD}, ${CYAN})`,
          }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-none">
            Your first class
            <br />
            is on us.
          </h2>
          <p className="text-black/80 mt-6 max-w-xl mx-auto text-lg">
            Show up once. Decide from there. Call {SITE.phone} or tap below.
          </p>
          <a
            href="#"
            className="inline-block mt-8 px-10 py-4 rounded-full font-bold bg-black text-white hover:scale-105 transition-transform"
          >
            Claim Free Class &rarr;
          </a>
        </div>
      </section>

      <div className="py-10 text-center text-xs tracking-widest uppercase text-white/40">
        {SITE.name} &middot; {SITE.address}
      </div>
    </div>
  );
}
