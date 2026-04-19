import type { Metadata } from "next";
import ContactForm from "@/components/wmac/ContactForm";
import { SITE } from "@/lib/wmac-constants";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-xs tracking-widest uppercase text-red mb-2">
            Get in Touch
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Contact Us
          </h1>
          <p className="mt-3 text-rice/50 max-w-lg mx-auto text-sm">
            Ready to begin? Have questions? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="font-serif text-lg font-bold text-ink mb-2">Visit</h2>
              <p className="text-sm text-ink/70">{SITE.address}</p>
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-ink mb-2">Call</h2>
              <a
                href={`tel:${SITE.phone}`}
                className="text-sm text-red hover:text-red-dark transition-colors"
              >
                {SITE.phone}
              </a>
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-ink mb-2">Email</h2>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-red hover:text-red-dark transition-colors"
              >
                {SITE.email}
              </a>
            </div>
            <div className="bg-white border border-gray p-4">
              <h3 className="font-serif text-sm font-bold text-ink mb-1">
                Introductory Sessions
              </h3>
              <p className="text-xs text-ink/60 leading-relaxed">
                Your first session is complimentary. Fill out the form or call us to schedule
                a time that works for you.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
