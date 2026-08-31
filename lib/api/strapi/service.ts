import { createStrapiApiError, fetchStrapi } from "./client";
import { strapiEndpoints } from "./endpoints";
import type { StrapiHealthResponse } from "./types";

export async function checkStrapiHealth(): Promise<StrapiHealthResponse> {
  const url = strapiEndpoints.health;

  try {
    const response = await fetchStrapi(url, {
      next: { revalidate: 60, tags: ["strapi:health"] },
    });
    const payload = await response.text();

    return {
      ok: response.ok,
      url,
      status: response.status,
      statusText: response.statusText,
      payload,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const apiError = createStrapiApiError(
      error,
      "Strapi health check is currently unavailable."
    );

    return {
      ok: false,
      url,
      error: apiError.message,
      timestamp: new Date().toISOString(),
    };
  }
}
