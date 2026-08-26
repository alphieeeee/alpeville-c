import type { WorkCard } from "./types";
import workData from "./mock";

export function getWorkData(): WorkCard[] {
  return workData;
}

export function getWorkBySlug(slug: string): WorkCard | undefined {
  return workData.find((project) => project.slug === slug);
}
