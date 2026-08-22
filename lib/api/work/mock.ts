import type { WorkCard } from "./types";

const workData: WorkCard[] = [
  {
    title: "Horizon Commerce",
    type: "Marketing Site",
    summary: "A motion-led commerce landing page with reusable CMS blocks, animated transitions and conversion-focused storytelling.",
    tools: ["Next.js", "GSAP", "Strapi", "Tailwind CSS"],
    layout: "col-span-12 lg:col-span-7",
  },
  {
    title: "Signal Studio",
    type: "Creative Portfolio",
    summary: "A gallery-first portfolio concept combining modular content sections, dynamic cards and playful interaction patterns.",
    tools: ["React", "Tailwind CSS", "Component Architecture"],
    layout: "col-span-12 lg:col-span-5",
  },
  {
    title: "Atlas Insights",
    type: "Dashboard",
    summary: "A data-dense interface mockup with flexible grid placement, reusable chart panels and content placeholders for later API wiring.",
    tools: ["Next.js", "REST APIs", "Data Visualization"],
    layout: "col-span-12 md:col-span-6",
  },
  {
    title: "Flux Campaign Builder",
    type: "Rich Media",
    summary: "A responsive creative system for ad-style experiences that balance fast load times with motion and visual impact.",
    tools: ["GSAP", "HTML5", "Responsive Creative"],
    layout: "col-span-12 md:col-span-6",
  },
];

export default workData;

