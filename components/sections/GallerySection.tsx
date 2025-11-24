"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getLandingTranslations } from "../../lib/translationHelper";
import { ITranslations } from "../../types/Common";

interface GallerySectionProps {
  locale?: string;
}

const GallerySection = ({ locale = "en" }: GallerySectionProps) => {
  // Load translations directly using use()
  const translations: ITranslations = getLandingTranslations(locale);
  const { gallery } = translations.landing;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/images/gallery/32.jpg",
    "/images/gallery/33.jpg",
    "/images/gallery/34.jpg",
    "/images/gallery/35.jpg",
    "/images/gallery/36.jpg",
    "/images/gallery/37.jpg",
    "/images/gallery/40.jpg",
    "/images/gallery/43.jpg",
  ];

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Gallery Section */}
      <div className="w-full py-16 bg-white">
        <div className="my-12 max-w-screen-xl mx-8 sm:mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2
              className="text-2xl font-semibold text-black text-center sm:text-left"
              style={{ fontSize: "32px" }}
            >
              {gallery.heading}
            </h2>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mx-4 max-w-[1280px] sm:mx-auto">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="aspect-square object-cover rounded-[23px] transition-all duration-300 transform group-hover:scale-110 group-hover:opacity-90 cursor-pointer"
                width={300}
                height={300}
                onClick={() => openModal(index)} // Open modal on click
              />
            </div>
          ))}
        </div>

        {/* Modal for Full-Screen Image */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
              >
                ×
              </button>
              <div className="relative max-w-full max-h-full">
                <Image
                  src={images[currentImageIndex]}
                  alt="Full-Screen Image"
                  className="object-contain max-w-full max-h-screen"
                  width={1200}
                  height={800}
                />
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
              >
                &#60;
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
              >
                &#62;
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center items-center mb-[80px] gap-4 mx-8 sm:mx-auto sm:flex-row">
        <a href="/gallery">
          <button className="px-3 sm:px-8 h-[50px] border-2 border-[#025C7A] bg-white text-[#025C7A] rounded-full hover:bg-[#025C7A] hover:text-white transition-all duration-300">
            {gallery.cta.viewAll}
          </button>
        </a>
        <a href="https://www.instagram.com/eazetourpackages/">
          <button className="px-3 sm:px-6 h-[50px] border-2 border-[#025C7A] bg-white text-[#025C7A] rounded-full hover:bg-[#025C7A] hover:text-white transition-all duration-300">
            <i className="fab fa-instagram text-lg" /> {gallery.cta.instagram}
          </button>
        </a>
      </div>
    </>
  );
};

export default GallerySection;
