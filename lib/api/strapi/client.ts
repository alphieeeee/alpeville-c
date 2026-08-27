import type { ApiError } from "../types/common";

export class StrapiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "StrapiRequestError";
  }
}

export function createStrapiApiError(
  error: unknown,
  userMessage: string
): ApiError {
  const actualError = error instanceof Error ? error : new Error("Unknown error");
  const status = error instanceof StrapiRequestError ? error.status : 500;

  console.error("[Strapi] Request failed:", actualError);

  return {
    message: userMessage,
    status,
  };
}

export async function fetchStrapi(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);
  const apiToken = process.env.STRAPI_API_TOKEN;

  if (apiToken) {
    headers.set("Authorization", `Bearer ${apiToken}`);
  }

  return fetch(url, {
    ...options,
    headers,
    cache: options.cache ?? "no-store",
  });
}

export async function fetchStrapiJson<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetchStrapi(url, options);

  if (!response.ok) {
    const message = `Strapi request failed with status ${response.status}`;
    throw new StrapiRequestError(message, response.status);
  }

  return (await response.json()) as T;
}
