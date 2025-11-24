"use client";

import React, { useState, useEffect } from "react";
import { PackageImageSwiper } from "./PackageImage";
import Image from "next/image";
import PackageSummaryCard from "./PackageSummaryCard";
import Link from "next/link";
import VerticalTimelineElement from "./VerticalTimelineElement";
import PackageForm from "./PackageForm";
import { IPackageDetailDataType } from "../types/Common";
import packageData from "../data/en/packages.json";

interface VerticalTimelineProp {
  tourPackage: IPackageDetailDataType;
}

function VerticalTimeline({ tourPackage }: VerticalTimelineProp) {
  // Popular packages for the grid
  const packages = packageData.filter(pkg => pkg.Id <= 5 && pkg.Id > 1);

  // State for modal visibility and selected package
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>(tourPackage.Name);

  // Scroll shadow state
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Enquire click
  const onEnquire = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen relative">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />

      {/* ===== Header Section ===== */}
      <div
        className={`sticky left-0 right-0 bg-white z-[1] ${
          scrolled ? "shadow-[2px_2px_2px_2px_rgba(241,241,241,0.7)] z-[5] sm:z-[50] top-[65px] sm:top-0" : ""
        }`}
      >
        <div className="mx-auto max-w-[1200px] mt-[135px] sm:mt-[135px] p-[20px]">
          <p className="text-[14px] text-gray-700 mt-4">
            <span className="text-[#ccc] hover:text-[#035C7A]">
              <Link href="/" passHref>Home</Link>
            </span>
            /
            <span className="text-[#ccc] hover:text-[#035C7A]">
              <Link href="/packages" passHref> packages </Link>
            </span>
            <span>/ {tourPackage.Name}</span>
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-[20px] sm:text-[30px] font-semibold text-black text-left leading-[1.2em] sm:leading-[1.5em]">
                <span>{tourPackage.Name}</span>
            </h1>
            <button
              className="mt-4 sm:mt-0 bg-[#EA2330] hover:bg-[#D60F0F] text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all w-[142px] whitespace-nowrap"
              onClick={() => onEnquire(tourPackage.Name)}
            >
              Enquire Now
            </button>
          </div>

          {/* Tags */}
          <div className={`flex gap-2 pt-2 mb-3 flex-wrap ${scrolled ? "hidden sm:flex transition-300" : ""}`}>
            {tourPackage.Tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 capitalize rounded-sm text-sm text-white ${
                  index % 2 === 0 ? "bg-[#025C7A]" : "bg-[#6E9753]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Package Image Swiper ===== */}
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 gap-5">
          <div className="w-full overflow-auto">
            <PackageImageSwiper source={tourPackage.Id} />
          </div>

          {/* ===== Overview ===== */}
          <div className="flex flex-col sm:flex-row mx-8 gap-5">
            <div className="overflow-auto border-0 sm:border-2 rounded-[20px]">
              <div className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical p-[5px] sm:p-[30px]">
                <h2 className="text-2xl font-[urbanist] font-bold text-black text-left mb-4">Overview</h2>
                <div className="text-[#4f5e71] font-[urbanist] font-[500] text-[16px] leading-[1.5em]">
                  {tourPackage.Overview}
                </div>
              </div>
            </div>
          </div>

          {/* ===== Itinerary ===== */}
          <div className="overflow-auto border-0 sm:border-2 sm:mx-8 mx-0 rounded-[20px]">
            <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical p-[5px] sm:p-[30px]">
              <h2 className="text-2xl font-bold font-[urbanist] text-black text-left mx-8 mb-4">
                What to Expect
              </h2>
              {tourPackage.Itinerary.map((itinerary, index, array) => (
                <li key={itinerary.Id}>
                  <VerticalTimelineElement
                    time={itinerary.Day}
                    title={itinerary.Name}
                    description={itinerary.Description}
                    images={itinerary.Images}
                    isLast={index === array.length - 1}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Summary ===== */}
          <div className="overflow-auto border-0 sm:border-2 mx-8 rounded-[20px]">
            <div className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical p-[5px] sm:p-[30px]">
              <h2 className="text-2xl font-bold font-[urbanist] text-black text-left mb-4">Summary</h2>
              <ul
                className="text-[#4f5e71] font-[urbanist] font-[500] text-[16px] leading-[1.5em]"
                dangerouslySetInnerHTML={{ __html: tourPackage.Summary }}
              />
            </div>
          </div>
        </div>

        {/* ===== Popular Packages ===== */}
        <div className="my-12 max-w-screen-xl mx-8">
          <h2 className="text-2xl font-semibold text-black text-center sm:text-left mx-2" style={{ fontSize: "32px" }}>
            Popular Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mx-8">
          {packages.map((pkg) => (
            <div key={pkg.Id} className="h-full">
              <PackageSummaryCard
                tourPackage={pkg}
                onEnquire={() => onEnquire(pkg.Name)} // Pass selected package
              />
            </div>
          ))}
        </div>

        {/* ===== Contact Info ===== */}
        <div className="info-container flex flex-col sm:flex-row justify-center gap-12 my-[70px] max-w-[1280px] mx-auto flex-wrap sm:flex-nowrap">
          {/* Email */}
          <div className="info-box p-0 rounded-lg w-[100%] flex flex-col items-center sm:w-[33%]">
            <Image src="/images/email.png" alt="Info Icon 1" width={77} height={77} />
            <h2 className="info-heading text-[30px] font-[urbanist] font-bold text-black text-center mt-4">Email</h2>
            <a href="mailto:info@eazetours.com" className="info-content text-center text-[#4F5E71] text-[16px] mt-1 hover:text-[#3778EE] font-medium">
              info@eazetours.com
            </a>
            <a href="mailto:harshit@eazetours.com" className="info-content text-center text-[#4F5E71] text-[16px] mt-1 hover:text-[#3778EE] font-medium">
              harshit@eazetours.com
            </a>
          </div>

          {/* Location */}
          <div className="info-box p-0 rounded-lg w-[100%] flex flex-col items-center sm:w-[33%]">
            <Image src="/images/location.png" alt="Info Icon 3" width={77} height={77} />
            <h2 className="info-heading text-[30px] font-[urbanist] font-bold text-black text-center mt-4">Location</h2>
            <a href="https://maps.app.goo.gl/H7RTSzRAnT3WYnjr9" className="info-content text-center text-[#4F5E71] text-[16px] mt-1 hover:text-[#3778EE] font-medium">
              Eaze House ~2nd Floor, RZP-146 <br /> Palam Colony, New Delhi, South West <br /> Delhi, 110075
            </a>
          </div>

          {/* Phone */}
          <div className="info-box p-0 rounded-lg w-[100%] flex flex-col items-center sm:w-[33%]">
            <Image src="/images/phone.png" alt="Info Icon 2" width={77} height={77} />
            <h2 className="info-heading text-[30px] font-[urbanist] font-bold text-black text-center mt-4">Phone</h2>
            <a href="tel:+919873186168" className="info-content text-center text-[#4F5E71] text-[16px] mt-1 hover:text-[#3778EE] font-medium">
              +91 98731 86168
            </a>
            <a href="tel:+919911684818" className="info-content text-center text-[#4F5E71] text-[16px] mt-1 hover:text-[#3778EE] font-medium">
              +91 99116 84818
            </a>
            <a href="tel:+919818006830" className="info-content text-center text-[#4F5E71] text-[16px] mt-1 hover:text-[#3778EE] font-medium">
              +91 98180 06830
            </a>
          </div>
        </div>
      </div>

      {/* ===== Popup Modal (Wider & Responsive) ===== */}
      {isFormOpen && (
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
    </div>
  );
}

export default VerticalTimeline;
