import { fetchStrapiJson } from "../strapi/client";
import { strapiEndpoints } from "../strapi/endpoints";
import type { ExperienceItem } from "./types";

type StrapiExperience = {
  company?: string;
  period?: string;
  role?: string;
  description?: string;
};

type StrapiExperienceEntry =
  | StrapiExperience
  | { attributes: StrapiExperience };

type StrapiExperienceResponse = {
  data: StrapiExperienceEntry[];
};

function getExperienceFields(
  experience: StrapiExperienceEntry
): StrapiExperience {
  if ("attributes" in experience) {
    return experience.attributes;
  }

  return experience;
}

function mapExperience(
  experience: StrapiExperienceEntry
): ExperienceItem {
  const fields = getExperienceFields(experience);

  return {
    company: fields.company ?? "",
    period: fields.period ?? "",
    role: fields.role ?? "",
    description: fields.description ?? "",
  };
}

export async function getExperienceData(): Promise<ExperienceItem[]> {
  const response = await fetchStrapiJson<StrapiExperienceResponse>(
    strapiEndpoints.experiences
  );

  return response.data.map(mapExperience);
}
