"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KioskPhoto } from "@/lib/kiosk-photos";

const INTERVAL_MS = 30_000;
const FADE_MS = 3_500;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PhotoSlideshow({ photos }: { photos: KioskPhoto[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const orderRef = useRef<number[]>(photos.map((_, i) => i));
  const posRef = useRef(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const initial = photos.map((_, i) => i);
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
  }, [photos]);

  if (photos.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="aspect-[16/9] bg-rice border border-gray flex items-center justify-center text-ink/40 font-serif italic text-sm">
          Photos coming soon.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="relative aspect-[16/9] overflow-hidden bg-rice">
        {photos.map((p, i) => (
          <div
            key={p.src}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{ transitionDuration: `${FADE_MS}ms`, opacity: i === currentIdx ? 1 : 0 }}
            aria-hidden={i !== currentIdx}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              priority={i === 0}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
