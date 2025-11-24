"use client";
import React, { FormEvent, useState } from "react";
import { getLandingTranslations } from "../../lib/translationHelper";
import { ITranslations } from "../../types/Common";
import ClientTestimonialSlider from "../client/ClientTestimonialSlider";

interface TestimonialsSectionProps {
  locale?: string;
}

const TestimonialsSection = ({ locale = "en" }: TestimonialsSectionProps) => {
  // Load translations directly using use()
  const translations: ITranslations = getLandingTranslations(locale);
  const { testimonials, subscribe } = translations.landing;
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState("hidden");

  async function handleSubscription(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    });

    setEmail("");
    setShowToast("");

    const timeoutId = setTimeout(() => {
      setShowToast("hidden");
    }, 5000);

    return () => clearTimeout(timeoutId);
  }

  const testimonialsList = Object.values(testimonials.reviews).map((review, index) => ({
    ...review,
    img: index % 2 === 0 ? "/images/female.svg" : "/images/male.svg",
    rating: 5,
  }));

  return (
    <>
      {/* Testimonials Section */}
      <div className="my-12 max-w-[1280px] mx-8 sm:mx-auto">
        <ClientTestimonialSlider
          heading={testimonials.heading}
          testimonials={testimonialsList}
          ctaText={testimonials.cta}
          currentLocale={locale}
        />
      </div>

      {/* New Section - Subscribe Section */}
      <div
        className="max-w-[1200px] mx-11 h-[500px] rounded-[23px] flex items-center justify-start p-[20px] sm:p-[80px] sm:mx-auto"
        style={{
          backgroundImage: 'url("/images/suscribe_bg.png")',
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="sm:min-w-[600px] bg-black p-6 sm:p-8 pb-12 rounded-[23px] text-left">
          <h2 className="text-white text-[28px] sm:text-[40px] mb-4 font-semibold leading-[1.2em]">
            {subscribe.heading}
          </h2>
          <p className="text-white mb-6">{subscribe.description}</p>

          {/* Toast Notification */}
          <div className={showToast}>
            <div className="toast toast-center toast-center mt-16 z-[100]">
              <div className="alert alert-success">
                <span>{subscribe.toast}</span>
              </div>
            </div>
          </div>

          {/* Subscription Form */}
          <form onSubmit={handleSubscription}>
            <div className="flex flex-col items-center justify-start gap-4 sm:flex-row">
              <input
                type="email"
                placeholder={subscribe.placeholder}
                className="px-4 py-3 w-full max-w-[350px] rounded-2xl text-[#000] bg-white focus:outline-none"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#025C7A] text-white rounded-2xl hover:bg-[#023e56] transition duration-300 w-full sm:w-auto"
              >
                {subscribe.button}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TestimonialsSection;
