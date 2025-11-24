import PackagesList from "../../../../components/Packages";
import PackageDetail from "../../../../components/PackageDetail";
import packageData from "../../../../data/en/packages.json";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";

type Params = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const param = await props.params;
  const slug = param.slug;

  if (slug !== undefined && slug.length == 1) {
    const packageUri = slug[0];
    const tourPackage = packageData.find(tourPackage => tourPackage.Uri === packageUri);

    if (tourPackage) {
      return {
        title: tourPackage.Title,
        description: tourPackage.Description,
      };
    }
  }

  return {
    title: "Luxury Holiday Tour Packages in India - Eaze Tours",
    description:
      "Explore luxury holiday packages in India with Eaze Tours. From India tour packages from Delhi to the best tours to India from the USA, plan your trip today!",
  };
}

export default async function Packages(props: Params) {
  const param = await props.params;
  const slug = param.slug;

  if (!slug) {
    return (
      <div className="mt-[78px] sm:mt-[135px]">
        <PackagesList />
      </div>
    );
  } else if (slug.length === 1) {
    const packageUri = slug[0];
    const tourPackage = packageData.find(p => p.Uri === packageUri);

    if (tourPackage) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: tourPackage.Title,
        description: tourPackage.Description,
        url: `https://www.eazetours.com/packages/${tourPackage.Uri}`,
        image: tourPackage.Itinerary?.[0]?.Images?.[0]?.src || "",
        itinerary: {
          "@type": "ItemList",
          itemListElement: tourPackage.Itinerary.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `Day ${item.Day}: ${item.Name}`,
          })),
        },
        provider: {
          "@type": "TravelAgency",
          name: "EazeTours",
          url: "https://www.eazetours.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Eaze House ~2nd Floor, RZP-146 Palam Colony",
            addressLocality: "New Delhi",
            addressRegion: "South West Delhi",
            postalCode: "110075",
            addressCountry: "IN",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "heritage specialist",
              telephone: "+91 9911684818",
              email: "mailto:info@eazetours.com",
            },
            {
              "@type": "ContactPoint",
              contactType: "emergency support",
              telephone: "+91 9818006830",
              email: "mailto:harshit@eazetours.com",
            },
          ],
        },
        duration: `P${tourPackage.Itinerary.length}D`,
        touristType: tourPackage.TouristType || [],
        location: {
          "@type": "Place",
          name: String(tourPackage.LocationDescription),
          address: {
            "@type": "PostalAddress",
            addressCountry: "India",
            addressRegion: String(tourPackage.Location?.Address?.AddressRegion || ""),
          },
          geo: {
            "@type": "GeoShape",
            line: String(tourPackage.Location?.Geo?.Line || ""),
          },
        },
        includesAttractions: tourPackage.IncludesAttractions || [],
        physicalRequirement: {
          "@type": "PhysicalActivityRequirement",
          exerciseIntensity: "LowIntensity",
          suggestedAge: "All Ages",
          requiredAttendeeMinimumAge: 5,
        },
        tourCompanion: {
          "@type": "TourCompanion",
          name: String(tourPackage.TourCompanion?.Name),
          description: String(tourPackage.TourCompanion?.Description),
        },
        review: [
          {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(tourPackage.Ratings),
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Verified Traveller",
            },
            itemReviewed: {
              "@type": "Product",
              name: tourPackage.Title,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: String(tourPackage.Ratings),
                reviewCount: String(tourPackage.NoOfRatings),
              },
            },
          },
        ],
      };

      return (
        <>
          <Script
            id="tourist-trip-schema"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
          <div className="mt-[78px] sm:mt-[135px]">
            <PackageDetail packageUri={packageUri} />
          </div>
        </>
      );
    }
  }

  return notFound();
}
