"use client";
import { usePathname } from "next/navigation";

export default function CanonicalURL() {
  const siteUrl = "https://www.eazetours.com";
  const pathname = usePathname();
  const canonicalUrl = `${siteUrl}${pathname === "/" ? "" : pathname}`;

  return <link rel="canonical" href={canonicalUrl} />;
}
