import React from "react";
import Link from "next/link";
import { IBlogDataType } from "../types/Common";

interface IBlogProp {
  blog: IBlogDataType;
  locale: string;
}

function BlogSummaryCard({ blog, locale }: IBlogProp) {
  const getPackageHref = (Urlb: string) => {
    return `/${locale}/blog/${Urlb}`;
  };

  return (
    <>
      <div className="bg-white rounded-[23px] shadow-[0px_0px_2px_1px_#00000040] flex flex-col ml-1">
        <div
          className="w-full h-[160px] sm:h-[210px] aspect-w-2 aspect-h-1 bg-cover bg-center rounded-t-[23px] border-b border-gray-300"
          style={{ backgroundImage: `url(${blog.feature_image})` }}
        ></div>
        <div className="w-full px-4 py-10 flex flex-col justify-center gap-2 sm:gap-5">
          <div className="flex items-start space-x-2">
            <p className="text-[16px] text-[#666666BF]">Admin</p>
            <ul className="list-disc pl-5 space-y-2 text-[16px] text-[#666666BF] marker:text-[#025C7A]">
              <li>India</li>
            </ul>
          </div>

          <p className="text-[22px] text-[#04000B] line-clamp-2 font-semibold hover:text-[#6E9753]">
            <Link href={getPackageHref(blog.url)} passHref>
              {blog.page_heading}
            </Link>
          </p>
          <div>
            <div className="flex items-start space-x-2">
              <p className="text-md text-[#04000B]">
                <Link href={getPackageHref(blog.url)} passHref>
                  Continue Reading
                </Link>
              </p>
              <i className="fa fa-arrow-right text-lg text-[#025C7A] -mt-1" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogSummaryCard;
