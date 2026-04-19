import { SITE } from "@/lib/wmac-constants";

export default function StructuredData() {
  const sameAs = Object.values(SITE.social).filter((url) => url.length > 0);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    name: SITE.name,
    alternateName: SITE.shortName,
    description: SITE.description,
    url: SITE.origin,
    ...(SITE.phone && { telephone: `+1${SITE.phone.replace(/\D/g, "")}` }),
    email: SITE.email,
    image: `${SITE.origin}/logos/Weatherford_Martial_Arts.png`,
    logo: `${SITE.origin}/logos/Weatherford_Martial_Arts.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: {
      "@type": "City",
      name: "Weatherford, Texas",
    },
    knowsAbout: [
      "Aikido",
      "Judo",
      "Daito Ryu Aikijujutsu",
      "Karate",
      "Self Defense",
      "Martial Arts",
    ],
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
