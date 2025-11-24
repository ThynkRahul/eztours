"use client";

import { useEffect, useState } from "react";
import { EAZE_TOUR_GTAG } from "../lib/gTagHelper";

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);

    // Inform GTM consent system
    if (typeof window !== "undefined") {
      const consentEvent = new Event("updateGTMConsent");
      window.dispatchEvent(consentEvent);
    }

    // Update Google Consent Mode directly
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_user_data: "granted",
        ad_personalization: "granted",
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    }

    // Load GTM immediately (if not already loaded)
    if (typeof window !== "undefined" && EAZE_TOUR_GTAG) {
      if (!document.getElementById("gtm-script")) {
        const gtmScript = document.createElement("script");
        gtmScript.id = "gtm-script";
        gtmScript.async = true;
        gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${EAZE_TOUR_GTAG}`;
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode?.insertBefore(gtmScript, firstScript);
      }
    }
  };

  return showBanner ? (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#000",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      <p>
        We use cookies to improve your experience. By using our site, you accept our use of cookies.
      </p>
      <button
        onClick={acceptCookies}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          background: "#fff",
          color: "#000",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Accept
      </button>
    </div>
  ) : null;
}
