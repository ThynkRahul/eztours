// Server Component
import React from "react";
import HeroSection from "./sections/HeroSection";
import DestinationsSection from "./sections/DestinationsSection";
import PackagesSection from "./sections/PackagesSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import GallerySection from "./sections/GallerySection";
import BlogSection from "./sections/BlogSection";

interface ILandingProps {
  locale?: string;
}

const Landing: React.FC<ILandingProps> = ({ locale = "en" }) => {
  return (
    <>
      {/* Hero section with video based on locale */}
      <HeroSection locale={locale} />

      <div className="mx-4 sm:mx-12">
        <DestinationsSection locale={locale} />
        <PackagesSection locale={locale} />
      </div>

      <TestimonialsSection locale={locale} />

      <div className="mx-4 sm:mx-12">
        <GallerySection locale={locale} />
        <BlogSection locale={locale} />
      </div>
    </>
  );
};

export default Landing;
