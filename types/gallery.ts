export type GalleryMode = "slider" | "grid";

export type GalleryItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  tags: string[];
  featured?: boolean;
};
