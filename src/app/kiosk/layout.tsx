import type { Metadata } from "next";
import KioskIdleReset from "@/components/wmac/KioskIdleReset";

export const metadata: Metadata = {
  title: "Dojo Kiosk",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: undefined },
};

export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KioskIdleReset />
      {children}
    </>
  );
}
