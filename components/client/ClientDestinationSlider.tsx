"use client";

import React, { useState, useRef, useEffect } from "react";

interface ClientDestinationSliderProps {
  heading: string;
  slides: Array<{
    id: number;
    title: string;
    content: string;
    bg: string;
    ctaLink: string;
  }>;
  ctaText: string;
  ctaLink: string;
  ctaButtonText: string;
}

const ClientDestinationSlider = ({
  heading,
  slides,
  ctaText,
  ctaButtonText,
  ctaLink,
}: ClientDestinationSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const infoSliderRef = useRef<HTMLDivElement>(null);
  const boxWidth = useRef<number>(0);
  const totalBoxes = slides.length;
  const [visibleBoxes, setVisibleBoxes] = useState(1);

  const slideToIndex = (sliderRef: React.RefObject<HTMLDivElement>, index: number) => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.4s ease-in-out";
      sliderRef.current.style.transform = `translateX(-${boxWidth.current * index}px)`;
    }
  };

  const handleNextInfoBox = () => {
    if (currentIndex < totalBoxes - visibleBoxes) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevInfoBox = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  useEffect(() => {
    const updateSliderLayout = () => {
      const width = window.innerWidth;

      if (width <= 767) {
        setVisibleBoxes(1);
      } else if (width <= 1024) {
        setVisibleBoxes(2);
      } else {
        setVisibleBoxes(4);
      }

      // Measure box width
      if (infoSliderRef.current) {
        const box = infoSliderRef.current.querySelector(".slider-box") as HTMLElement;
        if (box) {
          const computedStyle = window.getComputedStyle(box);
          const marginRight = parseFloat(computedStyle.marginRight) || 0;
          const marginLeft = parseFloat(computedStyle.marginLeft) || 0;
          boxWidth.current = box.offsetWidth + marginLeft + marginRight;
        }
      }
    };

    setTimeout(updateSliderLayout, 100);
    window.addEventListener("resize", updateSliderLayout);
    return () => window.removeEventListener("resize", updateSliderLayout);
  }, []);

  useEffect(() => {
    slideToIndex(infoSliderRef, currentIndex);
  }, [currentIndex, visibleBoxes]);

  // Dynamically calculate width based on visibleBoxes
  const boxWidthPercent = 100 / visibleBoxes;

  return (
    <>
      <div className="flex items-center mb-0 flex-wrap mx-4 justify-center gap-4 lg:justify-between lg:gap-0">
        <h2
          className="text-2xl font-semibold text-black capitalize text-center lg:text-left"
          style={{ fontSize: "32px" }}
        >
          {heading}
        </h2>

        <div className="flex gap-4 z-[1]">
          <button
            onClick={handlePrevInfoBox}
            className="bg-[#E4F8FF] text-2xl text-[#025C7A] py-[10px] px-5 rounded-full hover:bg-gray-700 hover:text-[#fff] transition-all duration-300"
          >
            &#10094;
          </button>
          <button
            onClick={handleNextInfoBox}
            className="bg-[#E4F8FF] text-2xl text-[#025C7A] py-[10px] px-5 rounded-full hover:bg-gray-700 hover:text-[#fff] transition-all duration-300"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Destinations Slider */}
      <div className="slider-container my-8 w-full px-4 sm:px-6 lg:px-8">
        <div className="slider relative overflow-hidden">
          <div
            className="slider-wrapper flex gap-0 transition-transform duration-300 ease-in-out"
            ref={infoSliderRef}
          >
            {slides.map((box, index) => (
              <div
                key={index}
                className="slider-box relative flex-shrink-0 mx-2 bg-cover bg-center rounded-[23px] shadow-lg overflow-hidden group"
                style={{
                  height: "394px",
                  width: `calc(${boxWidthPercent}% - 16px)`,
                }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-[23px] transition-transform duration-300 ease-in-out group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${box.bg})`,
                  }}
                ></div>

                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/70 to-transparent text-white z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-[32px] font-semibold mb-4 transform transition-all duration-500 ease-in-out">
                    {box.title}
                  </h3>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/70 to-transparent text-white opacity-0 transform translate-y-20 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out z-20">
                  <h3 className="text-[32px] font-semibold mb-4 transform group-hover:translate-y-[-10px] transition-all duration-500 ease-in-out">
                    {box.title}
                  </h3>
                  <p className="mb-4 transform group-hover:translate-y-[-10px] transition-all duration-500 ease-in-out">
                    {box.content}
                  </p>
                  <a href={box.ctaLink}>
                    <button className="px-4 py-2 font-bold bg-white text-[#025C7A] rounded-full hover:bg-gray-100 transition-all duration-300 min-w-[150px]">
                      {ctaButtonText}
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center my-12">
        <a href="/packages">
          <button className="px-8 py-4 mt-8 mb-12 border-2 border-[#025C7A] bg-white text-[#025C7A] rounded-full hover:bg-[#025C7A] hover:text-white transition-all duration-300">
            {ctaText}
          </button>
        </a>
      </div>
    </>
  );
};

export default ClientDestinationSlider;
