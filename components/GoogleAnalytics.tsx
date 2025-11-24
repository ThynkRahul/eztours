"use client";

import { useEffect, useState } from "react";
import { EAZE_TOUR_GTAG } from "../lib/gTagHelper";

export default function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "true") {
      setConsentGiven(true);
    }
  }, []);

  // Only render the noscript fallback when consent is given
  if (!consentGiven) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${EAZE_TOUR_GTAG}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      ></iframe>
    </noscript>
  );
}
