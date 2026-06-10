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

/** A header nav item. `external` links open in a new tab with a ↗ indicator. */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/** The full header navigation model. The Header reads entirely from this —
 *  primary links sit on the bar, the resources group folds into a dropdown,
 *  and the same data drives the mobile hamburger panel. */
export interface SiteNav {
  primary: NavItem[]; //        always-visible internal links
  resourcesLabel: string; //    label for the Resources dropdown / mobile section
  resources: NavItem[]; //      grouped secondary + external links
  cta: NavItem; //              prominent "Get a Quote" button
  phone: NavItem; //            click-to-call (label + tel: href)
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

/** The build category a project falls under — drives the /projects filter bar. */
export type ProjectType = "Turnkey" | "Shell" | "Custom Home" | "Shop";

/** A full project record for the /projects gallery. All image fields are slots
 *  (undefined -> styled placeholder, matching the existing image-slot pattern).
 *  Specs are optional so a card renders cleanly with whatever data exists. */
export interface ProjectEntry {
  slug: string; //        stable id, used for filtering + the detail modal
  name: string; //        display name (usually the town/site)
  type: ProjectType;
  location: string;
  sqft?: number;
  beds?: number;
  baths?: number;
  year?: number;
  blurb?: string; //      short description shown in the detail view
  image?: string; //      hero image slot
  gallery?: string[]; //  extra image slots, shown as a strip in the detail view
  youtube?: string; //    full tour URL (watch/share/embed) — embedded if present
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

/** One FAQ entry — rendered as an accordion item on /faq. */
export interface FaqItem {
  question: string;
  answer: string;
}

/** One step in the /get-started process timeline. `href`/`cta` add an optional
 *  inline link (e.g. step 1 → the quote flow). */
export interface ProcessStep {
  title: string;
  description: string;
  href?: string;
  cta?: string;
}

/** A way to build — shell vs. turnkey — with its service radius. */
export interface BuildOption {
  name: string;
  description: string;
  radius: string;
}

/** The /get-started "how it works" config. */
export interface GetStarted {
  steps: ProcessStep[];
  buildOptions: BuildOption[];
}

/** Compact service-area callout — lets visitors self-qualify instantly.
 *  Single source for the slim band shown under the hero and on /quote. */
export interface ServiceArea {
  turnkey: string; // turnkey radius line
  shell: string; //   shell radius line
  area: string; //    region served
}

/** One selectable build type in the cost calculator. `finish: true` means the
 *  finish-level multipliers apply (Turnkey only). */
export interface CalcBuildType {
  id: string; //          "shell" | "turnkey" | "shop"
  label: string;
  lowPerSqft: number;
  highPerSqft: number;
  finish?: boolean;
}

/** A finish tier that scales a Turnkey estimate. */
export interface CalcFinishLevel {
  id: string;
  label: string;
  multiplier: number;
}

/** The cost-calculator config. The component reads everything from here — no
 *  rates are hardcoded in the markup. */
export interface Calculator {
  eyebrow: string;
  headline: string;
  buildTypes: CalcBuildType[];
  finishLevels: CalcFinishLevel[];
  sqft: { min: number; max: number; default: number; step: number };
  roundTo: number; //     final low/high rounded to the nearest this many dollars
  disclaimer: string;
  cta: string; //         label for the "scroll to the quote form" button
}

export interface Client {
  // ── Business identity ────────────────────────────────────────────────
  name: string; //       wordmark / display name (e.g. "Ridgeline")
  legalName: string; //  full legal name, used in the copyright line
  phone: string; //      shown in header, hero, CTA band, contact, footer
  email: string; //      shown in contact + footer

  // ── Header navigation ────────────────────────────────────────────────
  nav: SiteNav;

  // ── Hero ─────────────────────────────────────────────────────────────
  hero: {
    eyebrow: string;
    // The headline is split so one word can be highlighted in the accent
    // colour: `{lead} <accent>{accent}</accent> {trail}`.
    headlineLead: string;
    headlineAccent: string;
    headlineTrail: string;
    subhead: string;
    primaryCta: string; // label for the button that links to /quote
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

  // ── Projects (full /projects gallery) ────────────────────────────────
  projects: ProjectEntry[];

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
    primaryCta: string; // label for the button that links to /quote
  };

  // ── Contact ──────────────────────────────────────────────────────────
  contact: {
    eyebrow: string;
    headline: string;
    projectTypes: string[]; //      options for the homepage contact select
    quoteProjectTypes: string[]; // options for the /quote request select
    serviceArea: string;
    hours: string;
    submitCta: string; //           submit button label
    web3formsAccessKey: string; //  Web3Forms endpoint key — see data below
  };

  // ── Cost calculator (/quote) ─────────────────────────────────────────
  calculator: Calculator;

  // ── FAQ (/faq) ───────────────────────────────────────────────────────
  faq: FaqItem[];

  // ── Get Started (/get-started) ───────────────────────────────────────
  getStarted: GetStarted;

  // ── Service-area callout (homepage band + /quote) ────────────────────
  serviceArea: ServiceArea;

  // ── Footer ───────────────────────────────────────────────────────────
  footer: {
    tagline: string;
    quickLinks: NavLink[];
    clientLinks: NavItem[]; //  "For clients" group (portal, gear) — external open in new tab
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

  // ── Header navigation ────────────────────────────────────────────────
  nav: {
    primary: [
      { label: "Home", href: "/" },
      { label: "Project Gallery", href: "/projects" },
      { label: "Barndo Plans", href: "https://bestbarndoplans.com/collections/barndo-plans", external: true },
      { label: "FAQ", href: "/faq" },
    ],
    resourcesLabel: "More",
    // Secondary items — kept out of prime nav. The homepage is now the guided
    // funnel, so Get Started lives here. Client Portal + Barndo Gear are in the
    // footer "For clients" group (footer.clientLinks below).
    resources: [
      { label: "Barndo Buzz", href: "/buzz" },
      { label: "YouTube", href: "https://www.youtube.com/@TexasBestBarndominium", external: true },
      { label: "Get Started", href: "/get-started" },
    ],
    cta: { label: "Get a Quote", href: "/quote" },
    phone: { label: "(469) 552-8205", href: "tel:4695528205" },
  },

  // ── Hero ─────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Steel Barndominiums & Custom Homes · DFW & North Texas",
    // Accent phrase carries the "Built Better by Design" energy; the period
    // lives in the accent field so it sits flush against the phrase.
    headlineLead: "Steel barndominiums,",
    headlineAccent: "built better by design.",
    headlineTrail: "",
    subhead:
      "Family-owned by Josh & Brandy Helm, building across the DFW area since 2006. We pair steel strength with proven wood framing — for homes that are tougher, run more efficient, and are built around your land, your life, and your vision.",
    primaryCta: "Get a Quote",
    trust: [
      { strong: "Family-owned", rest: "& operated" },
      { strong: "Since 2006", rest: "in DFW" },
      { strong: "Steel + wood", rest: "hybrid build" },
    ],
    // image: "/images/hero.jpg",
  },

  // ── Services ─────────────────────────────────────────────────────────
  services: {
    eyebrow: "What we build",
    headline: "From shell to turn-key, built better.",
    items: [
      {
        title: "Turnkey Barndominiums",
        desc: "A move-in-ready barndo handled start to finish — design, build, and final finishes. Turn-key within ~60 miles of Red Oak.",
        // image: "/images/services/turnkey-barndominiums.jpg",
      },
      {
        title: "Shell Barndominiums",
        desc: "A weather-tight steel-and-wood shell, ready for you to finish your way. Built within ~100 miles of Red Oak.",
        // image: "/images/services/shell-barndominiums.jpg",
      },
      {
        title: "Custom Homes",
        desc: "Traditional custom homes held to the same standard — efficient, durable, and tailored to how you live.",
        // image: "/images/services/custom-homes.jpg",
      },
      {
        title: "Metal Shops",
        desc: "Workshops, barns, and storage built tough for Texas — practical steel buildings done right.",
        // image: "/images/services/metal-shops.jpg",
      },
      {
        title: "Masonry",
        desc: "Expert stone and brickwork that adds lasting character and curb appeal to any build.",
        // image: "/images/services/masonry.jpg",
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

  // ── Projects (full /projects gallery) ────────────────────────────────
  // PLACEHOLDER — replace with real data + photos from Texas Best.
  // These are real project/town names used as examples; every spec, blurb, and
  // image below is a placeholder. The full ~60-project list, real photos, and
  // tour URLs get added later. Image fields are intentionally left as slots
  // (undefined) so the styled placeholders keep rendering until photos arrive.
  // Custom Home & Shop builds get tagged as the full list lands.
  projects: [
    {
      slug: "alvarado",
      name: "Alvarado",
      type: "Turnkey",
      location: "Alvarado, TX",
      sqft: 3200, // PLACEHOLDER
      beds: 4, //   PLACEHOLDER
      baths: 3, //  PLACEHOLDER
      year: 2024, // PLACEHOLDER
      blurb: "PLACEHOLDER — replace with the real project story from Texas Best.",
      // image: "/images/projects/alvarado.jpg",
      // gallery: ["/images/projects/alvarado-2.jpg", "/images/projects/alvarado-3.jpg"],
      // youtube: "https://www.youtube.com/watch?v=PLACEHOLDER",
    },
    {
      slug: "callisburg",
      name: "Callisburg",
      type: "Shell",
      location: "Callisburg, TX",
      sqft: 2800, // PLACEHOLDER
      year: 2023, // PLACEHOLDER
      blurb: "PLACEHOLDER — weather-tight shell build; replace with real details.",
      // image: "/images/projects/callisburg.jpg",
    },
    {
      slug: "cleburne",
      name: "Cleburne",
      type: "Turnkey",
      location: "Cleburne, TX",
      sqft: 3600, // PLACEHOLDER
      beds: 4, //   PLACEHOLDER
      baths: 3, //  PLACEHOLDER
      year: 2024, // PLACEHOLDER
      blurb: "PLACEHOLDER — replace with the real project story from Texas Best.",
      // image: "/images/projects/cleburne.jpg",
    },
    {
      slug: "corsicana",
      name: "Corsicana",
      type: "Turnkey",
      location: "Corsicana, TX",
      sqft: 2950, // PLACEHOLDER
      beds: 3, //   PLACEHOLDER
      baths: 2, //  PLACEHOLDER
      year: 2023, // PLACEHOLDER
      blurb: "PLACEHOLDER — replace with the real project story from Texas Best.",
      // image: "/images/projects/corsicana.jpg",
    },
    {
      slug: "glen-rose",
      name: "Glen Rose",
      type: "Turnkey",
      location: "Glen Rose, TX",
      sqft: 4100, // PLACEHOLDER
      beds: 4, //   PLACEHOLDER
      baths: 3, //  PLACEHOLDER
      year: 2025, // PLACEHOLDER
      blurb: "PLACEHOLDER — replace with the real project story from Texas Best.",
      // image: "/images/projects/glen-rose.jpg",
    },
    {
      slug: "hillsboro",
      name: "Hillsboro",
      type: "Shell",
      location: "Hillsboro, TX",
      sqft: 3000, // PLACEHOLDER
      year: 2024, // PLACEHOLDER
      blurb: "PLACEHOLDER — weather-tight shell build; replace with real details.",
      // image: "/images/projects/hillsboro.jpg",
    },
    {
      slug: "joshua",
      name: "Joshua",
      type: "Turnkey",
      location: "Joshua, TX",
      sqft: 3400, // PLACEHOLDER
      beds: 4, //   PLACEHOLDER
      baths: 2, //  PLACEHOLDER
      year: 2024, // PLACEHOLDER
      blurb: "PLACEHOLDER — replace with the real project story from Texas Best.",
      // image: "/images/projects/joshua.jpg",
    },
    {
      slug: "mansfield",
      name: "Mansfield",
      type: "Turnkey",
      location: "Mansfield, TX",
      sqft: 3800, // PLACEHOLDER
      beds: 5, //   PLACEHOLDER
      baths: 4, //  PLACEHOLDER
      year: 2025, // PLACEHOLDER
      blurb: "PLACEHOLDER — replace with the real project story from Texas Best.",
      // image: "/images/projects/mansfield.jpg",
    },
    {
      slug: "red-oak",
      name: "Red Oak",
      type: "Turnkey",
      location: "Red Oak, TX",
      sqft: 3300, // PLACEHOLDER
      beds: 4, //   PLACEHOLDER
      baths: 3, //  PLACEHOLDER
      year: 2023, // PLACEHOLDER
      blurb: "PLACEHOLDER — replace with the real project story from Texas Best.",
      // image: "/images/projects/red-oak.jpg",
    },
    {
      slug: "sunshine-ranch",
      name: "Sunshine Ranch",
      type: "Turnkey",
      location: "North Texas",
      sqft: 5200, // PLACEHOLDER
      beds: 5, //   PLACEHOLDER
      baths: 4, //  PLACEHOLDER
      year: 2024, // PLACEHOLDER
      blurb: "PLACEHOLDER — custom ranch barndo; replace with the real story.",
      // image: "/images/projects/sunshine-ranch.jpg",
    },
    {
      slug: "waxahachie",
      name: "Waxahachie",
      type: "Turnkey",
      location: "Waxahachie, TX",
      sqft: 3500, // PLACEHOLDER
      beds: 4, //   PLACEHOLDER
      baths: 3, //  PLACEHOLDER
      year: 2024, // PLACEHOLDER
      blurb: "PLACEHOLDER — replace with the real project story from Texas Best.",
      // image: "/images/projects/waxahachie.jpg",
    },
    {
      slug: "weatherford-shell",
      name: "Weatherford Shell",
      type: "Shell",
      location: "Weatherford, TX",
      sqft: 3100, // PLACEHOLDER
      year: 2023, // PLACEHOLDER
      blurb: "PLACEHOLDER — weather-tight steel shell, ready for finish-out.",
      // image: "/images/projects/weatherford-shell.jpg",
    },
  ],

  // ── Cost calculator (/quote) ─────────────────────────────────────────
  // PLACEHOLDER RATES — industry ballpark $/sq ft, NOT Texas Best's numbers.
  // Replace lowPerSqft/highPerSqft and the finish multipliers with real Texas
  // Best pricing before launch. The estimate is intentionally a rough range.
  calculator: {
    eyebrow: "Ballpark calculator",
    headline: "Estimate your build.",
    buildTypes: [
      { id: "shell", label: "Shell", lowPerSqft: 30, highPerSqft: 55 },
      { id: "turnkey", label: "Turnkey", lowPerSqft: 120, highPerSqft: 185, finish: true },
      { id: "shop", label: "Shop", lowPerSqft: 20, highPerSqft: 40 },
    ],
    // Finish levels scale Turnkey only.
    finishLevels: [
      { id: "standard", label: "Standard", multiplier: 1.0 },
      { id: "premium", label: "Premium", multiplier: 1.2 },
      { id: "luxury", label: "Luxury", multiplier: 1.45 },
    ],
    sqft: { min: 1200, max: 6000, default: 2400, step: 100 },
    roundTo: 1000,
    disclaimer:
      "Rough ballpark only — not a quote. Final pricing depends on site, design, and finish selections. Send it below for an exact quote.",
    cta: "Get your exact quote",
  },

  // ── FAQ (/faq) ───────────────────────────────────────────────────────
  // Seeded from Texas Best's real FAQ — VERIFY exact wording with the client
  // and expand with more questions (financing, timelines, service area, etc.).
  faq: [
    {
      question: "What can slow down a barndominium build timeline?",
      answer:
        "The biggest factors are site prep, permitting, and weather. Planning for them ahead of time keeps things moving and avoids delays.",
    },
    {
      question: "Do barndominiums need special maintenance?",
      answer:
        "They generally need less upkeep than a traditional home — metal exteriors hold up well and resist wear over time.",
    },
    {
      question: "Can I make changes during the build?",
      answer:
        "Some adjustments are doable, but locking in the big decisions early keeps your project on schedule and budget.",
    },
    {
      question: "Is insulation different in a steel barndominium?",
      answer:
        "Yes — good insulation is critical. Spray foam is commonly used to maximize energy efficiency and keep the interior comfortable through Texas heat.",
    },
    {
      question: "What makes Texas Best Construction different?",
      answer:
        "Barndominiums are our core focus, not a side project, so we understand what trips up metal builds — moisture control, insulation, long-term durability. Our hybrid approach pairs steel strength with proven wood framing to give you an efficient, comfortable home built to last in the Texas climate.",
    },
  ],

  // ── Get Started (/get-started) ───────────────────────────────────────
  // Based on Texas Best's real process — VERIFY the steps and service radii
  // with the client before launch.
  getStarted: {
    steps: [
      {
        title: "Get your estimate",
        description:
          "Use the calculator for a ballpark, then send it over for an exact quote.",
        href: "/quote",
        cta: "Start with a quote",
      },
      {
        title: "Design & planning",
        description:
          "We tailor floor plans, layout, and finishes to your land and how you live.",
      },
      {
        title: "On-site walkthrough",
        description:
          "Once designs are finalized, we meet on your land to make sure every detail fits your vision.",
      },
      {
        title: "We build, and you see it happen",
        description:
          "Clear updates at every phase, plus we film the journey on YouTube. Fewer surprises, better decisions.",
      },
      {
        title: "Move in",
        description:
          "Turnkey-finished and ready, or a solid weather-tight shell for you to finish your way.",
      },
    ],
    buildOptions: [
      {
        name: "Shell-only",
        description:
          "The sturdy steel-and-wood-framed base, weather-tight and ready for you to finish inside.",
        radius: "Available within ~100 miles of Red Oak",
      },
      {
        name: "Turnkey",
        description:
          "A fully finished, move-in-ready barndominium; we handle everything from design to final finishes.",
        radius: "Available within ~60 miles of Red Oak",
      },
    ],
  },

  // ── Service-area callout (homepage band + /quote) ────────────────────
  serviceArea: {
    turnkey: "Turnkey within ~60 miles of Red Oak",
    shell: "Shell within ~100 miles",
    area: "Serving DFW, North & Central Texas",
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
    // Value pillars (no unverifiable awards/figures — keep it integrity-first).
    markers: ["Built for Texas weather", "Energy efficient", "Low maintenance", "Every build on YouTube"],
  },

  // ── About ────────────────────────────────────────────────────────────
  about: {
    eyebrow: "Who we are",
    headline: "Family-run, and proud of every build.",
    paragraphs: [
      "We're Josh and Brandy Helm. We've been building across the DFW area since 2006, and in 2015 we built our own barndominium — fell in love with it, and made barndos our focus ever since.",
      "Our hybrid method pairs steel strength with proven wood framing, so your home stands up to Texas weather, runs efficient, and needs less upkeep. And because we film every build and share the journey on YouTube, you get to watch it come together — fewer surprises, more collaboration, and a home that's never a template. Just yours.",
    ],
    stats: [
      { num: "2006", label: "Building since" },
      { num: "2015", label: "Barndo specialists since" },
      { num: "100 mi", label: "Build radius" },
      { num: "Family", label: "Owned & operated" },
    ],
    // image: "/images/owner.jpg",
  },

  // ── CTA band ─────────────────────────────────────────────────────────
  cta: {
    eyebrow: "Ready when you are",
    headline: "Let's build yours.",
    supporting:
      "Free, no-pressure quotes across the DFW area and North & Central Texas — shell to turn-key, steel done right.",
    primaryCta: "Get a Quote →",
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
    // Options for the /quote request form (mirrors the calculator's build types).
    quoteProjectTypes: ["Shell", "Turnkey", "Custom Home", "Shop", "Not sure"],
    serviceArea: "DFW · North & Central Texas (within ~100 miles of Red Oak, TX)",
    hours: "Mon–Fri, 8am–5pm",
    submitCta: "Request a Free Quote →",
    // PLACEHOLDER — paste the real Access Key from web3forms.com (create it
    // against the client's inbox, office@texasbestbarndo.com, before launch).
    web3formsAccessKey: "YOUR-WEB3FORMS-ACCESS-KEY",
  },

  // ── Footer ───────────────────────────────────────────────────────────
  footer: {
    tagline:
      "Family-owned steel barndominiums and custom homes, built better across the DFW area since 2006.",
    quickLinks: [
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "About", href: "#about" },
      { label: "Reviews", href: "#reviews" },
      { label: "Get a Quote", href: "/quote" },
    ],
    // "For clients" group — moved out of the top nav so prime nav stays focused
    // on new visitors. PLACEHOLDER — confirm the exact Client Portal URL.
    clientLinks: [
      { label: "Client Portal", href: "https://buildertrend.net/", external: true },
      { label: "Barndo Gear", href: "https://bestbarndoplans.com/collections/barndo-gear", external: true },
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
