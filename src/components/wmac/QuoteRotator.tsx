"use client";

import { useEffect, useRef, useState } from "react";
import type { Quote } from "@/lib/wmac-constants";

const INTERVAL_MS = 45_000;
const FADE_MS = 2_500;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuoteRotator({ quotes }: { quotes: Quote[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const orderRef = useRef<number[]>(quotes.map((_, i) => i));
  const posRef = useRef(0);

  useEffect(() => {
    if (quotes.length < 2) return;
    const initial = quotes.map((_, i) => i);
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
  }, [quotes]);

  if (quotes.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 pt-5 pb-2 md:pt-7 md:pb-3 text-center">
      <div className="grid">
        {quotes.map((q, i) => (
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
            <p className="font-serif italic font-bold text-ink/85 text-xl md:text-2xl lg:text-3xl leading-snug">
              &ldquo;{q.text}&rdquo;
            </p>
            <p className="mt-3 text-xs tracking-widest uppercase text-red font-normal">
              {q.attribution}
              {q.source && <span className="text-ink/40 normal-case tracking-normal italic ml-2 font-normal">, {q.source}</span>}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
