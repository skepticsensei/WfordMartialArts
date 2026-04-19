import type { Metadata } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google";
import Header from "@/components/wmac/Header";
import Footer from "@/components/wmac/Footer";
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
  title: {
    default: "Weatherford Martial Arts Center",
    template: "%s | Weatherford Martial Arts Center",
  },
  description:
    "A martial arts and wellness center in Weatherford, Texas specializing in Aikido, Judo, and Daito Ryu Aikijujutsu.",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
