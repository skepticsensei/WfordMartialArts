"use client";

import { useRef, useSyncExternalStore } from "react";
import { SCHEDULE, KIOSK_SCHEDULE, HOSTED_GROUPS } from "@/lib/wmac-constants";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_TO_NUM: Record<string, number> = Object.fromEntries(DAY_NAMES.map((n, i) => [n, i]));

type ScheduleDay = (typeof SCHEDULE)[number];
type ScheduleClass = ScheduleDay["classes"][number];

const groupColors: Record<string, string> = {
  aikido: "bg-red-light text-red border-red/20",
  judo: "bg-red-light text-red border-red/20",
  "daito-ryu": "bg-red-light text-red border-red/20",
  "karate-university": "bg-green-light text-green border-green/30",
  "just-move": "bg-teal/10 text-teal border-teal/20",
  open: "bg-gray-light text-ink/60 border-gray",
};

function orderedSchedule(): ScheduleDay[] {
  const map = new Map<string, ScheduleClass[]>();
  for (const d of KIOSK_SCHEDULE) {
    map.set(d.day, [...d.classes]);
  }
  return DAY_NAMES
    .filter((name) => map.has(name))
    .map((name) => ({ day: name, classes: map.get(name)! }));
}

function parseStartTime(timeStr: string): { hours: number; minutes: number } | null {
  const ampmMatch = timeStr.match(/(AM|PM)\s*$/i);
  const firstTimeMatch = timeStr.match(/^(\d{1,2}):(\d{2})/);
  if (!ampmMatch || !firstTimeMatch) return null;
  const ampm = ampmMatch[1].toUpperCase();
  let hours = parseInt(firstTimeMatch[1], 10);
  const minutes = parseInt(firstTimeMatch[2], 10);
  if (ampm === "PM" && hours < 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;
  return { hours, minutes };
}

type NextClass = {
  when: Date;
  dayLabel: string;
  cls: ScheduleClass;
};

function findNextClass(now: Date, schedule: ScheduleDay[]): NextClass | null {
  let earliest: NextClass | null = null;
  for (const day of schedule) {
    const targetDow = DAY_TO_NUM[day.day];
    if (targetDow === undefined) continue;
    for (const cls of day.classes) {
      const start = parseStartTime(cls.time);
      if (!start) continue;
      const nowDow = now.getDay();
      let daysAhead = (targetDow - nowDow + 7) % 7;
      const candidate = new Date(now);
      candidate.setDate(candidate.getDate() + daysAhead);
      candidate.setHours(start.hours, start.minutes, 0, 0);
      if (candidate <= now) {
        candidate.setDate(candidate.getDate() + 7);
        daysAhead += 7;
      }
      const dayLabel = daysAhead === 0 ? "Today" : daysAhead === 1 ? "Tomorrow" : day.day;
      const candidateNext: NextClass = { when: candidate, dayLabel, cls };
      if (!earliest || candidate < earliest.when) {
        earliest = candidateNext;
      }
    }
  }
  return earliest;
}

function formatTime(d: Date) {
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 60_000);
  return () => window.clearInterval(id);
}
function getSnapshot() {
  return Math.floor(Date.now() / 60_000);
}
function getServerSnapshot() {
  return 0;
}

const AUTO_CLOSE_MS = 30_000;

export default function UpcomingClass() {
  const tick = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const timerRef = useRef<number | null>(null);

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (e.currentTarget.open) {
      timerRef.current = window.setTimeout(() => {
        if (detailsRef.current) detailsRef.current.open = false;
      }, AUTO_CLOSE_MS);
    }
  };

  const schedule = orderedSchedule();
  const next = tick === 0 ? null : findNextClass(new Date(), schedule);
  const justMove = HOSTED_GROUPS.find((g) => g.slug === "just-move");

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <details
        ref={detailsRef}
        onToggle={handleToggle}
        className="group bg-white border border-gray"
      >
        <summary className="list-none cursor-pointer p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 select-none">
          <div>
            <div className="text-xs tracking-widest uppercase text-red mb-1">
              Upcoming Class
            </div>
            {next ? (
              <>
                <div className="font-serif text-xl md:text-2xl font-bold text-ink leading-tight">
                  {next.cls.name}
                </div>
                <div className="mt-1 text-sm text-ink/70">
                  <span className="font-medium text-ink">{next.dayLabel}</span>
                  <span className="text-ink/40 mx-2">|</span>
                  <span className="tabular-nums">{formatTime(next.when)}</span>
                </div>
              </>
            ) : (
              <div className="font-serif italic text-ink/60">Loading schedule...</div>
            )}
          </div>

          <span
            className="self-start md:self-auto inline-flex items-center gap-2 bg-red group-hover:bg-red-dark text-white px-5 py-2.5 text-xs font-medium tracking-wide uppercase transition-colors"
          >
            <span className="grid">
              <span className="col-start-1 row-start-1 group-open:invisible">View Full Schedule</span>
              <span className="col-start-1 row-start-1 invisible group-open:visible">Hide Schedule</span>
            </span>
            <span className="group-open:rotate-180 transition-transform" aria-hidden>
              ▼
            </span>
          </span>
        </summary>

        <div className="px-5 md:px-6 pb-5 md:pb-6">
          <div className="pt-5 border-t border-gray">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-red/20">
                    <th className="text-left font-serif font-bold py-2 pr-4 text-ink">Day</th>
                    <th className="text-left font-serif font-bold py-2 pr-4 text-ink">Time</th>
                    <th className="text-left font-serif font-bold py-2 text-ink">Class</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((day) =>
                    day.classes.map((cls, i) => (
                      <tr key={`${day.day}-${i}`} className="border-b border-gray-light">
                        <td className="py-2 pr-4 font-medium text-ink/80">
                          {i === 0 ? day.day : ""}
                        </td>
                        <td className="py-2 pr-4 text-ink/60 tabular-nums">{cls.time}</td>
                        <td className="py-2">
                          <span className={`inline-block px-2 py-0.5 text-xs border ${groupColors[cls.group] || groupColors.open}`}>
                            {cls.name}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {justMove?.externalUrl && (
              <div className="bg-teal/5 border border-teal/20 p-3 mt-4 text-xs text-ink/70">
                <strong className="text-ink">Just Move Fitness</strong> classes are also held at this facility on a separate schedule.{" "}
                <a
                  href={justMove.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:underline"
                >
                  See Autumn&apos;s site for current class times
                </a>
                .
              </div>
            )}
          </div>
        </div>
      </details>
    </section>
  );
}
