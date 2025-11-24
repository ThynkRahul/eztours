"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pageview } from "../lib/gTagHelper";

export default function RouteChangeListener() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track pageviews if consent is granted
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "true" && typeof window !== "undefined") {
      pageview(pathname);
    }
  }, [pathname]);

  return <></>;
}
