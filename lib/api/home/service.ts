import {
  createStrapiApiError,
  fetchStrapiJson,
} from "../strapi/client";
import { strapiEndpoints } from "../strapi/endpoints";
import type { ApiResult } from "../types/common";
import type { HomeHeroCta, HomeHeroData } from "./types";

type StrapiHomeHero = {
  eyebrow: string;
  name: string;
  lead: string;
  ctas?: HomeHeroCta[];
};

type StrapiHomePage = {
  Sections?: StrapiHomeHero[];
  sections?: StrapiHomeHero[];
};

type StrapiHomeHeroResponse = {
  data: StrapiHomePage | { attributes: StrapiHomePage };
};

function getHomePageFields(response: StrapiHomeHeroResponse): StrapiHomePage {
  if ("attributes" in response.data) {
    return response.data.attributes;
  }

  return response.data;
}

// The hero is the blocks.hero entry inside the Sections dynamic zone.
function getHomeHeroFields(response: StrapiHomeHeroResponse): HomeHeroData {
  const homePage = getHomePageFields(response);
  const sections = homePage.Sections ?? homePage.sections ?? [];
  const homeHero = sections.find(
    (section) => section.eyebrow && section.name && section.lead
  );

  if (!homeHero) {
    throw new Error("Strapi did not return a hero section on the Home Page");
  }

  return {
    ...homeHero,
    ctas: homeHero.ctas ?? [],
  };
}

export async function getHomeHeroData(): Promise<ApiResult<HomeHeroData>> {
  try {
    const response = await fetchStrapiJson<StrapiHomeHeroResponse>(
      strapiEndpoints.homePage
    );

    return { data: getHomeHeroFields(response), error: null };
  } catch (error) {
    return {
      data: null,
      error: createStrapiApiError(
        error,
        "Home data is currently unavailable."
      ),
    };
  }
}
