"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import PackageForm from "./PackageForm";
import PackageSummaryCard from "./PackageSummaryCard";
import packageData from "../data/en/packages.json";
import { IPackageDetailDataType } from "../types/Common";

function PackagesList() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "all";

  const [tabName, setTabName] = useState(initialTab);
  const [packagesList, setPackagesList] = useState<IPackageDetailDataType[]>(packageData);
  const dropDownRef = useRef<HTMLDetailsElement>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<IPackageDetailDataType | null>(null);

  const tabDisplayName = new Map<string, string>([
    ["all", "All Packages"],
    ["adventure", "Adventure Tours"],
    ["ayurveda", "Ayurveda"],
    ["cultural", "Cultural Tours"],
    ["luxury", "Luxury Tours"],
    ["honeymoon", "Honeymoon Tours"],
    ["pilgrim", "Pilgrimage Tours"],
    ["tribal", "Tribals Tours"],
    ["wildlife", "Wildlife Tours"],
    ["bhutan", "Bhutan"],
    ["srilanka", "Sri Lanka"],
    ["nepal", "Nepal"],
    ["maldives", "Maldives"],
  ]);

  useEffect(() => {
    if (initialTab !== "all") {
      const filteredPackages = packageData.filter(pkg =>
        pkg.Tags.includes(initialTab)
      );
      setPackagesList(filteredPackages);
    } else {
      setPackagesList(packageData);
    }
    setTabName(initialTab);
  }, [initialTab]);

  const handleTabClick = (tab: string) => {
    setTabName(tab);

    if (tab !== "all") {
      const filtered = packageData.filter(pkg => pkg.Tags.includes(tab));
      setPackagesList(filtered);
    } else {
      setPackagesList(packageData);
    }

    if (dropDownRef.current) {
      dropDownRef.current.removeAttribute("open");
    }

    // Update URL without reloading
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url);
  };

  const getTabClass = (tab: string) =>
    `tab px-[10px] ${tabName === tab ? "tab-active !text-[#fff] !bg-[#025C7A]" : ""}`;

  return (
    <>
      {/* Tabs for large screens */}
      <div role="tablist" className="hidden lg:flex lg:flex-wrap lg:justify-center lg:tabs lg:tabs-boxed mx-auto">
        {Array.from(tabDisplayName.entries()).map(([key, label]) => (
          <button key={key} role="tab" className={getTabClass(key)} onClick={() => handleTabClick(key)}>
            {label}
          </button>
        ))}
      </div>

      {/* Dropdown for small screens */}
      <div className="flex justify-center lg:hidden">
        <details className="dropdown" ref={dropDownRef}>
          <summary className="btn m-1">{tabDisplayName.get(tabName)}</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            {Array.from(tabDisplayName.entries()).map(([key, label]) => (
              <li key={key}>
                <button onClick={() => handleTabClick(key)}>{label}</button>
              </li>
            ))}
          </ul>
        </details>
      </div>

      {/* Packages grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1200px] gap-6 mx-8 sm:mx-auto my-8">
        {packagesList.map(pkg => (
          <div key={pkg.Id}>
            <PackageSummaryCard
              tourPackage={pkg}
              onEnquire={() => {
                setSelectedPackage(pkg);
                setIsFormOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      {/* Popup Modal */}
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
              <PackageForm selectedPackage={selectedPackage.Name} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PackagesList;