// All editable site copy lives here (INSTRUCTIONS.md §2, "maintenance principle").
// To update the site's text, edit this file — no component changes needed.
//
// Blocks marked [TODO: ...] are structural placeholders per DESIGN.md §9
// ("All copy in this file is PLACEHOLDER unless marked final").

export const landing = {
  lede: "I turn ambiguous business problems into actionable data-driven decisions",
  body: "UCLA MSBA Candidate | Analyst | Builder",
};

export interface CaseStudyLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  eyebrow: string;
  title: string;
  summary: string;
  links?: CaseStudyLink[];
}

export const caseStudies: CaseStudy[] = [
  {
    eyebrow: "Strategy · Analytics",
    title: "Copart Strategy Analytics Internship",
    summary: "Currently working on Search Optimization for Copart's Product Search Functionality.",
  },
  {
    eyebrow: "Strategy · Growth Analytics ",
    title: "University Credit Union - Market Expansion Strategy",
    summary: "Developed strategic prioritization framework across 14 university partner segments; synthesized market potential (428K+ addressable audience) vs. current penetration (13.2%) to pinpoint high-ROI expansion targets and direct go-to-market resource allocation.",
    links: [
      { label: "Read more →", href: "https://piedy-pranav.github.io/ucu-growth-dashboard" },
    ],
  },
  {
    eyebrow: "Agentic AI · Consulting",
    title: "Multi-agent AI systems (PwC / Grant Thornton)",
    summary: "Prototyped a multi-agent AI solutions (LangGraph) for invoice reconciliation, cutting turnaround 60% and unlocking $600K in projected annual savings.",
  },
  {
    eyebrow: "Data Science · Causal Inference",
    title: "Geospatial Causal Inference of NYC's Surge Pricing and Subway Ridership",
    summary: "Evaluated a $1.50 congestion surcharge using causal inference. Found 15-17% ride-hail reduction and identified mobility deserts, informing equity-focused policy recommendations. Analyzed 34M+ rows of ride-hail, transit, and weather data.",
    links: [
      { label: "Read more →", href: "https://github.com/piedy-pranav/NYC-Congestion-Pricing" },
      { label: "Slides →", href: "https://docs.google.com/presentation/d/1DBoVfQUKZJiSBeofw6PtxsraPdW2FGywH1IyuNniWx8/edit?usp=sharing" },
    ],
  },
  {
    eyebrow: "Data Science · Case Analysis",
    title: "Case Analysis (MSBA)",
    summary: "Analyzed real-world business cases to derive actionable insights and strategic recommendations for VP-level stakeholders.",
    links: [
      { label: "Read more →", href: "https://github.com/piedy-pranav/Case-Analysis-MSBA" },
    ],
  }
];

export const skills = [
  "Python",
  "SQL",
  "Spark",
  "Snowflake",
  "GCP",
  "Tableau",
  "Agentic AI (LangGraph, LangChain, RAGs)"
];

export const beyondIntro =
  "Still water, until you move through it. Everything here makes waves when touched.";

export const beyondInterests = [
  "Football",
  "Tabla",
  "Guitar",
  "Formula 1",
  "Gym",
  "Camping",
  "Hiking",
  "Taekwondo",
  "Cooking",
  "Philosophy",
  "Coffee",
];

export const beyondConcept = {
  line: "The ocean stays the same. What lands in it keeps changing.",
  credit: "Inspired by the Pink Floyd Album, Meddle (1971)",
};

export const social = {
  email: "pranavpiedy@gmail.com",
  linkedin: "https://www.linkedin.com/in/pranavpiedy/",
  github: "https://github.com/piedy-pranav",
};

export const aboutInfo = {
  intro: "Would love to hear from you! Reach out via email or LinkedIn!",
  bio: "Hungry, curious, and always eager to learn. Fascinated by interesting data problems, Pink Floyd (this website is a tribute) and bright sunny days (as you can see).",
  photo: "/website-photo.jpg",
  ...social,
};

export const footerInfo = {
  name: "Pranav Piedy",
  ...social,
};
