"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import gallery_1 from "../public/images/gallery/1.jpg";
import gallery_2 from "../public/images/gallery/2.jpg";
import gallery_3 from "../public/images/gallery/3.jpg";
import gallery_4 from "../public/images/gallery/4.jpg";
import gallery_5 from "../public/images/gallery/5.jpg";
import gallery_6 from "../public/images/gallery/6.jpg";
import gallery_7 from "../public/images/gallery/7.jpg";
import gallery_8 from "../public/images/gallery/8.jpg";
import gallery_10 from "../public/images/gallery/10.jpg";
import gallery_11 from "../public/images/gallery/11.jpg";
import gallery_12 from "../public/images/gallery/12.jpg";
import gallery_13 from "../public/images/gallery/13.jpg";
import gallery_14 from "../public/images/gallery/14.jpg";
import gallery_15 from "../public/images/gallery/15.jpg";
import gallery_16 from "../public/images/gallery/16.jpg";
import gallery_17 from "../public/images/gallery/17.jpg";
import gallery_18 from "../public/images/gallery/18.jpg";
import gallery_19 from "../public/images/gallery/19.jpg";
import gallery_20 from "../public/images/gallery/20.jpg";
import gallery_21 from "../public/images/gallery/21.jpg";
import gallery_22 from "../public/images/gallery/22.jpg";
import gallery_23 from "../public/images/gallery/23.jpg";
import gallery_24 from "../public/images/gallery/24.jpg";
import gallery_25 from "../public/images/gallery/25.jpg";
import gallery_26 from "../public/images/gallery/26.jpg";
import gallery_27 from "../public/images/gallery/27.jpg";
import gallery_28 from "../public/images/gallery/28.jpg";
import gallery_29 from "../public/images/gallery/29.jpg";
import gallery_30 from "../public/images/gallery/30.jpg";
import gallery_31 from "../public/images/gallery/31.jpg";
import gallery_32 from "../public/images/gallery/32.jpg";
import gallery_33 from "../public/images/gallery/33.jpg";
import gallery_34 from "../public/images/gallery/34.jpg";
import gallery_35 from "../public/images/gallery/35.jpg";
import gallery_36 from "../public/images/gallery/36.jpg";
import gallery_37 from "../public/images/gallery/37.jpg";
import gallery_38 from "../public/images/gallery/38.jpg";
import gallery_39 from "../public/images/gallery/39.jpg";
import gallery_40 from "../public/images/gallery/40.jpg";
import gallery_41 from "../public/images/gallery/41.jpg";
import gallery_42 from "../public/images/gallery/42.jpg";
import gallery_43 from "../public/images/gallery/43.jpg";
import gallery_44 from "../public/images/gallery/44.jpg";

// Use StaticImageData type for images
const gallery_images: StaticImageData[] = [
  gallery_31,
  gallery_32,
  gallery_33,
  gallery_34,
  gallery_35,
  gallery_36,
  gallery_37,
  gallery_38,
  gallery_39,
  gallery_40,
  gallery_41,
  gallery_42,
  gallery_43,
  gallery_44,
  gallery_1,
  gallery_2,
  gallery_3,
  gallery_4,
  gallery_5,
  gallery_6,
  gallery_7,
  gallery_8,
  gallery_10,
  gallery_11,
  gallery_12,
  gallery_13,
  gallery_14,
  gallery_15,
  gallery_16,
  gallery_17,
  gallery_18,
  gallery_19,
  gallery_20,
  gallery_21,
  gallery_22,
  gallery_23,
  gallery_24,
  gallery_25,
  gallery_26,
  gallery_27,
  gallery_28,
  gallery_29,
  gallery_30,
];

export default function GalleryComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<StaticImageData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openLightbox = (image: StaticImageData, index: number) => {
    setCurrentImage(image);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setCurrentImage(null);
    setCurrentIndex(0);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % gallery_images.length;
    setCurrentImage(gallery_images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + gallery_images.length) % gallery_images.length;
    setCurrentImage(gallery_images[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <div>
      <div className="mt-[135px] sm:mt-[165px] mx-8 mb-12">
        <p className="text-[14px] text-gray-700 mt-4">
          <span className="text-[#ccc] hover:text-[#035C7A]">
            <Link href="/" passHref>
              Home
            </Link>
          </span>{" "}
          / Gallery
        </p>
        <h2 className="text-[42px] font-semibold text-black text-left">Gallery</h2>
      </div>

      <div className="mt-[10px] mx-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery_images.map((gallery_image, index) => (
            <div
              className="group relative overflow-hidden rounded-lg shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              key={index}
              onClick={() => openLightbox(gallery_image, index)} // Pass the StaticImageData and its index
            >
              <div className="relative w-full h-72 md:h-80 lg:h-96">
                <Image
                  className="object-cover w-full h-full transition-transform transform group-hover:scale-110"
                  src={gallery_image}
                  alt={`Gallery Image ${index + 1}`}
                  layout="fill"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {isOpen && currentImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="relative">
              <button
                onClick={closeLightbox}
                className="absolute top-0 right-0 text-white text-4xl px-3 pt-0 pb-2 bg-transparent hover:bg-gray-700 rounded-full"
              >
                &times;
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-transparent hover:bg-gray-700 rounded-full px-2 pt-0 pb-1"
              >
                &larr;
              </button>
              <button
                onClick={nextImage}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-transparent hover:bg-gray-700 rounded-full px-2 pt-0 pb-1"
              >
                &rarr;
              </button>

              <Image
                className="object-contain max-h-screen max-w-screen"
                src={currentImage}
                alt="Lightbox Image"
                width={1200}
                height={800}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
