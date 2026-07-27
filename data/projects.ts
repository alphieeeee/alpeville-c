import type { GalleryItem } from "@/types/gallery";

export const projects: GalleryItem[] = [
  {
    id: "1",
    slug: "signal-suite",
    title: "Signal Suite",
    category: "Analytics Platform",
    summary: "A conversion intelligence dashboard with sharp motion and dense insight.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["Dashboard", "Motion", "B2B"],
    featured: true,
  },
  {
    id: "2",
    slug: "midnight-stream",
    title: "Midnight Stream",
    category: "Streaming UX",
    summary: "A cinematic browsing interface inspired by modern entertainment platforms.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    tags: ["Entertainment", "UI", "Responsive"],
    featured: true,
  },
  {
    id: "3",
    slug: "framecraft",
    title: "FrameCraft",
    category: "Creative Portfolio",
    summary: "A portfolio system for creators who need clarity, speed, and visual depth.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    tags: ["Portfolio", "Brand", "Content"],
  },
  {
    id: "4",
    slug: "orbit-market",
    title: "Orbit Market",
    category: "Commerce Experience",
    summary: "A polished commerce concept focused on discovery and high-conversion flows.",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    tags: ["Ecommerce", "Design System", "UX"],
  },
  {
    id: "5",
    slug: "loom-labs",
    title: "Loom Labs",
    category: "Studio Website",
    summary: "A bold agency presence site with editorial typography and motion cues.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    tags: ["Agency", "Editorial", "Brand"],
  },
  {
    id: "6",
    slug: "vector-ops",
    title: "Vector Ops",
    category: "Operations Tool",
    summary: "A streamlined internal product that balances usability with serious throughput.",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
    tags: ["Ops", "Productivity", "SaaS"],
  },
  {
    id: "7",
    slug: "nova-hub",
    title: "Nova Hub",
    category: "Product Launch",
    summary: "A launch-ready experience designed for conversion, clarity, and speed.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Launch", "Growth", "UX"],
  },
  {
    id: "8",
    slug: "ember-studio",
    title: "Ember Studio",
    category: "Creative Agency",
    summary: "An art-direction driven site with editorial rhythm and confident spacing.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    tags: ["Agency", "Creative", "Motion"],
  },
  {
    id: "9",
    slug: "pulse-care",
    title: "Pulse Care",
    category: "Healthcare UI",
    summary: "A calm, trust-focused interface concept for a modern health product.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    tags: ["Health", "Trust", "Accessibility"],
  },
  {
    id: "10",
    slug: "lumen-ops",
    title: "Lumen Ops",
    category: "Admin Dashboard",
    summary: "A dense operations dashboard with crisp hierarchy and control surfaces.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    tags: ["Admin", "Systems", "Data"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
