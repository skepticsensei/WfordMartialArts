"use client";

import { useEffect } from "react";

const IDLE_MS = 150_000;
const RELOAD_MS = 1_800_000;

export default function KioskIdleReset() {
  useEffect(() => {
    let idleTimer: number | undefined;
    let reloadTimer: number | undefined;
    const reset = () => {
      if (idleTimer) window.clearTimeout(idleTimer);
      if (reloadTimer) window.clearTimeout(reloadTimer);
      idleTimer = window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent("kiosk:idle-reset"));
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, IDLE_MS);
      reloadTimer = window.setTimeout(() => {
        window.location.reload();
      }, RELOAD_MS);
    };
    const events: (keyof WindowEventMap)[] = ["pointerdown", "touchstart", "keydown", "scroll"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      if (idleTimer) window.clearTimeout(idleTimer);
      if (reloadTimer) window.clearTimeout(reloadTimer);
    };
  }, []);
  return null;
}
