import { Metadata } from "next";
import GalleryComponent from "../../../components/Gallery";

export const metadata: Metadata = {
  title: "Eaze Tours Gallery | Travel Moments in India",
  description:
    "Discover India through Eaze Tours’ photo gallery stunning landscapes, culture, and adventures from our travel experiences.",
};

export default function Gallery() {
  return <GalleryComponent />;
}
