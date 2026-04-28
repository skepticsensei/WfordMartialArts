"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Accent = "red" | "teal" | "purple" | "ink";

interface KioskProgramCardProps {
  name: string;
  logo: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  accent: Accent;
  leader?: string;
  instructor?: { name: string; title: string; bio: string };
}

const ACCENT: Record<
  Accent,
  { border: string; bullet: string; closeBg: string; closeHover: string }
> = {
  red: {
    border: "border-red/30",
    bullet: "text-red",
    closeBg: "bg-red",
    closeHover: "hover:bg-red-dark",
  },
  teal: {
    border: "border-teal/30",
    bullet: "text-teal",
    closeBg: "bg-teal",
    closeHover: "hover:bg-ink",
  },
  purple: {
    border: "border-purple/30",
    bullet: "text-purple",
    closeBg: "bg-purple",
    closeHover: "hover:bg-ink",
  },
  ink: {
    border: "border-ink/30",
    bullet: "text-ink",
    closeBg: "bg-ink",
    closeHover: "hover:bg-red",
  },
};

const ANIM_MS = 600;

export default function KioskProgramCard({
  name,
  logo,
  shortDescription,
  description,
  highlights,
  accent,
  leader,
  instructor,
}: KioskProgramCardProps) {
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [closing, setClosing] = useState(false);
  const a = ACCENT[accent];

  useEffect(() => {
    if (open) {
      setRendered(true);
      setClosing(false);
    } else if (rendered) {
      setClosing(true);
      const t = window.setTimeout(() => {
        setRendered(false);
        setClosing(false);
      }, ANIM_MS);
      return () => window.clearTimeout(t);
    }
  }, [open, rendered]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const close = () => setOpen(false);
    let idleTimer: number | undefined;
    const resetIdle = () => {
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(close, 60_000);
    };
    const activity: (keyof WindowEventMap)[] = ["pointerdown", "touchstart", "keydown", "scroll"];
    window.addEventListener("keydown", onKey);
    window.addEventListener("kiosk:idle-reset", close as EventListener);
    activity.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));
    resetIdle();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("kiosk:idle-reset", close as EventListener);
      activity.forEach((e) => window.removeEventListener(e, resetIdle));
      if (idleTimer) window.clearTimeout(idleTimer);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group flex flex-col h-full w-full text-left bg-white border ${a.border} p-6 md:p-8 transition-all hover:shadow-lg active:shadow-md`}
      >
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={logo}
            alt={name}
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
          <div>
            <h3 className="font-serif text-lg font-bold text-ink">{name}</h3>
            {leader && <div className="text-sm text-ink/50">with {leader}</div>}
          </div>
        </div>
        <p className="text-sm text-ink/70 leading-relaxed">{shortDescription}</p>
        <div className={`mt-auto pt-4 text-xs font-medium tracking-wide uppercase ${a.bullet}`}>
          Tap for more &rarr;
        </div>
      </button>

      {rendered && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={name}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-[600ms] ease-out ${closing ? "opacity-0" : "opacity-100 starting:opacity-0"}`}
          />
          <div
            className={`relative bg-rice border border-gray w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-10 transition-all duration-[600ms] ease-out ${closing ? "opacity-0 scale-95" : "opacity-100 scale-100 starting:opacity-0 starting:scale-95"}`}
          >
            <div className="flex items-start gap-4 mb-6">
              <Image
                src={logo}
                alt={name}
                width={120}
                height={120}
                className="w-20 h-20 md:w-28 md:h-28 object-contain shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink leading-tight">
                  {name}
                </h3>
                {leader && (
                  <div className="text-sm md:text-base text-ink/60 mt-1">with {leader}</div>
                )}
              </div>
            </div>

            <p className="text-ink/80 leading-relaxed mb-6 text-sm md:text-base">
              {description}
            </p>

            {highlights.length > 0 && (
              <div className="bg-white border border-gray p-4 md:p-5 mb-6">
                <h4 className="font-serif text-base md:text-lg font-bold text-ink mb-3">
                  Program Highlights
                </h4>
                <ul className="space-y-2">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm md:text-base text-ink/75">
                      <span className={`${a.bullet} mt-0.5`}>&#9656;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {instructor && (
              <div className="bg-white border border-gray p-4 md:p-5 mb-6">
                <h4 className="font-serif text-base md:text-lg font-bold text-ink mb-1">
                  About the Instructor
                </h4>
                <div className="text-sm md:text-base text-ink font-medium">
                  {instructor.name}
                </div>
                <div className="text-xs md:text-sm text-ink/60 mb-3">
                  {instructor.title}
                </div>
                <p className="text-sm md:text-base text-ink/75 leading-relaxed">
                  {instructor.bio}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className={`block w-full ${a.closeBg} ${a.closeHover} text-white px-6 py-4 text-sm md:text-base font-medium tracking-wide uppercase transition-colors`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
