"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import isoimage from "../../public/images/iso_cerficate.jpg";
import latoimage from "../../public/images/lato.jpg";
import msmeimage from "../../public/images/msme.jpg";
import mtfoimage from "../../public/images/mtfoi.png";
import sepcimage from "../../public/images/sepc-logo.webp";
import blogData from "../../data/en/blog-structure.json";
import Image from "next/image";
import { getLandingTranslations } from "../../lib/translationHelper";
import { ITranslations } from "../../types/Common";

interface BlogSectionProps {
  locale?: string;
}

const BlogSection = ({ locale = "en" }: BlogSectionProps) => {
  const translations: ITranslations = getLandingTranslations(locale);
  const { blogs } = translations;

  const filteredBlogs = blogData.slice(0, 5);
  const getPackageHref = (Id: string) => {
    return "/blog/" + Id;
  };

  return (
    <>
      <div className="bg-white max-w-[1280px] sm:mx-auto mx-4">
        <div className="max-w-screen-xl my-4">
          <div className="flex justify-between items-center mt-[120px] mb-0">
            <h2
              className="text-2xl font-semibold text-black text-center sm:text-left"
              style={{ fontSize: "32px" }}
            >
              {blogs.accreditations.heading}
            </h2>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 justify-center items-center gap-0 max-w-screen-xl sm:mx-auto">
          {[isoimage, msmeimage, latoimage, sepcimage, mtfoimage].map((imgSrc, index) => (
            <div key={index} className="w-full aspect-square flex justify-center p-6 items-center">
              <Image
                src={imgSrc}
                alt="certificate_Image"
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Heading Before the Blogs Slider */}
      <div className="my-12 max-w-[1280px] mx-4 sm:mx-auto">
        <h2
          className="text-2xl font-semibold text-black mt-[100px] text-center sm:text-left"
          style={{ fontSize: "32px" }}
        >
          {blogs.latest.heading}
        </h2>

        {/* Swiper for the Blogs */}
        <Swiper
          spaceBetween={50}
          grabCursor={true}
          slidesPerView={3} // Show all 3 boxes in a row
          pagination={{ clickable: true }} // Enable pagination
          modules={[Pagination]} // Include Pagination module
          breakpoints={{
            0: {
              slidesPerView: 1, // 1 slide per view on small screens
            },
            640: {
              slidesPerView: 2, // 2 slides per view on tablets
            },
            1024: {
              slidesPerView: 4, // 3 slides per view on desktops
            },
          }}
          className="mt-8"
        >
          {filteredBlogs.map(blog => (
            <SwiperSlide key={blog.url}>
              <div className="bg-white rounded-[23px] shadow-[0px_0px_2px_1px_#00000040] flex flex-col ml-1 mb-[100px] mt-[5px]">
                <div
                  className="w-full h-[160px] sm:h-[210px] aspect-w-2 aspect-h-1 bg-cover bg-center rounded-t-[23px] border-b border-gray-300"
                  style={{ backgroundImage: `url(${blog.feature_image})` }}
                ></div>
                <div className="w-full px-4 py-10 flex flex-col justify-center gap-2 sm:gap-5">
                  <div className="flex items-start space-x-2">
                    <p className="text-[16px] text-[#666666BF]">{blogs.blogCard.company}</p>
                    <ul className="list-disc pl-5 space-y-2 text-[16px] text-[#666666BF] marker:text-[#025C7A]">
                      <li>{blogs.blogCard.location}</li>
                    </ul>
                  </div>

                  <p className="text-[22px] text-[#04000B] line-clamp-2 font-semibold hover:text-[#6E9753]">
                    <Link href={getPackageHref(blog.url)} passHref>
                      {blog.title}
                    </Link>
                  </p>
                  <div>
                    <div className="flex items-start space-x-2">
                      <p className="text-md text-[#04000B]">
                        <Link href={getPackageHref(blog.url)} passHref>
                          {blogs.blogCard.continueReading}
                        </Link>
                      </p>
                      <i className="fa fa-arrow-right text-lg text-[#025C7A] -mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* "See All Blogs Button */}
      <div className="text-center my-12">
        <a href="/blog">
          <button className="px-8 py-4 border-2 border-[#025C7A] bg-white text-[#025C7A] rounded-full hover:bg-[#025C7A] hover:text-white transition-all duration-300">
            {blogs.cta.viewAll}
          </button>
        </a>
      </div>
    </>
  );
};

export default BlogSection;
