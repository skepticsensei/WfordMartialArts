"use client";

import { useState } from "react";

const WEB3FORMS_ACCESS_KEY = "a797bf4a-330f-4248-8cc9-1393d12bee09";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New inquiry from wfordmartialarts.com");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Could not reach the server. Please try again.");
    }
  }

  if (status === "sent") {
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
      {/* Honeypot - real users won't fill this, bots often will */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium tracking-wide uppercase text-ink/60 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
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
            name="email"
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
          name="phone"
          className="w-full border border-gray px-3 py-2 text-sm bg-rice focus:outline-none focus:border-red transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-medium tracking-wide uppercase text-ink/60 mb-1">
          I&apos;m interested in
        </label>
        <select
          name="program"
          className="w-full border border-gray px-3 py-2 text-sm bg-rice focus:outline-none focus:border-red transition-colors"
        >
          <option value="">Select a program...</option>
          <option value="aikido">Aikido</option>
          <option value="judo">Judo</option>
          <option value="daito-ryu">Aikijujutsu</option>
          <option value="karate">The Karate University</option>
          <option value="partner">Partnership / Host Program</option>
          <option value="dark-veil-dance">Dark Veil Dance</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium tracking-wide uppercase text-ink/60 mb-1">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full border border-gray px-3 py-2 text-sm bg-rice focus:outline-none focus:border-red transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <div className="text-sm text-red border border-red/30 bg-red-light/50 px-3 py-2">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-red hover:bg-red-dark disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 text-sm font-medium tracking-wide uppercase transition-colors"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
