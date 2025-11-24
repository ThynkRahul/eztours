import React from "react";
import { ITestimonialDataType } from "../types/Common";

interface ITestimonialProp {
  testimonial: ITestimonialDataType;
}

function Testimonial({ testimonial }: ITestimonialProp) {
  return (
    <>
      <div className="testimonial-box flex flex-col justify-start relative flex-shrink-0 bg-white rounded-[30px] shadow-[0px_0px_21.9px_0px_#00000029] overflow-visible group p-10 h-[100%]">
        <div className="flex justify-start gap-3 items-center mb-4">
          <div className="w-[60px] h-[60px] p-2 bg-[#025C7A] rounded-full overflow-hidden">
            <img
              src={testimonial.Img}
              alt={testimonial.User}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Customer Info */}
          <div>
            <h3 className="text-xl font-semibold">{testimonial.User}</h3>
            <p className="text-sm text-[#000] font-500">{testimonial.Location}</p>
          </div>
        </div>

        {/* Testimonial Content */}
        <p className="text-[#777777] mb-4 text-justify">{testimonial.Content}</p>

        {/* Rating with Stars */}
        <div className="flex justify-start items-center">
          <p className="text-gray-700 text-[18px] mr-2">5.0</p>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="text-[#FE7831] font-500 text-[22px]">
              &#9733;
            </span>
          ))}
          {Array.from({ length: 5 - 5 }, (_, i) => (
            <span key={i + 5} className="text-gray-300 text-[18px]">
              &#9733;
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Testimonial;
