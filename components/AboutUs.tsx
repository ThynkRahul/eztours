"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import aboutUsData from "../data/en/aboutus.json";

import about1 from "../public/images/gallery/18.jpg";
import about2 from "../public/images/gallery/28.jpg";
import about3 from "../public/images/gallery/30.jpg";
import about4 from "../public/images/gallery/6.jpg";
import about5 from "../public/images/gallery/13.jpg";
import { getAboutUsTranslations } from "../lib/translationHelper";

const about_us_images = [about2, about1, about3, about4, about5];

export default function AboutUs({ locale }: { locale: string }) {
  const aboutUsData = getAboutUsTranslations(locale);
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <div className="mt-[135px] sm:mt-[165px] max-w-[1280px] mx-8 mb-12">
        <p className="text-[14px] text-gray-700 mt-4">
          <span className="font-[urbanist] text-[#ccc] hover:text-[#035C7A]">
            <Link href="/" passHref>
              {aboutUsData.breadcrumb.home}
            </Link>
          </span>{" "}
          / {aboutUsData.breadcrumb.current}
        </p>
        <h2 className="text-[42px] font-semibold text-black text-left">{aboutUsData.pageTitle}</h2>
        <p className="font-[urbanist] text-md text-[#4F5E71] mt-1">{aboutUsData.subtitle}</p>
      </div>

      <div
        className="relative mt-[10px] max-w-[1280px] mx-8 h-[480px] rounded-[23px] overflow-hidden flex items-center justify-start p-[20px] sm:p-[80px] bg-cover bg-center hidden sm:block"
        style={{ backgroundImage: 'url("/images/gallery/8.jpg")' }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        {/* Content */}
        <div className="relative z-10 w-[900px] py-8 pt-[150px] text-left">
          <h2 className="text-white text-[56px] mb-4 font-semibold leading-[1.2em]"></h2>
          {/* Input Field and Subscribe Button */}
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row pt-[0px] sm:pt-[100px] pb-[60px] sm:pb-[100px] text-[#000] justify-center items-center mx-5 sm:mx-8">
        <div className="w-[95%] mx-0 sm:mx-4 sm:w-[45%] h-[400px]">
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[EffectFade, Autoplay]}
            className="h-full w-full"
          >
            {about_us_images.map((about_us_image, index) => (
              <SwiperSlide key={index}>
                <div className="h-full relative">
                  <Image
                    src={about_us_image}
                    alt="About Us Image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mx-2 sm:mx-4 sm:w-[45%]">
          <h3 className="text-[28px] sm:text-[50px] font-bold mb-4 capitalize font-[urbanist] leading-[1.2em] hidden sm:block">
            {aboutUsData.mainContent.title}
          </h3>
          {aboutUsData.mainContent.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 font-[urbanist] text-[#4F5E71] font-semibold">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-[#025C7A] flex flex-col sm:flex-row py-[70px] text-[#fff] justify-center items-center">
        <div className="sm:w-[50%] mx-8">
          <h3 className="text-[32px] sm:text-[50px] font-bold mb-4 capitalize font-[urbanist] leading-[1.2em]">
            {aboutUsData.dreamDestinationSection.title}
          </h3>
          <p className="mb-4 font-[urbanist] font-semibold">
            {aboutUsData.dreamDestinationSection.description}
          </p>
        </div>

        <div className="sm:w-[50%] mx-8 pt-[30px] sm:pt-[0px]">
          <h3 className="text-[32px] sm:text-[38px] font-semibold mb-6 capitalize font-[urbanist] leading-[1.2em] hidden sm:block">
            {aboutUsData.dreamDestinationSection.whyChooseUsTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {aboutUsData.dreamDestinationSection.features.map((feature, index) => (
              <div
                key={index}
                className="info-box bg-[#fff] p-4 w-full h-full aspect-[4/3] sm:aspect-[1/1] rounded-lg flex flex-col items-left justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <g id="Frame">
                    <path
                      id="Vector"
                      d="M35.7687 7.76411C35.619 7.64744 35.4447 7.5664 35.259 7.52715C35.0732 7.48789 34.881 7.49145 34.6969 7.53755L25.1453 9.92505L15.5594 5.1313C15.2923 4.99808 14.9863 4.96483 14.6969 5.03755L4.69687 7.53755C4.42645 7.60515 4.18638 7.76119 4.01482 7.98088C3.84325 8.20058 3.75004 8.47131 3.75 8.75005V31.2501C3.75003 31.44 3.79334 31.6274 3.87665 31.7981C3.95996 31.9688 4.08107 32.1183 4.23079 32.2352C4.38051 32.352 4.5549 32.4333 4.7407 32.4727C4.92651 32.5121 5.11885 32.5086 5.30312 32.4626L14.8547 30.0751L24.4406 34.8688C24.6146 34.9546 24.806 34.9995 25 35.0001C25.1022 35 25.204 34.9874 25.3031 34.9626L35.3031 32.4626C35.5735 32.395 35.8136 32.2389 35.9852 32.0192C36.1567 31.7995 36.25 31.5288 36.25 31.2501V8.75005C36.25 8.55994 36.2067 8.37231 36.1233 8.20146C36.0399 8.03061 35.9187 7.88104 35.7687 7.76411ZM16.25 8.27193L23.75 12.0219V31.7282L16.25 27.9782V8.27193ZM6.25 9.72661L13.75 7.85161V27.7735L6.25 29.6485V9.72661ZM33.75 30.2735L26.25 32.1485V12.2266L33.75 10.3516V30.2735Z"
                      fill="#FC961B"
                    ></path>
                  </g>
                </svg>
                <h2 className="info-heading text-2xl font-[urbanist] font-bold text-black text-left mt-4 mb-2">
                  {feature.title}
                </h2>
                <p className="info-content text-left font-[urbanist] text-[#4F5E71] font-semibold font-[16px] leading-[1.5em]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[78px] mx-8 mb-12 sm:w-[45%] sm:mx-auto">
        <h2 className="text-[32px] sm:text-[42px] font-semibold capitalize text-black text-left sm:text-center leading-[1.2em] mb-4">
          {aboutUsData.unforgettableExperiences.title}
        </h2>
        <p className="text-md mt-1 text-left sm:text-center font-[urbanist] text-[#4F5E71] font-semibold">
          {aboutUsData.unforgettableExperiences.description}
        </p>
      </div>

      <div className="flex flex-wrap justify-between gap-4 my-12 max-w-screen-xl mb-[120px] mx-8 sm:mx-auto sm:flex-nowrap sm:w-[80%]">
        {/* First Box */}
        <div className="w-full sm:w-1/2 relative rounded-[25px] overflow-hidden group">
          {/* Content */}
          <div className="relative p-6 z-10 text-white">
            <Image src="/images/info_icon_2.png" alt="Info Icon 1" width={77} height={77} />
            <h3 className="text-[32px] font-semibold mb-2 sm:w-[60%] w-[80%] font-[urbanist]">
              {aboutUsData.visionMission.vision.title}
            </h3>
            <div>
              <p className="mb-4 font-[urbanist] font-semibold">
                {aboutUsData.visionMission.vision.description}
              </p>
            </div>
          </div>

          {/* Extra div for zoom effect (background) */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
            style={{
              background: `#8cc963`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        {/* Second Box */}
        <div className="w-full sm:w-1/2 relative rounded-[25px] overflow-hidden group">
          {/* Content */}
          <div className="relative p-6 z-10 text-white">
            <Image src="/images/info_icon_1.png" alt="Info Icon 1" width={77} height={77} />
            <h3 className="text-[32px] font-semibold mb-2 sm:w-[60%] w-[80%] font-[urbanist]">
              {aboutUsData.visionMission.mission.title}
            </h3>
            <div>
              <p className="mb-4 font-[urbanist] font-semibold">
                {aboutUsData.visionMission.mission.description}
              </p>
            </div>
          </div>

          {/* Extra div for zoom effect (background) */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
            style={{
              background: `#8cc963`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col py-[100px] text-[#fff] bg-[#025C7A] justify-center items-center">
        <div className="mx-auto mb-12">
          <h2 className="text-[32px] sm:text-[42px] font-semibold capitalize text-left sm:text-center leading-[1.2em] mb-4 sm:mx-auto sm:w-[45%] mx-8">
            {aboutUsData.trustedExperts.title}
          </h2>
          <p className="text-md mt-1 text-left sm:text-center font-[urbanist] font-semibold sm:w-[90%] mx-8 sm:mx-auto">
            {aboutUsData.trustedExperts.description}
          </p>
        </div>

        <div className="gallery-container mx-0 w-[85%] sm:w-[93%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {aboutUsData.trustedExperts.teamMembers.map((member, index) => (
              <div
                key={index}
                className="gallery-box relative bg-cover bg-center rounded-[23px] shadow-lg overflow-hidden group"
                style={{
                  height: "394px",
                  backgroundImage: `url(${member.image})`,
                }}
              >
                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/70 to-transparent text-white opacity-0 transform translate-y-20 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out z-20">
                  <h3 className="text-[32px] font-semibold mb-4 transform group-hover:translate-y-[-10px] transition-all duration-500 ease-in-out">
                    {member.name}
                  </h3>
                  <p className="mb-4 transform group-hover:translate-y-[-10px] transition-all duration-500 ease-in-out">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`info-container flex flex-col sm:flex-row justify-center gap-12 my-[70px] max-w-[1280px] mx-auto flex-wrap sm:flex-nowrap`}
      >
        <div className="info-box p-0 rounded-lg w-[100%] flex flex-col items-center sm:w-[33%]">
          <Image src="/images/email.png" alt="Info Icon 1" width={77} height={77} />
          <h2 className="info-heading text-[30px] font-[urbanist] font-bold text-black text-center mt-4">
            {aboutUsData.contactInfo.email.title}
          </h2>
          {aboutUsData.contactInfo.email.addresses.map((email, index) => (
            <a
              key={index}
              href={`mailto:${email}`}
              className="info-content text-center text-[#4F5E71] font-[16px] leading-[1.2em] mt-1 transition-all duration-300 transform hover:text-[#3778EE] hover:font-semibold cursor-pointer"
            >
              {email}
            </a>
          ))}
        </div>

        <div className="info-box p-0 rounded-lg w-[100%] flex flex-col items-center sm:w-[33%]">
          <Image src="/images/location.png" alt="Info Icon 3" width={77} height={77} />
          <h2 className="info-heading text-[30px] font-[urbanist] font-bold text-black text-center mt-4">
            {aboutUsData.contactInfo.location.title}
          </h2>
          <a
            href={aboutUsData.contactInfo.location.mapLink}
            className="info-content text-center text-[#4F5E71] font-[16px] leading-[1.2em] mt-1 transition-all duration-300 transform hover:text-[#3778EE] hover:font-semibold cursor-pointer"
          >
            {aboutUsData.contactInfo.location.address}
          </a>
        </div>

        <div className="info-box p-0 rounded-lg w-[100%] flex flex-col items-center sm:w-[33%]">
          <Image src="/images/phone.png" alt="Info Icon 2" width={77} height={77} />
          <h2 className="info-heading text-[30px] font-[urbanist] font-bold text-black text-center mt-4">
            {aboutUsData.contactInfo.phone.title}
          </h2>
          {aboutUsData.contactInfo.phone.numbers.map((phone, index) => (
            <a
              key={index}
              href={`tel:${phone}`}
              className="info-content text-center text-[#4F5E71] font-[16px] leading-[1.2em] mt-1 transition-all duration-300 transform hover:text-[#3778EE] hover:font-semibold cursor-pointer"
            >
              {phone}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
