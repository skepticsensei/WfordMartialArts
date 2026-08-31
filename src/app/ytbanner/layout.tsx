import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Banner",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: undefined },
};

export default function YtBannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
