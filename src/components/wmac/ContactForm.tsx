"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white border border-gray p-8 text-center">
        <div className="font-serif text-2xl text-red mb-2">Thank You</div>
        <p className="text-ink/60">
          We&apos;ll be in touch shortly to schedule your introductory session.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray p-6 md:p-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium tracking-wide uppercase text-ink/60 mb-1">
            Name
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray px-3 py-2 text-sm bg-rice focus:outline-none focus:border-red transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium tracking-wide uppercase text-ink/60 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full border border-gray px-3 py-2 text-sm bg-rice focus:outline-none focus:border-red transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium tracking-wide uppercase text-ink/60 mb-1">
          Phone
        </label>
        <input
          type="tel"
          className="w-full border border-gray px-3 py-2 text-sm bg-rice focus:outline-none focus:border-red transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-medium tracking-wide uppercase text-ink/60 mb-1">
          I&apos;m interested in
        </label>
        <select className="w-full border border-gray px-3 py-2 text-sm bg-rice focus:outline-none focus:border-red transition-colors">
          <option value="">Select a program...</option>
          <option value="aikido">Aikido</option>
          <option value="judo">Judo</option>
          <option value="daito-ryu">Daito Ryu Aikijujutsu</option>
          <option value="karate">The Karate University</option>
          <option value="just-move">Just Move Health</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium tracking-wide uppercase text-ink/60 mb-1">
          Message
        </label>
        <textarea
          rows={4}
          className="w-full border border-gray px-3 py-2 text-sm bg-rice focus:outline-none focus:border-red transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-red hover:bg-red-dark text-white py-3 text-sm font-medium tracking-wide uppercase transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
