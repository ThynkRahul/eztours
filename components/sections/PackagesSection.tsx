"use client";

import React, { useState } from "react";
import { getLandingTranslations } from "../../lib/translationHelper";
import { ITranslations, IPackageDetailDataType } from "../../types/Common";
import PackageSummaryCard from "../PackageSummaryCard";
import packageData from "../../data/en/packages.json";
import Link from "next/link";
import PackageForm from "../PackageForm";

interface PackagesSectionProps {
  locale?: string;
}

const PackagesSection: React.FC<PackagesSectionProps> = ({ locale = "en" }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  // Translation data
  const translations: ITranslations = getLandingTranslations(locale);
  const { popularPackages, destinations } = translations.landing;

  // Filter packages
  const packagesList = packageData.filter(pkg =>
    [1, 7, 9, 16, 2, 28, 25, 29].includes(pkg.Id)
  );

  // Locale-aware links
  const packagesLink = locale === "en" ? "/packages" : `/${locale}/packages`;
  const destinationsLink = locale === "en" ? "/destinations" : `/${locale}/destinations`;

  // Enquire handler
  const onEnquire = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsFormOpen(true);
    console.log("Enquire clicked for:", packageName);
  };

  return (
    <>
      {/* Heading */}
      <div className="my-12 max-w-[1280px] mx-0 sm:mx-auto">
        <div className="flex justify-between items-center mx-4">
          <h2
            className="text-2xl font-semibold text-black text-center sm:text-left"
            style={{ fontSize: "32px" }}
          >
            {popularPackages.heading}
          </h2>
          { /* <Link href={destinationsLink}>
            <span className="text-[#025C7A] hover:text-[#034A5D] cursor-pointer font-medium transition-colors duration-300">
              {destinations.cta}
            </span>
          </Link> */}
        </div>
      </div>

      {/* Packages Grid */}
      <div className="flex justify-center items-center max-w-screen-xl mx-0 sm:mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
          {packagesList.map((tourPackage: IPackageDetailDataType) => (
            <PackageSummaryCard
              key={tourPackage.Id}
              tourPackage={tourPackage}
              onSale={[9, 16].includes(tourPackage.Id)}
              onEnquire={() => onEnquire(tourPackage.Name)}
            />
          ))}
        </div>
      </div>

      {/* All Packages Button */}
      <div className="text-center my-12">
        <Link href={packagesLink}>
          <button className="px-8 py-4 mt-8 mb-12 border-2 border-[#025C7A] bg-white text-[#025C7A] rounded-full hover:bg-[#025C7A] hover:text-white transition-all duration-300">
            {popularPackages.cta.allPackages}
          </button>
        </Link>
      </div>

      {/* ===== Popup Modal (Wider & Responsive) ===== */}
      {isFormOpen && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4 sm:px-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative p-0 overflow-auto max-h-[100vh] scrollbar-hide">
            {/* Close Button */}
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-5 text-gray-600 hover:text-black text-2xl font-bold z-50"
            >
              ✕
            </button>

            {/* Form */}
            <div className="max-h-[100vh] overflow-y-auto">
              <PackageForm selectedPackage={selectedPackage} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackagesSection;
