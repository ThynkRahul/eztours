"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../../styles/globals.css";

import React, { Suspense } from "react";
import Script from "next/script";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";

import GoogleAnalytics from "../../components/GoogleAnalytics";
import CookieConsentBanner from "../../components/CookieConsentBanner";
import NavBar from "../../components/Navbar";
import LandingNavBar from "../../components/LandingNavBar";
import Footer from "../../components/Footer";
import CanonicalURL from "../../components/CanonicalURL";
import GTMAnalytics from "../../components/gtmComponent";
import logo from "../../public/images/logo.png";

const GTM_ID = "GTM-K4N7X8MK"; // GTM Container ID

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Eaze Tours",
  url: "https://www.eazetours.com/",
  logo: logo.src,
  alternateName: "Eaze Tours",
  sameAs: [
    "https://www.facebook.com/eazetour/",
    "https://www.instagram.com/eazetourpackages/",
    "https://www.pinterest.com/eazetourpackages/",
    "https://www.tripadvisor.in/Attraction_Review-g304551-d17734269-Reviews-EAZE_TOURS-New_Delhi_National_Capital_Territory_of_Delhi.html",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91 987 318 6168",
      contactType: "sales",
      email: "info@eazetours.com",
      areaServed: ["US", "CA", "GB", "IN"],
      availableLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;
  const pathname = usePathname();

  return (
    <html lang={lang}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Making your Indian journey easy." />
        <meta name="keywords" content="travel, tours, India, journey, itinerary" />
        <meta name="author" content="Eaze Tours" />
        <meta
          name="google-site-verification"
          content="6LAck0ASlqXJ_cAT0c3qjx9-cQmgC1y0rMnJo11P7DU"
        />
        <title>Eaze Tours</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body>
        {/* Load before GTM */}
        <Script
          id="consent-mode"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              // Default (privacy first)
              gtag('consent', 'default', {
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted'
              });
            `,
          }}
        />

        {/* Google Tag Manager loader (always load) */}
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* Google reCAPTCHA V3 */}
  <Script
    id="recaptcha-v3"
    strategy="afterInteractive"
    src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
/>

        {/* Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
        />

        <CanonicalURL />

        {/* Conditional Navbar */}
        {/* pathname === `/${lang}` ? <LandingNavBar locale={lang} /> : <NavBar locale={lang} /> */}
        {<NavBar key={pathname} locale={lang} />}        

        <main>{children}</main>

        <Footer locale={lang} />

        {/* Analytics, Consent Banner & Speed Tools */}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
        <CookieConsentBanner />

        <Suspense>
          <GTMAnalytics />
        </Suspense>

        {/* GTM NoScript Fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
