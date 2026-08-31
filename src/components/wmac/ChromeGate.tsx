"use client";

import { usePathname } from "next/navigation";

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/kiosk") || pathname?.startsWith("/ytbanner")) return null;
  return <>{children}</>;
}
