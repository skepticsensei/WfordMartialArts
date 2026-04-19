import Link from "next/link";
import type { Metadata } from "next";
import ScheduleTable from "@/components/wmac/ScheduleTable";
import { SITE } from "@/lib/wmac-constants";

export const metadata: Metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <>
      <section className="bg-ink py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-xs tracking-widest uppercase text-red mb-2">
            Class Times
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Weekly Schedule
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <div className="bg-white border border-gray p-6 md:p-8 mb-8">
          <ScheduleTable />
        </div>

        <div className="flex flex-wrap gap-3 text-xs mb-8">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-red/10 border border-red/20"></span>
            Martial Arts
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-red-light border border-red/20"></span>
            Karate University
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-teal/10 border border-teal/20"></span>
            Just Move Health
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-gray-light border border-gray"></span>
            Open Mat
          </span>
        </div>

        <div className="text-center">
          <p className="text-sm text-ink/50 mb-4">
            Schedule subject to change. Contact us for the most current information.
          </p>
          <Link
            href={`${SITE.basePath}/contact`}
            className="bg-red hover:bg-red-dark text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors"
          >
            Book Intro Session
          </Link>
        </div>
      </section>
    </>
  );
}
