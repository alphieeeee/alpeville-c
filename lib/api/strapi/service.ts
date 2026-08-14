import { fetchStrapi } from "./client";
import { strapiEndpoints } from "./endpoints";
import type { StrapiHealthResponse } from "./types";

export async function checkStrapiHealth(): Promise<StrapiHealthResponse> {
  const url = strapiEndpoints.health;

  try {
    const response = await fetchStrapi(url);
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
    const message = error instanceof Error ? error.message : "Unknown error";

    return {
      ok: false,
      url,
      error: message,
      timestamp: new Date().toISOString(),
    };
  }
}
