import type { GalleryItem } from "@/types/gallery";

export function filterProjects(projects: GalleryItem[], query: string) {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return projects;

  return projects.filter((project) =>
    `${project.title} ${project.category} ${project.summary} ${project.tags.join(" ")}`
      .toLowerCase()
      .includes(normalizedQuery),
  );
}
