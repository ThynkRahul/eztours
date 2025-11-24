import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import packageData from "./data/en/packages.json";

const locales = ["en", "fr", "de", "es"];
const defaultLocale = "en";

// Regex to match static/public files
const PUBLIC_FILE = /\.(.*)$/;

function getLocaleFromPath(path: string) {
  const parts = path.split("/");
  if (parts.length > 1 && locales.includes(parts[1])) {
    return parts[1];
  }
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // redirect english locale → root canonical
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url);
  }

  // static/public
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // prefix check
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // if no prefix → english → rewrite internally to /en
  if (!pathnameHasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.rewrite(url);
  }

  // get locale
  const locale = getLocaleFromPath(pathname);

  // package redirects (same as your original)
  if (pathname.startsWith(`/${locale}/packages`)) {
    const packagePathReplaced = pathname.replace(`/${locale}/packages/`, "");
    const packageId = parseInt(packagePathReplaced);

    if (!Number.isNaN(packageId) && packageId > 0 && packageId < 52) {
      const tourPackage = packageData.find((p) => p.Id === packageId);
      if (tourPackage && tourPackage.Uri) {
        return NextResponse.redirect(
          new URL(`/${locale}/packages/${tourPackage.Uri}`, req.url),
          { status: 308 }
        );
      }
    }

    const packageRedirects: Record<string, string> = {
      "wildlife-tours": "wildlife-safari-tour-package-india",
      "tribals-tours": "gujarat-tribal-tour-package-india",
      "luxury-trains": "",
    };

    const slug = pathname.split("/").pop();
    if (slug && packageRedirects[slug] !== undefined) {
      const redirectPath = packageRedirects[slug]
        ? `/${locale}/packages/${packageRedirects[slug]}`
        : `/${locale}/packages`;
      return NextResponse.redirect(new URL(redirectPath, req.url), { status: 308 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
