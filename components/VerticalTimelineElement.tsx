"use client";
import Image from "next/image";
import React from "react";

interface VerticalTimelineElementProp {
  time: string;
  title: string;
  description: string[];
  images?: { src: string; alt: string }[];
  isLast?: boolean;
}

function VerticalTimelineElement({
  time,
  title,
  description,
  images = [],
  isLast,
}: VerticalTimelineElementProp) {
  const timelineClass =
    parseInt(time) % 2 === 1
      ? "timeline-end md:text-start mb-[70px] ml-[-5px] mr-5 sm:ml-5 sm:mr-0 mt-2 sm:mt-5"
      : "timeline-end md:text-start mb-[70px] ml-[-5px] mr-5 sm:ml-5 sm:mr-0 mt-2 sm:mt-5";

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />

      {/* Timeline Marker */}
      <div className="timeline-middle text-[12px] sm:text-[18px] text-[#6E9753] w-[25px] h-[25px] sm:w-[50px] sm:h-[50px] border-2 border-[#6E9753] rounded-full flex items-center justify-center">
        <i className="fas fa-circle fa-flip-horizontal text-[9px] sm:hidden"></i>
        <span className="hidden sm:block">{time}</span>
      </div>

      {/* Content */}
      <div className={timelineClass}>
        <time className="text-[18px] w-[100%] sm:w-[50%] font-bold font-[urbanist] pt-0 pl-[10px] sm:pl-0 block">
          Day {time} : {title}
        </time>

        <div className="mt-4 text-[#4f5e71] text-justify font-[urbanist] font-medium text-[16px] leading-[1.5em] flex flex-col sm:flex-row gap-8 items-stretch">
          {/* Description */}
          <div className="w-full sm:w-1/2 flex flex-col justify-center gap-2 pl-2 sm:pl-0">
            {description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Images — match height with text */}
          {images.length > 0 && (
            <div className="w-full sm:w-1/2 flex items-stretch mt-[-43px]">
              <div className="relative w-full h-auto flex-1 rounded-[20px] overflow-hidden">
                {images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img.src}
                    alt={img.alt || `Image ${idx + 1}`}
                    fill
                    className="object-cover object-[center_25%] h-full w-full rounded-[20px]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Line */}
      {!isLast && <hr />}
    </>
  );
}

export default VerticalTimelineElement;