import { Metadata } from "next";
import AboutUs from "../../../components/AboutUs";

export const metadata: Metadata = {
  title: "About Eaze Tours: Explore Unique Travel Experiences",
  description:
    "Learn more about Eaze Tours, offering customized travel experiences. Explore destinations, culture, and adventure tailored to your journey.",
};

export default function About({ params }: { params: { lang: string } }) {
  return <AboutUs locale={params.lang} />;
}
