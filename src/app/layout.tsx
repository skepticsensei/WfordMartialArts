import type { Metadata } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google";
import Header from "@/components/wmac/Header";
import Footer from "@/components/wmac/Footer";
import StructuredData from "@/components/wmac/StructuredData";
import ChromeGate from "@/components/wmac/ChromeGate";
import { SITE } from "@/lib/wmac-constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.name} - Aikido, Judo & Aikijujutsu in Weatherford, TX`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "martial arts Weatherford TX",
    "Aikido Weatherford",
    "Judo Weatherford",
    "Daito Ryu Aikijujutsu",
    "karate Weatherford",
    "self defense classes Weatherford",
    "Japanese martial arts Texas",
    "dojo Weatherford",
    "kids karate Weatherford",
    "fitness classes Weatherford",
  ],
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  category: "sports",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.origin,
    siteName: SITE.name,
    title: `${SITE.name} - Aikido, Judo & Aikijujutsu in Weatherford, TX`,
    description: SITE.description,
    images: [
      {
        url: "/logos/Weatherford_Martial_Arts.png",
        width: 1800,
        height: 1800,
        alt: `${SITE.name} seal`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE.name} - Aikido, Judo & Aikijujutsu in Weatherford, TX`,
    description: SITE.description,
    images: ["/logos/Weatherford_Martial_Arts.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerifJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ChromeGate>
          <StructuredData />
          <Header />
        </ChromeGate>
        <main className="flex-1">{children}</main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
      </body>
    </html>
  );
}
