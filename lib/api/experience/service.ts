import { createStrapiApiError, fetchStrapiJson } from "../strapi/client";
import { strapiEndpoints } from "../strapi/endpoints";
import type { ApiResult } from "../types/common";
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

export async function getExperienceData(): Promise<ApiResult<ExperienceItem[]>> {
  try {
    const response = await fetchStrapiJson<StrapiExperienceResponse>(
      strapiEndpoints.experiences
    );

    return { data: response.data.map(mapExperience), error: null };
  } catch (error) {
    return {
      data: null,
      error: createStrapiApiError(
        error,
        "Experience data is currently unavailable."
      ),
    };
  }
}
