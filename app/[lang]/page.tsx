import Landing from "../../components/Landing";
import CanonicalURL from "../../components/CanonicalURL";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "India Best Tour Packages for USA Travelers - Eaze Tours",
  description:
    "Explore incredible India with our trips to India packages. Eaze Tours offers the best India tours packages tailored for an unforgettable journey.",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-video-preview": -1,
    "max-image-preview": "large",
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "6LAck0ASlqXJ_cAT0c3qjx9-cQmgC1y0rMnJo11P7DU",
  },
};
export default function Home({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return <Landing locale={lang as string} />;
}
