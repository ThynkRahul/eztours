import Testimonial from "../../../components/Testimonial";
import TestimonialVideoSection from "../../../components/client/TestimonialVideoSection";
import { Metadata } from "next";
import { getTestimonialsTranslations } from "../../../lib/translationHelper";

export const metadata: Metadata = {
  title: "Client Testimonials - Eaze Tours: Best Travel Agency India",
  description:
    "Read authentic reviews from satisfied travelers who shared their memorable experiences with Eaze Tours, highlighting quality service and unforgettable trips.",
};

export default function Testimonials({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const testimonials = getTestimonialsTranslations(lang);

  return (
    <div>
      <div
        className="relative mt-[150px] max-w-[1280px] mx-8 h-[480px] mb-6 rounded-[23px] overflow-hidden flex items-center justify-start p-[20px] sm:p-[80px] bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/gallery/5.jpg")' }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        {/* Content */}
        <div className="relative z-10 w-[900px] py-8 pt-[150px] text-left">
          <h2 className="text-white text-[56px] mb-4 font-semibold leading-[1.2em]">
            We let our customers talk for us.
          </h2>
          {/* Input Field and Subscribe Button */}
        </div>
      </div>

      {/* Video Section */}
      <TestimonialVideoSection currentLocale={lang} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-1 place-items-center my-12 mx-8">
        {testimonials.map(testimonial => (
          <div key={testimonial.Id} className="h-[100%] mb-8">
            <Testimonial testimonial={testimonial}></Testimonial>
          </div>
        ))}
      </div>
    </div>
  );
}
