export type Category = "All" | "Trending" | "Movies" | "Series" | "New" | "Top Rated";

export type GalleryItem = {
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
  year: string;
  runtime: string;
  rating: string;
  accent: string;
  description: string;
  tagline: string;
};

export const FILTERS: Category[] = [
  "All",
  "Trending",
  "Movies",
  "Series",
  "New",
  "Top Rated",
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    slug: "midnight-circuit",
    title: "Midnight Circuit",
    category: "Trending",
    year: "2026",
    runtime: "2 Seasons",
    rating: "9.4",
    accent: "from-rose-500 via-red-500 to-orange-400",
    description:
      "Cyber-noir drama with sharp visuals, fast pacing, and a high-stakes story set in a neon city.",
    tagline: "Trending worldwide, binge-ready, and built for late-night viewing.",
  },
  {
    slug: "neon-harbor",
    title: "Neon Harbor",
    category: "Movies",
    year: "2025",
    runtime: "148 min",
    rating: "8.7",
    accent: "from-cyan-500 via-blue-500 to-sky-700",
    description:
      "A widescreen sci-fi feature about a hidden port, an exiled captain, and a city that never sleeps.",
    tagline: "A cinematic feature with big scope and a moody visual palette.",
  },
  {
    slug: "black-signal",
    title: "Black Signal",
    category: "Series",
    year: "2026",
    runtime: "5 Episodes",
    rating: "9.1",
    accent: "from-violet-500 via-fuchsia-500 to-pink-500",
    description:
      "A suspense series built around an encrypted broadcast that starts changing the world in real time.",
    tagline: "Short season, heavy atmosphere, and a sharp mystery hook.",
  },
  {
    slug: "first-light",
    title: "First Light",
    category: "New",
    year: "2026",
    runtime: "1h 52m",
    rating: "8.2",
    accent: "from-amber-400 via-orange-500 to-rose-500",
    description:
      "An emotional coming-of-age story that follows a city runner chasing one unforgettable sunrise.",
    tagline: "Fresh release with a warm glow and an emotional payoff.",
  },
  {
    slug: "vault-29",
    title: "Vault 29",
    category: "Top Rated",
    year: "2024",
    runtime: "3 Seasons",
    rating: "9.8",
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
    description:
      "An elite heist saga inside a buried archive where every room protects a different secret.",
    tagline: "Top rated for its pace, production design, and layered worldbuilding.",
  },
  {
    slug: "afterglow",
    title: "Afterglow",
    category: "Trending",
    year: "2026",
    runtime: "10 Episodes",
    rating: "9.0",
    accent: "from-indigo-500 via-purple-500 to-fuchsia-600",
    description:
      "A stylish ensemble drama about fame, fallout, and the lives left behind after the spotlight fades.",
    tagline: "Trending now with a bold color story and a dramatic edge.",
  },
];

export function getGalleryItemBySlug(slug: string) {
  return GALLERY_ITEMS.find((item) => item.slug === slug);
}
