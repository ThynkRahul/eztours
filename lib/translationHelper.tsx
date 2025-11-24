import english_landing from "../data/en/landing.json";
import spanish_landing from "../data/es/landing.json";
import german_landing from "../data/de/landing.json";
import french_landing from "../data/fr/landing.json";
import english_aboutus from "../data/en/aboutus.json";
import spanish_aboutus from "../data/es/aboutus.json";
import german_aboutus from "../data/de/aboutus.json";
import french_aboutus from "../data/fr/aboutus.json";
import english_blog from "../data/en/blog-structure.json";
import spanish_blog from "../data/es/blog-structure.json";
import german_blog from "../data/de/blog-structure.json";
import french_blog from "../data/fr/blog-structure.json";
import english_testimonials from "../data/en/testimonials.json";
import spanish_testimonials from "../data/es/testimonials.json";
import german_testimonials from "../data/de/testimonials.json";
import french_testimonials from "../data/fr/testimonials.json";
import english_packages from "../data/en/packages.json";
// import spanish_packages from "../data/es/packages.json";
// import german_packages from "../data/de/packages.json";
// import french_packages from "../data/fr/packages.json";

export const getLandingTranslations = (locale: string) => {
  if (locale === "en") {
    return english_landing;
  } else if (locale === "es") {
    return spanish_landing;
  } else if (locale === "de") {
    return german_landing;
  } else if (locale === "fr") {
    return french_landing;
  }

  return english_landing;
};

export const getAboutUsTranslations = (locale: string) => {
  if (locale === "en") {
    return english_aboutus;
  } else if (locale === "es") {
    return spanish_aboutus;
  } else if (locale === "de") {
    return german_aboutus;
  } else if (locale === "fr") {
    return french_aboutus;
  }

  return english_aboutus;
};

export const getBlogTranslations = (locale: string) => {
  if (locale === "en") {
    return english_blog;
  } else if (locale === "es") {
    return spanish_blog;
  } else if (locale === "de") {
    return german_blog;
  } else if (locale === "fr") {
    return french_blog;
  }

  return english_blog;
};

export const getTestimonialsTranslations = (locale: string) => {
  if (locale === "en") {
    return english_testimonials;
  } else if (locale === "es") {
    return spanish_testimonials;
  } else if (locale === "de") {
    return german_testimonials;
  } else if (locale === "fr") {
    return french_testimonials;
  }

  return english_testimonials;
};

export const getPackagesTranslations = (locale: string) => {
  // if (locale === "en") {
  //   return english_packages;
  // } else if (locale === "es") {
  //   return spanish_packages;
  // } else if (locale === "de") {
  //   return german_packages;
  // } else if (locale === "fr") {
  //   return french_packages;
  // }

  return english_packages;
};
