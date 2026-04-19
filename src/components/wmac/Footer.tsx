import Link from "next/link";
import Image from "next/image";
import { SITE, DISCIPLINES, HOSTED_GROUPS } from "@/lib/wmac-constants";

export default function Footer() {
  return (
    <footer className="bg-ink text-rice/80">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logos/Weatherford_Martial_Arts.png"
                alt={SITE.name}
                width={40}
                height={40}
                className="w-10 h-10 brightness-110"
              />
              <div>
                <div className="font-serif font-bold text-white text-sm">Weatherford</div>
                <div className="font-serif text-xs tracking-widest uppercase text-red">
                  Martial Arts Center
                </div>
              </div>
            </div>
            <p className="text-sm text-rice/60 leading-relaxed">
              {SITE.description}
            </p>
          </div>

          {/* Disciplines */}
          <div>
            <h3 className="font-serif text-white text-sm font-bold mb-3 tracking-wide uppercase">
              Disciplines
            </h3>
            <ul className="space-y-2">
              {DISCIPLINES.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`${SITE.basePath}/${d.slug}`}
                    className="text-sm hover:text-red transition-colors"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-serif text-white text-sm font-bold mb-3 tracking-wide uppercase">
              Programs
            </h3>
            <ul className="space-y-2">
              {HOSTED_GROUPS.map((g) => (
                <li key={g.slug}>
                  {g.externalUrl ? (
                    <a
                      href={g.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-red transition-colors"
                    >
                      {g.name}
                    </a>
                  ) : (
                    <Link
                      href={`${SITE.basePath}/${g.slug}`}
                      className="text-sm hover:text-red transition-colors"
                    >
                      {g.name}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href={`${SITE.basePath}/schedule`}
                  className="text-sm hover:text-red transition-colors"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href={`${SITE.basePath}/start-here`}
                  className="text-sm hover:text-red transition-colors"
                >
                  Start Here
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-white text-sm font-bold mb-3 tracking-wide uppercase">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${SITE.phone}`} className="hover:text-red transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-red transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li className="text-rice/60">
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
              </li>
            </ul>
            <Link
              href={`${SITE.basePath}/contact`}
              className="inline-block mt-4 bg-red hover:bg-red-dark text-white px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors"
            >
              Book Intro Session
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-rice/10 text-center text-xs text-rice/40">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
