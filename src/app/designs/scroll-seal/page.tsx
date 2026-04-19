import Image from "next/image";
import { DISCIPLINES, HOSTED_GROUPS, SITE, SCHEDULE } from "@/lib/wmac-constants";

export const metadata = { title: "Scroll & Seal" };

const PARCHMENT = "#F4E8D4";
const PARCHMENT_DEEP = "#EADAC0";
const UMBER = "#2B1810";
const CRIMSON = "#8B1A1A";
const GOLD = "#B8860B";

export default function ScrollSeal() {
  return (
    <div
      style={{
        background: PARCHMENT,
        color: UMBER,
        fontFamily: "var(--font-playfair), serif",
        backgroundImage: `radial-gradient(${PARCHMENT_DEEP} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Hero */}
      <section className="px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <Ornament />
          <div className="text-xs tracking-[0.5em] uppercase my-6" style={{ color: GOLD }}>
            Anno Domini MMXXIV &middot; Weatherford
          </div>
          <h1
            className="text-5xl md:text-8xl leading-[1.05] italic"
            style={{ color: CRIMSON, fontWeight: 400, fontStyle: "italic" }}
          >
            Of Harmony,
            <br />
            Balance,
            <br />
            and Breath.
          </h1>
          <div className="my-8 flex justify-center">
            <Image src="/logos/Weatherford_Martial_Arts.png" alt="seal" width={100} height={100} />
          </div>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto opacity-80">
            A house of traditional Japanese budō, where Aikidō, Jūdō, and the classical
            Daitō-ryū Aikijūjutsu are taught with reverence for their origins and care for those
            who practice them.
          </p>
          <Ornament />
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="px-8 py-3 text-xs tracking-[0.4em] uppercase text-white transition-opacity hover:opacity-90"
              style={{ background: CRIMSON, fontFamily: "var(--font-inter), sans-serif" }}
            >
              Request Admission
            </a>
            <a
              href="#"
              className="px-8 py-3 text-xs tracking-[0.4em] uppercase border-2 transition-opacity hover:opacity-70"
              style={{ borderColor: UMBER, color: UMBER, fontFamily: "var(--font-inter), sans-serif" }}
            >
              Read the Schedule
            </a>
          </div>
        </div>
      </section>

      <OrnateRule />

      {/* Disciplines */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <SectionHead roman="I" title="The Disciplines" subtitle="Three paths; one dōjō." />
          <div className="mt-14 space-y-12">
            {DISCIPLINES.map((d, i) => (
              <article
                key={d.slug}
                className="grid md:grid-cols-[120px_1fr] gap-8 items-start"
              >
                <div className="text-center">
                  <div
                    className="text-7xl leading-none"
                    style={{ color: CRIMSON, fontFamily: "var(--font-playfair), serif" }}
                  >
                    {d.japanese.charAt(0)}
                  </div>
                  <div className="mt-2 text-xs tracking-[0.3em] uppercase" style={{ color: GOLD, fontFamily: "var(--font-inter), sans-serif" }}>
                    Ch. {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl italic" style={{ color: CRIMSON }}>{d.name}</h3>
                  <div className="text-sm tracking-widest uppercase mt-1 mb-4" style={{ color: GOLD, fontFamily: "var(--font-inter), sans-serif" }}>
                    {d.subtitle}
                  </div>
                  <p className="text-base leading-relaxed opacity-85">{d.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <OrnateRule />

      {/* Hosted */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <SectionHead roman="II" title="Houses in Residence" subtitle="Esteemed programs, hosted under our roof." />
          <div className="mt-14 grid md:grid-cols-2 gap-10">
            {HOSTED_GROUPS.map((g) => (
              <article key={g.slug} className="text-center" style={{ background: PARCHMENT_DEEP }}>
                <div className="p-8 border-2" style={{ borderColor: GOLD }}>
                  <div className="flex justify-center mb-6">
                    <Image src={g.logo} alt={g.name} width={100} height={100} className="object-contain" />
                  </div>
                  <h3 className="text-2xl italic mb-1" style={{ color: CRIMSON }}>{g.name}</h3>
                  {g.leader && (
                    <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: GOLD, fontFamily: "var(--font-inter), sans-serif" }}>
                      w/ {g.leader}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed opacity-80">{g.shortDescription}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <OrnateRule />

      {/* Schedule */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <SectionHead roman="III" title="The Weekly Ledger" subtitle="Training days and appointed hours." />
          <div className="mt-14 border-2 p-8" style={{ borderColor: GOLD, background: PARCHMENT_DEEP }}>
            {SCHEDULE.map((day, i) => (
              <div key={day.day} className={`py-4 ${i < SCHEDULE.length - 1 ? "border-b" : ""}`} style={{ borderColor: `${GOLD}55` }}>
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-2xl italic" style={{ color: CRIMSON }}>{day.day}</h4>
                  <div className="text-xs tracking-[0.3em] uppercase" style={{ color: GOLD, fontFamily: "var(--font-inter), sans-serif" }}>
                    {day.classes.length} sittings
                  </div>
                </div>
                <ul className="space-y-1 text-sm opacity-85" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  {day.classes.map((c, j) => (
                    <li key={j} className="flex gap-4">
                      <span className="tabular-nums w-20" style={{ color: GOLD }}>{c.time}</span>
                      <span>{c.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing seal */}
      <section className="px-4 py-24 text-center">
        <Ornament />
        <h2 className="text-4xl md:text-6xl italic mt-6" style={{ color: CRIMSON }}>
          Come, be welcomed.
        </h2>
        <p className="mt-6 opacity-80 max-w-xl mx-auto">
          An introductory session is offered without fee. Ring {SITE.phone} or send word to
          {" "}{SITE.email}.
        </p>
        <Ornament />
      </section>

      <div className="py-10 text-center text-xs tracking-[0.4em] uppercase" style={{ color: GOLD, fontFamily: "var(--font-inter), sans-serif" }}>
        {SITE.name} &diams; {SITE.address}
      </div>
    </div>
  );
}

function SectionHead({ roman, title, subtitle }: { roman: string; title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <div className="text-5xl italic" style={{ color: GOLD }}>{roman}.</div>
      <h2 className="text-4xl md:text-5xl italic mt-2" style={{ color: CRIMSON }}>{title}</h2>
      <div className="text-sm tracking-widest uppercase opacity-70 mt-3" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {subtitle}
      </div>
    </div>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 opacity-60" style={{ color: GOLD }}>
      <span>&#10086;</span>
      <span className="h-px w-20" style={{ background: GOLD }} />
      <span>&#10057;</span>
      <span className="h-px w-20" style={{ background: GOLD }} />
      <span>&#10086;</span>
    </div>
  );
}

function OrnateRule() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center gap-4 py-2">
        <div className="flex-1 h-px" style={{ background: GOLD, opacity: 0.4 }} />
        <div className="text-xl" style={{ color: GOLD }}>&diams;</div>
        <div className="flex-1 h-px" style={{ background: GOLD, opacity: 0.4 }} />
      </div>
    </div>
  );
}
