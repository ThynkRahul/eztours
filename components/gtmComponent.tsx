"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { pageview } from "../lib/gtm";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    pageview(pathname);

    // Safely ensure dataLayer exists
    const win = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
    if (!win.dataLayer) {
      win.dataLayer = [];
    }

    const gtag = (...args: unknown[]) => {
      win.dataLayer!.push(args);
    };

    const consentGiven = getCookie("consent");

    if (consentGiven === "true") {
      gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted",
      });
    } else {
      gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "granted",
      });
    }

    // Load GTM if not already added
    if (!document.getElementById("gtm-script")) {
      const script = document.createElement("script");
      script.id = "gtm-script";
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-K4N7X8MK";
      document.head.appendChild(script);
    }

    // Handle cookie consent updates
    const updateConsent = () => {
      gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted",
      });
      gtag("event", "cookie_consent_given");
    };

    window.addEventListener("updateGTMConsent", updateConsent);

    return () => {
      window.removeEventListener("updateGTMConsent", updateConsent);
    };
  }, [pathname, searchParams]);

  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-K4N7X8MK"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
