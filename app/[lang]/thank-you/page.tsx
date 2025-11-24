import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | EazeTours",
  description:
    "We’ve received your enquiry. Our travel experts will contact you soon to help plan your perfect trip.",
  robots: "index, follow",
  openGraph: {
    title: "Thank You | EazeTours",
    description:
      "We’ve received your enquiry. Our travel experts will contact you soon to help plan your perfect trip.",
    url: "https://www.eazetours.com/thank-you",
    siteName: "EazeTours",
    images: [
      {
        url: "https://www.eazetours.com/images/thankyou-banner.jpg",
        width: 1200,
        height: 630,
        alt: "EazeTours Thank You",
      },
    ],
    type: "website",
  },
};

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg text-center">
        We have received your query and will get back to you shortly.
      </p>
    </div>
  );
}
