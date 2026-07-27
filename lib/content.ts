import { projects } from "@/data/projects";
import type { GalleryItem } from "@/types/gallery";

// Replace these local accessors with Strapi fetchers later.
export async function getProjects(): Promise<GalleryItem[]> {
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<GalleryItem | undefined> {
  return projects.find((project) => project.slug === slug);
}
