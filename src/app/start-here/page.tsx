import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/wmac-constants";

export const metadata: Metadata = {
  title: "Start Here - New Student Guide",
  description:
    "New to martial arts in Weatherford? Our beginner guide walks you through your first class, what to wear, what to expect, and how to choose the right art for you.",
  alternates: { canonical: "/start-here" },
};

const steps = [
  {
    number: "01",
    title: "Choose Your Path",
    description:
      "Explore our disciplines \u2014 Aikido, Judo, or Daito Ryu Aikijujutsu \u2014 or our hosted programs. Not sure? We\u2019ll help you find the right fit.",
  },
  {
    number: "02",
    title: "Book Your Intro",
    description:
      "Schedule a complimentary introductory session. No experience or special equipment needed \u2014 just come in comfortable athletic clothing.",
  },
  {
    number: "03",
    title: "Begin Training",
    description:
      "Join our community of practitioners. Our instructors will guide you through every step, at your own pace.",
  },
];

export default function StartHerePage() {
  return (
    <>
      <section className="bg-ink py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-xs tracking-widest uppercase text-red mb-2">
            Begin Your Journey
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Start Here
          </h1>
          <p className="mt-3 text-rice/50 max-w-lg mx-auto text-sm">
            New to martial arts? Welcome. Here&apos;s everything you need to know to get started.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        {/* 3-Step Process */}
        <div className="space-y-8 mb-16">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6">
              <div className="font-serif text-4xl font-bold text-red/20 leading-none pt-1">
                {step.number}
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-ink mb-2">
                  {step.title}
                </h2>
                <p className="text-sm text-ink/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* What to Expect */}
        <div className="bg-white border border-gray p-6 md:p-8 mb-8">
          <h2 className="font-serif text-2xl font-bold text-ink mb-4">
            Your First Class
          </h2>
          <ul className="space-y-3">
            {[
              "Arrive 10\u201315 minutes early to introduce yourself",
              "Wear comfortable athletic clothing (t-shirt, sweatpants or shorts)",
              "Bring water and a towel",
              "No shoes on the training mat \u2014 we train barefoot",
              "You\u2019ll be paired with experienced students who will help you",
              "Classes typically last 60\u201390 minutes",
              "Ask questions \u2014 our community is friendly and welcoming",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                <span className="text-red mt-0.5">&#9656;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <Link
            href={`${SITE.basePath}/contact`}
            className="bg-red hover:bg-red-dark text-white px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors"
          >
            Book Your Free Intro Session
          </Link>
        </div>
      </section>
    </>
  );
}
