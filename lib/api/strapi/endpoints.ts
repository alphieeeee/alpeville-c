const strapiUrl =
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";

const apiPrefix = process.env.STRAPI_API_PREFIX ?? "/api";

type QueryParams = Record<string, string>;

function createStrapiUrl(path: string, queryParams: QueryParams = {}): string {
  const baseUrl = strapiUrl.replace(/\/+$/, "");
  const prefix = apiPrefix.replace(/^\/+|\/+$/g, "");
  const endpoint = path.replace(/^\/+/, "");
  const prefixPath = prefix ? `/${prefix}` : "";
  const url = new URL(`${baseUrl}${prefixPath}/${endpoint}`);

  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}

// Add future Strapi URLs here, such as projects, about, or experience.
export const strapiEndpoints = {
  health: createStrapiUrl("health"),
  // The hero is inside the Sections dynamic zone.
  homePage: createStrapiUrl("home-page", {
    "populate[Sections][on][blocks.hero][populate]": "ctas",
  }),
  works: createStrapiUrl("works", {
    populate: "hero,thumbnail",
  }),
  certifications: createStrapiUrl("certifications"),
  experiences: createStrapiUrl("experiences"),
  workBySlug: (slug: string) =>
    createStrapiUrl("works", {
      "filters[slug][$eq]": slug,
      populate: "hero,thumbnail",
    }),
};
