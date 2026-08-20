import type { HomeHeroData } from "./types";

const heroData: HomeHeroData = {
  eyebrow: "Hi I'm",
  name: "Alpeville Carinan",
  lead: "I bring designs to life through code and motion.",
  ctas: [
    { href: "#work", label: "View Project" },
    { href: "/cv", label: "My CV", variant: "secondary" },
    { href: "mailto:hello@alpeville.com", label: "Email Me", variant: "secondary" },
  ],
};

export default heroData;