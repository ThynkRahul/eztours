import React from "react";

import Image, { StaticImageData } from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";

import india1 from "../public/images/India/1.jpeg";
import india2 from "../public/images/India/2.jpeg";
import india3 from "../public/images/India/3.jpeg";
import india4 from "../public/images/India/4.jpeg";
import india5 from "../public/images/India/5.jpeg";
import india6 from "../public/images/India/6.jpeg";
import india7 from "../public/images/India/7.jpeg";
import srilanka1 from "../public/images/srilanka/1.jpeg";
import srilanka2 from "../public/images/srilanka/2.jpeg";
import srilanka3 from "../public/images/srilanka/3.jpeg";
import srilanka4 from "../public/images/srilanka/4.jpeg";
import srilanka5 from "../public/images/srilanka/5.jpeg";
import nepal1 from "../public/images/nepal/1.jpeg";
import nepal2 from "../public/images/nepal/2.jpeg";
import nepal3 from "../public/images/nepal/3.jpeg";
import nepal4 from "../public/images/nepal/4.jpeg";
import bhutan1 from "../public/images/bhutan/1.jpeg";
import bhutan2 from "../public/images/bhutan/2.jpeg";
import bhutan3 from "../public/images/bhutan/3.jpeg";
import bhutan4 from "../public/images/bhutan/4.jpeg";
import bhutan5 from "../public/images/bhutan/5.jpeg";
import maldives1 from "../public/images/maldives/1.jpeg";
import maldives2 from "../public/images/maldives/2.jpeg";
import maldives3 from "../public/images/maldives/3.jpeg";
import maldives4 from "../public/images/maldives/4.jpeg";

interface CountriesListProp {
  country: string;
}

function CountriesList(props: CountriesListProp) {
  const country_images: { [country: string]: Array<StaticImageData> } = {
    india: [india1, india2, india3, india4, india5, india6, india7],
    nepal: [nepal1, nepal2, nepal3, nepal4],
    srilanka: [srilanka1, srilanka2, srilanka3, srilanka4, srilanka5],
    bhutan: [bhutan1, bhutan2, bhutan3, bhutan4, bhutan5],
    maldives: [maldives1, maldives2, maldives3, maldives4],
  };

  return (
    <div className="h-96 md:h-196 w-1/2">
      <Swiper
        effect={"cards"}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
      >
        {country_images[props.country].map((country_image, index) => (
          <SwiperSlide key={index}>
            <div className="h-96 md:h-196 w-1/2">
              <Image
                src={country_image}
                style={{
                  objectFit: "fill",
                  objectPosition: "50% 50%",
                  width: "100%",
                  height: "100%",
                }}
                fill
                alt="BackgroundImage"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              ></Image>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CountriesList;
