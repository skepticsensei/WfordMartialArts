import type { Metadata } from "next";
import Header from "@/components/wmac/Header";
import Footer from "@/components/wmac/Footer";

export const metadata: Metadata = {
  title: {
    default: "Weatherford Martial Arts Center",
    template: "%s | Weatherford Martial Arts Center",
  },
  description:
    "A martial arts and wellness center in Weatherford, Texas specializing in Aikido, Judo, and Daito Ryu Aikijujutsu.",
};

export default function WMACLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
