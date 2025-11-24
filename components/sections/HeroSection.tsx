import React from "react";
import Image from "next/image";
import { getLandingTranslations } from "../../lib/translationHelper";
import { ITranslations } from "../../types/Common";
import ClientHeroSlider from "../client/ClientHeroSlider";

interface HeroSectionProps {
  locale?: string;
}

const HeroSection = ({ locale = "en" }: HeroSectionProps) => {
  // Load translations for the current locale
  const translations: ITranslations = getLandingTranslations(locale);
  const { infoBoxes } = translations.landing;

  return (
    <>
      {/* Hero Slider */}
      <div className="mt-[0px]">
        <ClientHeroSlider locale={locale} />
      </div>

      {/* Info Boxes Section */}
      <div className="info-container flex justify-center gap-12 my-[70px] max-w-[1200px] mx-auto flex-wrap lg:flex-nowrap">
        {/* Box 1 */}
        <div className="info-box p-0 rounded-lg w-72 flex flex-col items-center">
          <Image src="/images/info_icon_1.png" alt="Info Icon 1" width={77} height={77} />
          <h1 className="info-heading text-lg font-urbanist font-medium text-black text-center mt-4 mb-2">
            {infoBoxes.box1.heading}
          </h1>
          <p className="info-content text-center text-[#4F5E71] font-[16px] leading-[19px]">
            {infoBoxes.box1.content}
          </p>
        </div>

        {/* Box 2 */}
        <div className="info-box p-0 rounded-lg w-72 flex flex-col items-center">
          <Image src="/images/info_icon_2.png" alt="Info Icon 2" width={77} height={77} />
          <h2 className="info-heading text-lg font-urbanist font-medium text-black text-center mt-4 mb-2">
            {infoBoxes.box2.heading}
          </h2>
          <p className="info-content text-center text-[#4F5E71] font-[16px] leading-[19px]">
            {infoBoxes.box2.content}
          </p>
        </div>

        {/* Box 3 */}
        <div className="info-box p-0 rounded-lg w-72 flex flex-col items-center">
          <Image src="/images/info_icon_3.png" alt="Info Icon 3" width={77} height={77} />
          <h2 className="info-heading text-lg font-urbanist font-medium text-black text-center mt-4 mb-2">
            {infoBoxes.box3.heading}
          </h2>
          <p className="info-content text-center text-[#4F5E71] font-[16px] leading-[19px]">
            {infoBoxes.box3.content}
          </p>
        </div>

        {/* Box 4 */}
        <div className="info-box p-0 rounded-lg w-72 flex flex-col items-center">
          <Image src="/images/info_icon_4.png" alt="Info Icon 4" width={77} height={77} />
          <h2 className="info-heading text-lg font-urbanist font-medium text-black text-center mt-4 mb-2">
            {infoBoxes.box4.heading}
          </h2>
          <p className="info-content text-center text-[#4F5E71] font-[16px] leading-[19px]">
            {infoBoxes.box4.content}
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
