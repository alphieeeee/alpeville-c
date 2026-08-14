const strapiUrl =
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";

const apiPrefix = process.env.STRAPI_API_PREFIX ?? "/api";

function createStrapiUrl(path: string): string {
  const baseUrl = strapiUrl.replace(/\/+$/, "");
  const prefix = apiPrefix.replace(/^\/+|\/+$/g, "");
  const endpoint = path.replace(/^\/+/, "");
  const prefixPath = prefix ? `/${prefix}` : "";

  return `${baseUrl}${prefixPath}/${endpoint}`;
}

// Add future Strapi URLs here, such as projects, about, or experience.
export const strapiEndpoints = {
  health: createStrapiUrl("health"),
};
