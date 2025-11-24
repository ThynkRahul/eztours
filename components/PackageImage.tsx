"use client";
import { useState } from "react";
import Image from "next/image";
import { package_images } from "./Images";

interface IPackageImageProp {
  source: number;
}

function PackageImage({ source }: IPackageImageProp) {
  return (
    <div className="flex  w-80 xl:w-96 h-[100%] justify-center content-center">
      <Image
        src={package_images[source]["main"]}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
        alt="PackageImage"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      ></Image>
    </div>
  );
}

function PackageImageSwiper({ source }: IPackageImageProp) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = package_images[source]["list"];

  // Handle Next Image
  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  // Handle Previous Image
  const prevImage = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <>
      {/* Image Grid */}
      <div className="grid grid-cols-10 gap-x-6 max-w-screen-xl mx-8 relative h-full">
        {/* Left Column (65%) */}
        <div className="col-span-12 sm:col-span-7 h-full relative">
          <Image
            src={images[0]}
            alt="Large Gallery Image"
            className="w-full h-full object-cover rounded-[23px]"
          />
          {/* View All Button - Visible on Mobile Inside Left Image */}
          <button
            className="absolute bottom-4 right-4 sm:hidden px-3 py-1 bg-black/40 border-2 border-white text-white text-sm rounded-md hover:bg-[#025C7A]"
            onClick={() => setIsModalOpen(true)}
          >
            View All
          </button>
        </div>

        {/* Right Column (35%) */}
        <div className="col-span-3 hidden sm:flex flex-col gap-y-6 h-full">
          <div className="h-1/2">
            <Image
              src={images[1]}
              alt="Small Top Image"
              className="w-full h-full object-cover rounded-[23px]"
            />
          </div>

          {/* Bottom Image with View All Button */}
          <div className="h-1/2 relative">
            <Image
              src={images[2]}
              alt="Small Bottom Image"
              className="w-full h-full object-cover rounded-[23px]"
            />
            {/* View All Button - Positioned at Bottom Right for Larger Screens */}
            <button
              className="absolute bottom-4 right-4 hidden sm:block px-3 py-1 bg-black/40 border-2 border-white text-white text-sm rounded-md hover:bg-[#025C7A]"
              onClick={() => setIsModalOpen(true)}
            >
              View All
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          {/* Close Button */}
          <button
            className="absolute top-6 right-8 text-white text-3xl"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>

          {/* Image Display */}
          <div className="relative w-[90%] max-w-3xl flex justify-center">
            <Image
              src={images[currentIndex]}
              alt={`Gallery Image ${currentIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-4 text-white rounded-full hover:bg-opacity-80"
            >
              ❮
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-4 text-white rounded-full hover:bg-opacity-80"
            >
              ❯
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export { PackageImage, PackageImageSwiper };
