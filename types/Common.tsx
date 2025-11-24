interface IItineraryLineDataType {
  Name: string;
  Description: Array<string>;
  Images?: Array<{ src: string; alt: string }>;
  Id: number;
  Day: string;
}

interface IPackageDetailDataType {
  Id: number;
  Days: number;
  DurationDisplay: string;
  Itinerary: Array<IItineraryLineDataType>;
  Name: string;
  LocationDescription: string;
  Tags: Array<string>;
  Title: string;
  Uri: string;
  Description: string;
  NoOfRatings: number;
  Ratings: number;
  AdditionalInformation: string;
  WhatsIncluded: string;
  WhatsExcluded: string;
  Overview: string;
  Summary: string;
  TouristType: Array<string>;
  Location: {
    Address: {
      AddressRegion: string;
    };
    Geo: {
      Line: string;
    };
  };
  IncludesAttractions: Array<string>;
  TourCompanion: {
    Name: string;
    Description: string;
  };
}

interface ITestimonialDataType {
  Id: number;
  User: string;
  Content: string;
  Location: string;
  Img: string;
}

// Blog structure interfaces
interface IBlogLink {
  text: string;
  url: string;
  key: string;
}

type IBlogLinks = IBlogLink[];

interface IBlogIntroduction {
  content: string;
  links?: IBlogLinks;
}

interface IBlogBulletPoint {
  title?: string;
  content: string;
}

interface IBlogSubheading {
  title: string;
  content: string;
  links?: IBlogLinks;
}

interface IBlogSection {
  heading: string;
  content?: string;
  links?: IBlogLinks;
  bullet_points?: Array<string | IBlogBulletPoint>;
  subheadings?: Array<IBlogSubheading>;
}

interface IBlogConclusion {
  heading: string;
  content: string;
  links?: IBlogLinks;
}

interface IBlogStructure {
  introduction: IBlogIntroduction;
  main_sections: Array<IBlogSection>;
  conclusion: IBlogConclusion;
}

interface IBlogFAQItem {
  question: string;
  answer: string;
}

interface IBlogDataType {
  url: string;
  title: string;
  description: string;
  image: string;
  feature_image: string;
  page_heading: string;
  structure: IBlogStructure;
  faq?: IBlogFAQItem[]; // <-- Add FAQ here as optional
}

interface IPackage {
  location: string;
  route: string;
  tags: string[];
  imagePath: string;
  title?: string;
}

interface ITranslations {
  landing: {
    hero: {
      heading: string;
      description: string;
      cta: string;
    };
    infoBoxes: {
      box1: {
        heading: string;
        content: string;
      };
      box2: {
        heading: string;
        content: string;
      };
      box3: {
        heading: string;
        content: string;
      };
      box4: {
        heading: string;
        content: string;
      };
    };
    destinations: {
      heading: string;
      locations: {
        india: {
          title: string;
          content: string;
        };
        maldives: {
          title: string;
          content: string;
        };
        nepal: {
          title: string;
          content: string;
        };
        bhutan: {
          title: string;
          content: string;
        };
        sriLanka: {
          title: string;
          content: string;
        };
      };
      cta: string;
      ctaButton: string;
    };
    tripIdeas: {
      heading: string;
      indiaTrip: {
        heading: string;
        description: string;
        cta: string;
      };
      amritsarTrip: {
        heading: string;
        description: string;
        cta: string;
      };
    };
    testimonials: {
      heading: string;
      reviews: {
        [key: string]: {
          name: string;
          location: string;
          content: string;
        };
      };
      cta: string;
    };
    popularPackages: {
      heading: string;
      packages: {
        [key: string]: IPackage;
      };
      cta: {
        details: string;
        allPackages: string;
      };
    };
    gallery: {
      heading: string;
      cta: {
        viewAll: string;
        instagram: string;
      };
    };
    subscribe: {
      heading: string;
      description: string;
      placeholder: string;
      button: string;
      toast: string;
    };
    common: {
      reviews: string;
      rating: string;
    };
  };
  blogs: {
    accreditations: {
      heading: string;
    };
    latest: {
      heading: string;
    };
    blogCard: {
      company: string;
      location: string;
      continueReading: string;
    };
    cta: {
      viewAll: string;
    };
  };
  footer: {
    about: string;
    sections: {
      usefulLinks: string;
      topDestinations: string;
      contactUs: string;
    };
    destinations: {
      delhi: string;
      jaipur: string;
      agra: string;
      varanasi: string;
      goa: string;
    };
    copyright: string;
  };
}

export type {
  IPackageDetailDataType,
  IItineraryLineDataType,
  ITestimonialDataType,
  IBlogDataType,
  IBlogIntroduction,
  IBlogSection,
  IBlogConclusion,
  IBlogStructure,
  IBlogLink,
  IBlogLinks,
  IBlogBulletPoint,
  IBlogSubheading,
  ITranslations,
};
