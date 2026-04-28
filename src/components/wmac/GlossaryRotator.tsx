"use client";

import { useEffect, useRef, useState } from "react";
import type { DojoTerm } from "@/lib/wmac-constants";

const INTERVAL_MS = 60_000;
const FADE_MS = 2_500;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GlossaryRotator({ terms }: { terms: DojoTerm[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const orderRef = useRef<number[]>(terms.map((_, i) => i));
  const posRef = useRef(0);

  useEffect(() => {
    if (terms.length < 2) return;
    const initial = terms.map((_, i) => i);
    const first = initial[0];
    const rest = initial.filter((i) => i !== first);
    orderRef.current = [first, ...shuffle(rest)];
    posRef.current = 0;

    const id = window.setInterval(() => {
      const next = posRef.current + 1;
      if (next < orderRef.current.length) {
        posRef.current = next;
      } else {
        const last = orderRef.current[orderRef.current.length - 1];
        const reshuffled = shuffle(orderRef.current);
        if (reshuffled[0] === last && reshuffled.length > 1) {
          [reshuffled[0], reshuffled[1]] = [reshuffled[1], reshuffled[0]];
        }
        orderRef.current = reshuffled;
        posRef.current = 0;
      }
      setCurrentIdx(orderRef.current[posRef.current]);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [terms]);

  if (terms.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-ink py-10 md:py-14">
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <div className="text-xs tracking-widest uppercase text-red mb-6">
          From the Lexicon
        </div>
        <div className="grid">
          {terms.map((t, i) => (
            <div
              key={i}
              className="transition-opacity ease-in-out"
              style={{
                gridColumn: 1,
                gridRow: 1,
                transitionDuration: `${FADE_MS}ms`,
                opacity: i === currentIdx ? 1 : 0,
              }}
              aria-hidden={i !== currentIdx}
            >
              <div className="font-serif font-bold text-white text-7xl md:text-8xl lg:text-9xl leading-none mb-4">
                {t.kanji}
              </div>
              <div className="font-serif italic text-rice/70 text-2xl md:text-3xl mb-1">
                {t.romaji}
              </div>
              <div className="text-xs tracking-widest uppercase text-red mb-4">
                {t.meaning}
              </div>
              <p className="font-serif italic text-rice/60 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                {t.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
