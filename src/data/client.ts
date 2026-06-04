// client.ts — the single source of truth for all editable site content.
//
// This is the ONE file a new client fills in. Every component reads from the
// exported `client` object below; none of them hold copy of their own. To spin
// up a new site, edit the values here — don't touch the components.
//
// Image fields are optional and left undefined for now, so the placeholder
// blocks keep rendering. Drop in real photo paths (e.g. "/images/hero.jpg")
// per client when they're ready.

/** A labelled link — used for nav and footer quick links. */
export interface NavLink {
  label: string;
  href: string;
}

/** One item in the hero's trust strip: a bold lead + the rest of the phrase. */
export interface TrustItem {
  strong: string; // emphasised word, e.g. "20+"
  rest: string; //   trailing text, e.g. "Years"
}

/** A service card. `image` is optional until a real photo is supplied. */
export interface Service {
  title: string;
  desc: string;
  image?: string;
}

/** A gallery project (featured or grid). `image` optional until supplied. */
export interface Project {
  title: string;
  meta: string;
  image?: string;
}

/** A customer testimonial. */
export interface Review {
  quote: string;
  name: string;
  detail: string;
}

/** A headline stat in the About band. */
export interface Stat {
  num: string;
  label: string;
}

/** A social link in the footer. */
export interface Social {
  label: string;
  href: string;
}

export interface Client {
  // ── Business identity ────────────────────────────────────────────────
  name: string; //       wordmark / display name (e.g. "Ridgeline")
  legalName: string; //  full legal name, used in the copyright line
  phone: string; //      shown in header, hero, CTA band, contact, footer
  email: string; //      shown in contact + footer

  // ── Header navigation + estimate button ──────────────────────────────
  nav: NavLink[];
  headerCta: string; //  estimate button label in the header

  // ── Hero ─────────────────────────────────────────────────────────────
  hero: {
    eyebrow: string;
    // The headline is split so one word can be highlighted in the accent
    // colour: `{lead} <accent>{accent}</accent> {trail}`.
    headlineLead: string;
    headlineAccent: string;
    headlineTrail: string;
    subhead: string;
    primaryCta: string; // label for the button that links to #contact
    trust: TrustItem[];
    image?: string; //    hero photo
  };

  // ── Services ─────────────────────────────────────────────────────────
  services: {
    eyebrow: string;
    headline: string;
    items: Service[];
  };

  // ── Gallery ──────────────────────────────────────────────────────────
  gallery: {
    eyebrow: string;
    headline: string;
    featured: Project;
    items: Project[];
  };

  // ── Reviews ──────────────────────────────────────────────────────────
  reviews: {
    eyebrow: string;
    headline: string;
    items: Review[];
    markers: string[]; // credibility markers row
  };

  // ── About ────────────────────────────────────────────────────────────
  about: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    stats: Stat[];
    image?: string; //    owner / team photo
  };

  // ── CTA band ─────────────────────────────────────────────────────────
  cta: {
    eyebrow: string;
    headline: string;
    supporting: string;
    primaryCta: string; // label for the button that links to #contact
  };

  // ── Contact ──────────────────────────────────────────────────────────
  contact: {
    eyebrow: string;
    headline: string;
    projectTypes: string[]; // options for the project-type select
    serviceArea: string;
    hours: string;
    submitCta: string; //     submit button label
  };

  // ── Footer ───────────────────────────────────────────────────────────
  footer: {
    tagline: string;
    quickLinks: NavLink[];
    towns: string[]; //         service-area towns column
    licenseNumber?: string; //  rendered as "License #<value>" — omit when N/A (e.g. Texas doesn't license home builders)
    socials: Social[];
    copyrightYear: number;
  };
}

export const client: Client = {
  // ── Business identity ────────────────────────────────────────────────
  name: "Texas Best Construction",
  legalName: "Texas Best Construction",
  phone: "(469) 552-8205",
  email: "office@texasbestbarndo.com",

  // ── Header ───────────────────────────────────────────────────────────
  nav: [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
  ],
  headerCta: "Free Quote",

  // ── Hero ─────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Shell & Turn-Key Barndominiums · North Texas",
    // "Your barndominium, built right." — accent word is "right". The period
    // lives in the accent field so it sits flush against the word.
    headlineLead: "Your barndominium, built",
    headlineAccent: "right.",
    headlineTrail: "",
    subhead:
      "Family-owned by Josh & Brandy Helm — building custom barndominiums, homes, and metal shops across North & Central Texas since 2006.",
    primaryCta: "Get a Free Quote",
    trust: [
      { strong: "Family-Owned", rest: "" },
      { strong: "20+", rest: "Yrs Experience" },
      { strong: "DFW", rest: "& North Texas" },
    ],
    // image: "/images/hero.jpg",
  },

  // ── Services ─────────────────────────────────────────────────────────
  services: {
    eyebrow: "What we do",
    headline: "From the ground up, or down to the studs.",
    items: [
      {
        title: "Turnkey Barndominiums",
        desc: "Full custom builds managed foundation to final finish, within ~60 miles of Red Oak.",
        // image: "/images/services/turnkey-barndominiums.jpg",
      },
      {
        title: "Shell Barndominiums",
        desc: "Weather-tight steel shells ready for you to finish out, built within ~100 miles of Red Oak.",
        // image: "/images/services/shell-barndominiums.jpg",
      },
      {
        title: "Custom Homes & Shops",
        desc: "Conventional custom homes, metal shops, and expert masonry, held to the same standard.",
        // image: "/images/services/custom-homes-shops.jpg",
      },
    ],
  },

  // ── Gallery ──────────────────────────────────────────────────────────
  gallery: {
    eyebrow: "Our work",
    headline: "Proof, not promises.",
    featured: {
      title: "Black Gold Barndominium",
      meta: "14,000 sq ft luxury build",
      // image: "/images/projects/black-gold.jpg",
    },
    items: [
      { title: "Waxahachie Barndominium", meta: "North Texas" },
      { title: "Sunshine Ranch Barndo", meta: "Custom build" },
      { title: "Weatherford Shell Barndo", meta: "Shell build" },
    ],
  },

  // ── Reviews ──────────────────────────────────────────────────────────
  // NOTE: real Google reviews — VERIFY exact wording, get the reviewers'
  // permission, and refresh these before launch.
  reviews: {
    eyebrow: "What clients say",
    headline: "Don't take our word for it.",
    items: [
      {
        quote:
          "We talked to three builders and chose Texas Best for energy efficiency — a tight envelope and engineered slab. A year in, our home is comfortable and very livable.",
        name: "Paul S.",
        detail: "Google Review",
      },
      {
        quote:
          "Completely satisfied with our home — wouldn't hesitate to use them again. A small, family company that gives personal attention, not a faceless corporation.",
        name: "Verified homeowner",
        detail: "Google Review",
      },
    ],
    markers: ["20+ Yrs Experience", "NewHomeSource Award Winner", "Insured", "DFW & North Texas"],
  },

  // ── About ────────────────────────────────────────────────────────────
  about: {
    eyebrow: "Who we are",
    headline: "Family-owned, building Texas barndominiums since 2015.",
    paragraphs: [
      "We're Josh and Brandy Helm. We've been in construction since 2006, and in 2015 we built our own barndominium — and fell in love with it. Today we're one of the most-followed barndominium builders in Texas.",
      "We build with integrity, real energy efficiency, and total transparency — we even document our builds start to finish on YouTube. From shell to turn-key, every barndo carries our name.",
    ],
    stats: [
      { num: "2006", label: "Building since" },
      { num: "100 mi", label: "Build radius" },
      { num: "88K+", label: "Followers" },
      { num: "Award", label: "NewHomeSource winner" },
    ],
    // image: "/images/owner.jpg",
  },

  // ── CTA band ─────────────────────────────────────────────────────────
  cta: {
    eyebrow: "Ready when you are",
    headline: "Let's build your barndominium.",
    supporting:
      "Free, no-pressure quotes across North & Central Texas — from shell to turn-key.",
    primaryCta: "Get a Free Quote →",
  },

  // ── Contact ──────────────────────────────────────────────────────────
  contact: {
    eyebrow: "Get in touch",
    headline: "Tell us about your project.",
    projectTypes: [
      "Turnkey Barndominium",
      "Shell Barndominium",
      "Custom Home",
      "Metal Shop",
      "Other",
    ],
    serviceArea: "DFW · North & Central Texas (within ~100 miles of Red Oak, TX)",
    hours: "Mon–Fri, 8am–5pm",
    submitCta: "Request a Free Quote →",
  },

  // ── Footer ───────────────────────────────────────────────────────────
  footer: {
    tagline:
      "Family-owned barndominiums, custom homes, and metal shops — built across North & Central Texas since 2006.",
    quickLinks: [
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "About", href: "#about" },
      { label: "Reviews", href: "#reviews" },
      { label: "Contact", href: "#contact" },
    ],
    towns: [
      "Red Oak",
      "Waxahachie",
      "Sherman",
      "Weatherford",
      "Terrell",
      "Rio Vista",
      "Whitney",
      "Wills Point",
    ],
    // No license number — Texas doesn't license home builders, so it's omitted.
    socials: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "TikTok", href: "#" },
    ],
    copyrightYear: 2026,
  },
};
