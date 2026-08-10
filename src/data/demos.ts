export type Demo = {
  slug: string;
  name: string;
  industrySlug: string;
  industry: string;
  description: string;
  demoUrl: string;
};

export type Industry = {
  slug: string;
  name: string;
  description: string;
  blurb: string;
};

// export const industries: Industry[] = [
//   {
//     slug: "education",
//     name: "Education",
//     description:
//       "Modern websites and digital experiences for schools, colleges and education organizations.",
//     blurb: "Explore our education projects.",
//   },
//   {
//     slug: "cleaning-services",
//     name: "Cleaning & Services",
//     description: "Professional digital experiences for service-based businesses.",
//     blurb: "Explore our service business projects.",
//   },
//   {
//     slug: "travel-tourism",
//     name: "Travel & Tourism",
//     description: "Engaging websites designed for tour operators and travel businesses.",
//     blurb: "Explore our travel and tourism projects.",
//   },
//   {
//     slug: "creative-portfolio",
//     name: "Creative & Portfolio",
//     description: "Modern visual experiences for creative businesses and professionals.",
//     blurb: "Explore our creative and portfolio projects.",
//   },
//   {
//     slug: "real-estate",
//     name: "Real Estate",
//     description: "Professional property-focused digital experiences.",
//     blurb: "Explore our real estate projects.",
//   },
//   {
//     slug: "healthcare",
//     name: "Healthcare",
//     description:
//       "Accessible and professional digital experiences for healthcare organizations.",
//     blurb: "Explore our healthcare projects.",
//   },
//   {
//     slug: "construction",
//     name: "Construction",
//     description: "Professional digital platforms for construction and engineering businesses.",
//     blurb: "Explore our construction and engineering projects.",
//   },
//   {
//     slug: "technology",
//     name: "Technology",
//     description: "Modern digital experiences for technology businesses and startups.",
//     blurb: "Explore our technology projects.",
//   },
// ];

// export const demos: Demo[] = [
//   {
//     slug: "grammarspire",
//     name: "GrammarSpire",
//     industrySlug: "education",
//     industry: "Education",
//     description: "A modern school website experience built for an education institution.",
//     demoUrl: "https://grammarspire.afripixelprojects.com",
//   },
//   {
//     slug: "nakuru-chess",
//     name: "Nakuru Chess",
//     industrySlug: "education",
//     industry: "Education",
//     description: "A learning and community platform for a chess academy.",
//     demoUrl: "https://nakuruchess.afripixelprojects.com",
//   },
//   {
//     slug: "mephys",
//     name: "Mephys",
//     industrySlug: "cleaning-services",
//     industry: "Cleaning & Services",
//     description: "A professional service business website with clear enquiry journeys.",
//     demoUrl: "https://mephys.afripixelprojects.com",
//   },
//   {
//     slug: "identity-cleaners",
//     name: "Identity Cleaners",
//     industrySlug: "cleaning-services",
//     industry: "Cleaning & Services",
//     description: "A cleaning company website focused on trust and bookings.",
//     demoUrl: "https://identitycleaners.afripixelprojects.com",
//   },
//   {
//     slug: "winpa-tours",
//     name: "Winpa Tours",
//     industrySlug: "travel-tourism",
//     industry: "Travel & Tourism",
//     description: "A tour operator website designed to convert travel enquiries.",
//     demoUrl: "https://winpatours.afripixelprojects.com",
//   },
//   {
//     slug: "safari-excursions",
//     name: "Safari Excursions",
//     industrySlug: "travel-tourism",
//     industry: "Travel & Tourism",
//     description: "An immersive safari experience website for travel packages.",
//     demoUrl: "https://safariexcursions.afripixelprojects.com",
//   },
//   {
//     slug: "volta",
//     name: "Volta",
//     industrySlug: "creative-portfolio",
//     industry: "Creative & Portfolio",
//     description: "A bold creative brand experience with strong visual storytelling.",
//     demoUrl: "https://volta.afripixelprojects.com",
//   },
//   {
//     slug: "nairobi-picture",
//     name: "Nairobi Picture",
//     industrySlug: "creative-portfolio",
//     industry: "Creative & Portfolio",
//     description: "A photography portfolio built around visual impact.",
//     demoUrl: "https://nairobipicture.afripixelprojects.com",
//   },
//   {
//     slug: "prime",
//     name: "Prime",
//     industrySlug: "real-estate",
//     industry: "Real Estate",
//     description: "A property listing experience for a real estate business.",
//     demoUrl: "https://prime.afripixelprojects.com",
//   },
//   {
//     slug: "malel-heights",
//     name: "Malel Heights",
//     industrySlug: "real-estate",
//     industry: "Real Estate",
//     description: "A premium property development showcase website.",
//     demoUrl: "https://malelheights.afripixelprojects.com",
//   },
//   {
//     slug: "tiba-healthcare",
//     name: "Tiba Healthcare",
//     industrySlug: "healthcare",
//     industry: "Healthcare",
//     description: "An accessible healthcare website with clear patient journeys.",
//     demoUrl: "https://tibahealthcare.afripixelprojects.com",
//   },
//   {
//     slug: "caresphere",
//     name: "CareSphere",
//     industrySlug: "healthcare",
//     industry: "Healthcare",
//     description: "A modern care provider platform experience.",
//     demoUrl: "https://caresphere.afripixelprojects.com",
//   },
//   {
//     slug: "scalworks",
//     name: "Scalworks",
//     industrySlug: "construction",
//     industry: "Construction",
//     description: "A construction and engineering company website.",
//     demoUrl: "https://scalworks.afripixelprojects.com",
//   },
//   {
//     slug: "tunnelling",
//     name: "Tunnelling",
//     industrySlug: "construction",
//     industry: "Construction",
//     description: "A specialist engineering and infrastructure project website.",
//     demoUrl: "https://tunnelling.afripixelprojects.com",
//   },
//   {
//     slug: "dottech",
//     name: "DotTech",
//     industrySlug: "technology",
//     industry: "Technology",
//     description: "A modern technology company website for a digital business.",
//     demoUrl: "https://dottech.afripixelprojects.com",
//   },
// ];
// -------------------------------------------------------
export const industries: Industry[] = [
  {
    slug: "business-professional-services",
    name: "Business & Professional Services",
    description:
      "Professional digital experiences for consultants, agencies, corporate service providers and business organizations.",
    blurb: "Explore our business and professional service projects.",
  },
  {
    slug: "construction-engineering",
    name: "Construction & Engineering",
    description:
      "Professional digital experiences for construction, engineering, infrastructure and technical businesses.",
    blurb: "Explore our construction and engineering projects.",
  },
  {
    slug: "education-training",
    name: "Education & Training",
    description:
      "Modern websites and digital experiences for schools, training institutions, academies and education organizations.",
    blurb: "Explore our education and training projects.",
  },
  {
    slug: "travel-hospitality",
    name: "Travel & Hospitality",
    description:
      "Engaging digital experiences for tour operators, travel companies, hospitality businesses and accommodation providers.",
    blurb: "Explore our travel and hospitality projects.",
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    description:
      "Conversion-focused digital experiences for retailers, online stores, product brands and e-commerce businesses.",
    blurb: "Explore our retail and e-commerce projects.",
  },
  {
    slug: "healthcare-wellness",
    name: "Healthcare & Wellness",
    description:
      "Accessible and professional digital experiences for healthcare providers, wellness brands and care organizations.",
    blurb: "Explore our healthcare and wellness projects.",
  },
  {
    slug: "agriculture-food",
    name: "Agriculture & Food",
    description:
      "Digital experiences for agricultural businesses, food producers, suppliers and food-focused brands.",
    blurb: "Explore our agriculture and food projects.",
  },
  {
    slug: "technology-digital",
    name: "Technology & Digital",
    description:
      "Modern digital experiences for technology companies, software businesses, IT providers and digital startups.",
    blurb: "Explore our technology and digital projects.",
  },
  {
    slug: "creative-media-events",
    name: "Creative, Media & Events",
    description:
      "Visually engaging digital experiences for creatives, media companies, photographers, entertainers and event businesses.",
    blurb: "Explore our creative, media and events projects.",
  },
  {
    slug: "real-estate-property",
    name: "Real Estate & Property",
    description:
      "Professional property-focused digital experiences for developers, property companies, agents and real estate brands.",
    blurb: "Explore our real estate and property projects.",
  },
  {
    slug: "cleaning-hygiene-pest-control",
    name: "Cleaning, Hygiene & Pest Control",
    description:
      "Professional digital experiences for cleaning companies, hygiene providers and pest control businesses.",
    blurb: "Explore our cleaning, hygiene and pest control projects.",
  },
];

export const demos: Demo[] = [
  // ============================================================
  // BUSINESS & PROFESSIONAL SERVICES
  // ============================================================

  {
    slug: "aj-consulting",
    name: "AJ Consulting",
    industrySlug: "business-professional-services",
    industry: "Business & Professional Services",
    description:
      "A professional consulting website designed to communicate expertise, services and business value.",
    demoUrl: "https://ajconsulting.afripixelprojects.com",
  },
  {
    slug: "rova",
    name: "Rova",
    industrySlug: "business-professional-services",
    industry: "Business & Professional Services",
    description:
      "A modern professional services website focused on credibility and business enquiries.",
    demoUrl: "https://rova.afripixelprojects.com",
  },
  {
    slug: "tasec",
    name: "TASEC",
    industrySlug: "business-professional-services",
    industry: "Business & Professional Services",
    description:
      "A corporate business website presenting professional services and organizational capabilities.",
    demoUrl: "https://tasec.afripixelprojects.com",
  },
  {
    slug: "ymia",
    name: "YMIA",
    industrySlug: "business-professional-services",
    industry: "Business & Professional Services",
    description:
      "A professional organization website designed to establish trust and communicate its services.",
    demoUrl: "https://ymia.afripixelprojects.com",
  },
  {
    slug: "delglobe",
    name: "Delglobe",
    industrySlug: "business-professional-services",
    industry: "Business & Professional Services",
    description:
      "A corporate digital presence designed for a professional business organization.",
    demoUrl: "https://delglobe.afripixelprojects.com",
  },
  {
    slug: "she-systems",
    name: "SHE Systems",
    industrySlug: "business-professional-services",
    industry: "Business & Professional Services",
    description:
      "A professional services website with a structured presentation of business capabilities.",
    demoUrl: "https://shesystems.afripixelprojects.com",
  },
  {
    slug: "mutinda",
    name: "Mutinda",
    industrySlug: "business-professional-services",
    industry: "Business & Professional Services",
    description:
      "A professional business website designed around services, credibility and client engagement.",
    demoUrl: "https://mutinda.afripixelprojects.com",
  },
  {
    slug: "harritone-and-ngarama",
    name: "Harritone & Ngarama",
    industrySlug: "business-professional-services",
    industry: "Business & Professional Services",
    description:
      "A professional corporate website presenting business services and organizational identity.",
    demoUrl: "https://harritone-and-ngarama.afripixelprojects.com",
  },

  // ============================================================
  // CONSTRUCTION & ENGINEERING
  // ============================================================

  {
    slug: "scalworks",
    name: "Scalworks",
    industrySlug: "construction-engineering",
    industry: "Construction & Engineering",
    description:
      "A construction and engineering company website showcasing technical capabilities and projects.",
    demoUrl: "https://scalworks.afripixelprojects.com",
  },
  {
    slug: "pavers",
    name: "Pavers",
    industrySlug: "construction-engineering",
    industry: "Construction & Engineering",
    description:
      "A construction-focused website presenting paving and related technical services.",
    demoUrl: "https://pavers.afripixelprojects.com",
  },
  {
    slug: "jegudiel",
    name: "Jegudiel",
    industrySlug: "construction-engineering",
    industry: "Construction & Engineering",
    description:
      "A professional construction website designed to communicate services and project expertise.",
    demoUrl: "https://jegudiel.afripixelprojects.com",
  },
  {
    slug: "tunnelling",
    name: "Tunnelling",
    industrySlug: "construction-engineering",
    industry: "Construction & Engineering",
    description:
      "A specialist engineering and infrastructure project website.",
    demoUrl: "https://tunnelling.afripixelprojects.com",
  },
  {
    slug: "skarn",
    name: "Skarn",
    industrySlug: "construction-engineering",
    industry: "Construction & Engineering",
    description:
      "A technical construction and engineering business website.",
    demoUrl: "https://skarn.afripixelprojects.com",
  },
  {
    slug: "inhep",
    name: "INHEP",
    industrySlug: "construction-engineering",
    industry: "Construction & Engineering",
    description:
      "An engineering-focused website presenting technical expertise and services.",
    demoUrl: "https://inhep.afripixelprojects.com",
  },
  {
    slug: "visionpoint",
    name: "VisionPoint",
    industrySlug: "construction-engineering",
    industry: "Construction & Engineering",
    description:
      "A professional construction and engineering digital presence.",
    demoUrl: "https://visionpoint.afripixelprojects.com",
  },
  {
    slug: "prosig",
    name: "ProSIG",
    industrySlug: "construction-engineering",
    industry: "Construction & Engineering",
    description:
      "A technical business website designed to showcase engineering services and capabilities.",
    demoUrl: "https://prosig.afripixelprojects.com",
  },
  {
    slug: "jair",
    name: "JAIR",
    industrySlug: "construction-engineering",
    industry: "Construction & Engineering",
    description:
      "A professional engineering and construction company website.",
    demoUrl: "https://jair.afripixelprojects.com",
  },
  {
    slug: "electroman",
    name: "Electroman",
    industrySlug: "construction-engineering",
    industry: "Construction & Engineering",
    description:
      "A technical services website focused on electrical and engineering solutions.",
    demoUrl: "https://electroman.afripixelprojects.com",
  },

  // ============================================================
  // EDUCATION & TRAINING
  // ============================================================

  {
    slug: "grammarspire",
    name: "GrammarSpire",
    industrySlug: "education-training",
    industry: "Education & Training",
    description:
      "A modern education website experience built for learning and academic engagement.",
    demoUrl: "https://grammarspire.afripixelprojects.com",
  },
  {
    slug: "alixar",
    name: "Alixar",
    industrySlug: "education-training",
    industry: "Education & Training",
    description:
      "An education-focused digital experience designed to communicate learning opportunities.",
    demoUrl: "https://alixar.afripixelprojects.com",
  },
  {
    slug: "aviation",
    name: "Aviation",
    industrySlug: "education-training",
    industry: "Education & Training",
    description:
      "A specialized education website for aviation training and learning.",
    demoUrl: "https://aviation.afripixelprojects.com",
  },
  {
    slug: "nakuru-chess",
    name: "Nakuru Chess",
    industrySlug: "education-training",
    industry: "Education & Training",
    description:
      "A learning and community platform for a chess academy.",
    demoUrl: "https://nakuruchess.afripixelprojects.com",
  },
  {
    slug: "goldenview",
    name: "Golden View",
    industrySlug: "education-training",
    industry: "Education & Training",
    description:
      "An education-focused website designed to present an institution and its learning experience.",
    demoUrl: "https://goldenview.afripixelprojects.com",
  },
  {
    slug: "atlas",
    name: "Atlas",
    industrySlug: "education-training",
    industry: "Education & Training",
    description:
      "A modern digital experience for an education and learning organization.",
    demoUrl: "https://atlas.afripixelprojects.com",
  },
  {
    slug: "brainwave",
    name: "Brainwave",
    industrySlug: "education-training",
    industry: "Education & Training",
    description:
      "A modern learning-focused digital experience.",
    demoUrl: "https://brainwave.afripixelprojects.com",
  },
  {
    slug: "romu",
    name: "ROMU",
    industrySlug: "education-training",
    industry: "Education & Training",
    description:
      "An education and training organization website focused on clear information and engagement.",
    demoUrl: "https://romu.afripixelprojects.com",
  },

  // ============================================================
  // TRAVEL & HOSPITALITY
  // ============================================================

  {
    slug: "tangatanga",
    name: "TangaTanga",
    industrySlug: "travel-hospitality",
    industry: "Travel & Hospitality",
    description:
      "An engaging travel website designed to inspire visitors and generate travel enquiries.",
    demoUrl: "https://tangatanga.afripixelprojects.com",
  },
  {
    slug: "gracious",
    name: "Gracious",
    industrySlug: "travel-hospitality",
    industry: "Travel & Hospitality",
    description:
      "A hospitality-focused digital experience designed around guest engagement.",
    demoUrl: "https://gracious.afripixelprojects.com",
  },
  {
    slug: "winpa-tours",
    name: "Winpa Tours",
    industrySlug: "travel-hospitality",
    industry: "Travel & Hospitality",
    description:
      "A tour operator website designed to convert travel enquiries.",
    demoUrl: "https://winpatours.afripixelprojects.com",
  },
  {
    slug: "mon-voyage",
    name: "Mon Voyage",
    industrySlug: "travel-hospitality",
    industry: "Travel & Hospitality",
    description:
      "A travel website presenting destinations and experiences for prospective travellers.",
    demoUrl: "https://monvoyage.afripixelprojects.com",
  },
  {
    slug: "safari-excursions",
    name: "Safari Excursions",
    industrySlug: "travel-hospitality",
    industry: "Travel & Hospitality",
    description:
      "An immersive safari experience website for travel packages.",
    demoUrl: "https://safariexcursions.afripixelprojects.com",
  },
  {
    slug: "africa-legacy",
    name: "Africa Legacy",
    industrySlug: "travel-hospitality",
    industry: "Travel & Hospitality",
    description:
      "An African travel and tourism website focused on experiences and destinations.",
    demoUrl: "https://africalegacy.afripixelprojects.com",
  },
  {
    slug: "kabs",
    name: "Kabs",
    industrySlug: "travel-hospitality",
    industry: "Travel & Hospitality",
    description:
      "A travel and hospitality digital experience designed around customer enquiries.",
    demoUrl: "https://kabs.afripixelprojects.com",
  },
  {
    slug: "kayarabuk",
    name: "Kayarabuk",
    industrySlug: "travel-hospitality",
    industry: "Travel & Hospitality",
    description:
      "A destination and travel-focused website designed to showcase experiences.",
    demoUrl: "https://kayarabuk.afripixelprojects.com",
  },
  {
    slug: "cab-twenty-four",
    name: "Cab Twenty Four",
    industrySlug: "travel-hospitality",
    industry: "Travel & Hospitality",
    description:
      "A transport and mobility-focused digital experience for customers.",
    demoUrl: "https://cab-twenty-four.afripixelprojects.com",
  },
  {
    slug: "enkang",
    name: "Enkang",
    industrySlug: "travel-hospitality",
    industry: "Travel & Hospitality",
    description:
      "A hospitality and destination-focused digital experience.",
    demoUrl: "https://enkang.afripixelprojects.com",
  },

  // ============================================================
  // RETAIL & E-COMMERCE
  // ============================================================

  {
    slug: "disney",
    name: "Disney",
    industrySlug: "retail-ecommerce",
    industry: "Retail & E-commerce",
    description:
      "A product-focused retail experience designed around visual presentation and customer discovery.",
    demoUrl: "https://disney.afripixelprojects.com",
  },
  {
    slug: "africa-beauty",
    name: "Africa Beauty",
    industrySlug: "retail-ecommerce",
    industry: "Retail & E-commerce",
    description:
      "A beauty-focused retail experience designed to showcase products and encourage purchases.",
    demoUrl: "https://africabeauty.afripixelprojects.com",
  },
  {
    slug: "twilight",
    name: "Twilight",
    industrySlug: "retail-ecommerce",
    industry: "Retail & E-commerce",
    description:
      "A modern product and retail website focused on brand presentation.",
    demoUrl: "https://twilight.afripixelprojects.com",
  },
  {
    slug: "vinski",
    name: "Vinski",
    industrySlug: "retail-ecommerce",
    industry: "Retail & E-commerce",
    description:
      "A modern retail experience designed around products and customer engagement.",
    demoUrl: "https://vinski.afripixelprojects.com",
  },
  {
    slug: "qevins",
    name: "Qevins",
    industrySlug: "retail-ecommerce",
    industry: "Retail & E-commerce",
    description:
      "A product-focused e-commerce experience.",
    demoUrl: "https://qevins.afripixelprojects.com",
  },
  {
    slug: "daddy",
    name: "Daddy",
    industrySlug: "retail-ecommerce",
    industry: "Retail & E-commerce",
    description:
      "A consumer-focused retail website designed for product discovery.",
    demoUrl: "https://daddy.afripixelprojects.com",
  },
  {
    slug: "nexo",
    name: "Nexo",
    industrySlug: "retail-ecommerce",
    industry: "Retail & E-commerce",
    description:
      "A modern product and retail digital experience.",
    demoUrl: "https://nexo.afripixelprojects.com",
  },
  {
    slug: "martiple",
    name: "Martiple",
    industrySlug: "retail-ecommerce",
    industry: "Retail & E-commerce",
    description:
      "A retail-oriented website focused on products and customer engagement.",
    demoUrl: "https://martiple.afripixelprojects.com",
  },
  {
    slug: "gelx-pens",
    name: "GelX Pens",
    industrySlug: "retail-ecommerce",
    industry: "Retail & E-commerce",
    description:
      "A product-focused retail website showcasing consumer products.",
    demoUrl: "https://gelxpens.afripixelprojects.com",
  },
  {
    slug: "maz-parts",
    name: "Maz Parts",
    industrySlug: "retail-ecommerce",
    industry: "Retail & E-commerce",
    description:
      "An automotive parts retail experience designed around product discovery.",
    demoUrl: "https://mazparts.afripixelprojects.com",
  },

  // ============================================================
  // HEALTHCARE & WELLNESS
  // ============================================================

  {
    slug: "tiba-healthcare",
    name: "Tiba Healthcare",
    industrySlug: "healthcare-wellness",
    industry: "Healthcare & Wellness",
    description:
      "An accessible healthcare website with clear patient journeys.",
    demoUrl: "https://tibahealthcare.afripixelprojects.com",
  },
  {
    slug: "caresphere",
    name: "CareSphere",
    industrySlug: "healthcare-wellness",
    industry: "Healthcare & Wellness",
    description:
      "A modern care provider platform experience.",
    demoUrl: "https://caresphere.afripixelprojects.com",
  },
  {
    slug: "betterself",
    name: "BetterSelf",
    industrySlug: "healthcare-wellness",
    industry: "Healthcare & Wellness",
    description:
      "A wellness-focused digital experience designed around personal wellbeing.",
    demoUrl: "https://betterself.afripixelprojects.com",
  },
  {
    slug: "lindex",
    name: "Lindex",
    industrySlug: "healthcare-wellness",
    industry: "Healthcare & Wellness",
    description:
      "A professional healthcare and wellness digital experience.",
    demoUrl: "https://lindex.afripixelprojects.com",
  },
  {
    slug: "igniting",
    name: "Igniting",
    industrySlug: "healthcare-wellness",
    industry: "Healthcare & Wellness",
    description:
      "A wellness-focused website designed to communicate services and encourage engagement.",
    demoUrl: "https://igniting.afripixelprojects.com",
  },

  // ============================================================
  // AGRICULTURE & FOOD
  // ============================================================

  {
    slug: "fresh-dawn",
    name: "Fresh Dawn",
    industrySlug: "agriculture-food",
    industry: "Agriculture & Food",
    description:
      "An agriculture-focused digital experience presenting products and business capabilities.",
    demoUrl: "https://freshdawn.afripixelprojects.com",
  },
  {
    slug: "bontat",
    name: "Bontat",
    industrySlug: "agriculture-food",
    industry: "Agriculture & Food",
    description:
      "A modern website for an agriculture and food-related business.",
    demoUrl: "https://bontat.afripixelprojects.com",
  },
  {
    slug: "agricom",
    name: "Agricom",
    industrySlug: "agriculture-food",
    industry: "Agriculture & Food",
    description:
      "An agriculture business website designed to present products and services.",
    demoUrl: "https://agricom.afripixelprojects.com",
  },
  {
    slug: "foodchain",
    name: "FoodChain",
    industrySlug: "agriculture-food",
    industry: "Agriculture & Food",
    description:
      "A food-sector digital experience focused on products, services and business information.",
    demoUrl: "https://foodchain.afripixelprojects.com",
  },
  {
    slug: "pishori",
    name: "Pishori",
    industrySlug: "agriculture-food",
    industry: "Agriculture & Food",
    description:
      "A food and agricultural brand experience.",
    demoUrl: "https://pishori.afripixelprojects.com",
  },
  {
    slug: "honey",
    name: "Honey",
    industrySlug: "agriculture-food",
    industry: "Agriculture & Food",
    description:
      "A product-focused digital experience for an agricultural food brand.",
    demoUrl: "https://honey.afripixelprojects.com",
  },

  // ============================================================
  // TECHNOLOGY & DIGITAL
  // ============================================================

  {
    slug: "dottech",
    name: "DotTech",
    industrySlug: "technology-digital",
    industry: "Technology & Digital",
    description:
      "A modern technology company website for a digital business.",
    demoUrl: "https://dottech.afripixelprojects.com",
  },
  {
    slug: "fastlink",
    name: "FastLink",
    industrySlug: "technology-digital",
    industry: "Technology & Digital",
    description:
      "A technology-focused website presenting digital and connectivity solutions.",
    demoUrl: "https://fastlink.afripixelprojects.com",
  },
  {
    slug: "amija",
    name: "Amija",
    industrySlug: "technology-digital",
    industry: "Technology & Digital",
    description:
      "A modern digital business website designed around technology and services.",
    demoUrl: "https://amija.afripixelprojects.com",
  },
  {
    slug: "stommtech",
    name: "StommTech",
    industrySlug: "technology-digital",
    industry: "Technology & Digital",
    description:
      "A technology company website presenting digital solutions and capabilities.",
    demoUrl: "https://stommtech.afripixelprojects.com",
  },
  {
    slug: "cleantick",
    name: "CleanTick",
    industrySlug: "technology-digital",
    industry: "Technology & Digital",
    description:
      "A modern technology-oriented digital experience.",
    demoUrl: "https://cleantick.afripixelprojects.com",
  },
  {
    slug: "portiatech",
    name: "PortiaTech",
    industrySlug: "technology-digital",
    industry: "Technology & Digital",
    description:
      "A professional technology website designed to communicate digital solutions.",
    demoUrl: "https://portiatech.afripixelprojects.com",
  },

  // ============================================================
  // CREATIVE, MEDIA & EVENTS
  // ============================================================

  {
    slug: "volta",
    name: "Volta",
    industrySlug: "creative-media-events",
    industry: "Creative, Media & Events",
    description:
      "A bold creative brand experience with strong visual storytelling.",
    demoUrl: "https://volta.afripixelprojects.com",
  },
  {
    slug: "korista",
    name: "Korista",
    industrySlug: "creative-media-events",
    industry: "Creative, Media & Events",
    description:
      "A visually driven creative website designed around brand identity and storytelling.",
    demoUrl: "https://korista.afripixelprojects.com",
  },
  {
    slug: "lafame",
    name: "LaFame",
    industrySlug: "creative-media-events",
    industry: "Creative, Media & Events",
    description:
      "A stylish creative brand experience focused on visual presentation.",
    demoUrl: "https://lafame.afripixelprojects.com",
  },
  {
    slug: "vj",
    name: "VJ",
    industrySlug: "creative-media-events",
    industry: "Creative, Media & Events",
    description:
      "A creative portfolio and media-focused digital experience.",
    demoUrl: "https://vj.afripixelprojects.com",
  },
  {
    slug: "nairobi-picture",
    name: "Nairobi Picture",
    industrySlug: "creative-media-events",
    industry: "Creative, Media & Events",
    description:
      "A photography portfolio built around visual impact.",
    demoUrl: "https://nairobipicture.afripixelprojects.com",
  },
  {
    slug: "j-max",
    name: "J-Max",
    industrySlug: "creative-media-events",
    industry: "Creative, Media & Events",
    description:
      "A creative entertainment and personal brand digital experience.",
    demoUrl: "https://j-max.afripixelprojects.com",
  },
  {
    slug: "sinachi",
    name: "Sinachi",
    industrySlug: "creative-media-events",
    industry: "Creative, Media & Events",
    description:
      "A creative personal brand website focused on visual storytelling.",
    demoUrl: "https://sinachi.afripixelprojects.com",
  },
  {
    slug: "al-huda",
    name: "Al-Huda",
    industrySlug: "creative-media-events",
    industry: "Creative, Media & Events",
    description:
      "A community and events-focused digital experience.",
    demoUrl: "https://al-huda.afripixelprojects.com",
  },

  // ============================================================
  // REAL ESTATE & PROPERTY
  // ============================================================

  {
    slug: "prime",
    name: "Prime",
    industrySlug: "real-estate-property",
    industry: "Real Estate & Property",
    description:
      "A property listing experience for a real estate business.",
    demoUrl: "https://prime.afripixelprojects.com",
  },
  {
    slug: "catech",
    name: "Catech",
    industrySlug: "real-estate-property",
    industry: "Real Estate & Property",
    description:
      "A professional property-focused digital experience.",
    demoUrl: "https://catech.afripixelprojects.com",
  },
  {
    slug: "valentine",
    name: "Valentine",
    industrySlug: "real-estate-property",
    industry: "Real Estate & Property",
    description:
      "A property and real estate website designed around presentation and enquiries.",
    demoUrl: "https://valentine.afripixelprojects.com",
  },
  {
    slug: "malel-heights",
    name: "Malel Heights",
    industrySlug: "real-estate-property",
    industry: "Real Estate & Property",
    description:
      "A premium property development showcase website.",
    demoUrl: "https://malelheights.afripixelprojects.com",
  },
  {
    slug: "inscape",
    name: "Inscape",
    industrySlug: "real-estate-property",
    industry: "Real Estate & Property",
    description:
      "A property and real estate digital experience focused on visual presentation.",
    demoUrl: "https://inscape.afripixelprojects.com",
  },
  {
    slug: "equator",
    name: "Equator",
    industrySlug: "real-estate-property",
    industry: "Real Estate & Property",
    description:
      "A professional real estate website designed to showcase properties and services.",
    demoUrl: "https://equator.afripixelprojects.com",
  },
  {
    slug: "kitui",
    name: "Kitui",
    industrySlug: "real-estate-property",
    industry: "Real Estate & Property",
    description:
      "A property-focused website presenting real estate information and opportunities.",
    demoUrl: "https://kitui.afripixelprojects.com",
  },

  // ============================================================
  // CLEANING, HYGIENE & PEST CONTROL
  // ============================================================

  {
    slug: "mephys",
    name: "Mephys",
    industrySlug: "cleaning-hygiene-pest-control",
    industry: "Cleaning, Hygiene & Pest Control",
    description:
      "A professional service business website with clear enquiry journeys.",
    demoUrl: "https://mephys.afripixelprojects.com",
  },
  {
    slug: "conlays",
    name: "Conlays",
    industrySlug: "cleaning-hygiene-pest-control",
    industry: "Cleaning, Hygiene & Pest Control",
    description:
      "A professional cleaning and service business digital experience.",
    demoUrl: "https://conlays.afripixelprojects.com",
  },
  {
    slug: "identity-cleaners",
    name: "Identity Cleaners",
    industrySlug: "cleaning-hygiene-pest-control",
    industry: "Cleaning, Hygiene & Pest Control",
    description:
      "A cleaning company website focused on trust and bookings.",
    demoUrl: "https://identitycleaners.afripixelprojects.com",
  },
  {
    slug: "ray-cleaners",
    name: "Ray Cleaners",
    industrySlug: "cleaning-hygiene-pest-control",
    industry: "Cleaning, Hygiene & Pest Control",
    description:
      "A professional cleaning services website designed to generate customer enquiries.",
    demoUrl: "https://raycleaners.afripixelprojects.com",
  },
  {
    slug: "bespoke",
    name: "Bespoke",
    industrySlug: "cleaning-hygiene-pest-control",
    industry: "Cleaning, Hygiene & Pest Control",
    description:
      "A service-focused digital experience designed around professional customer solutions.",
    demoUrl: "https://bespoke.afripixelprojects.com",
  },
  {
    slug: "lab-lice",
    name: "Lab Lice",
    industrySlug: "cleaning-hygiene-pest-control",
    industry: "Cleaning, Hygiene & Pest Control",
    description:
      "A specialized hygiene and pest-control focused digital experience.",
    demoUrl: "https://lab-lice.afripixelprojects.com",
  },
];
// -------------------------------------------------------
export const featuredSlugs = ["grammarspire", "malel-heights", "tiba-healthcare", "winpa-tours"];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
export const getDemo = (slug: string) => demos.find((d) => d.slug === slug);
export const demosFor = (industrySlug: string) =>
  demos.filter((d) => d.industrySlug === industrySlug);
export const featuredDemos = () =>
  featuredSlugs.map((s) => getDemo(s)).filter((d): d is Demo => Boolean(d));
