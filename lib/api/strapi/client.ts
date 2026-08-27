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

type StrapiCacheOptions = {
  revalidate?: number;
  tags?: string[];
};

export type StrapiRequestOptions = RequestInit & {
  next?: StrapiCacheOptions;
};

function getRevalidateSeconds(): number {
  const configuredValue = Number(process.env.STRAPI_REVALIDATE_SECONDS);

  return Number.isFinite(configuredValue) && configuredValue > 0
    ? configuredValue
    : 900;
}

export async function fetchStrapi(
  url: string,
  options: StrapiRequestOptions = {}
): Promise<Response> {
  const headers = new Headers(options.headers);
  const apiToken = process.env.STRAPI_API_TOKEN;

  if (apiToken) {
    headers.set("Authorization", `Bearer ${apiToken}`);
  }

  const shouldCache = options.cache !== "no-store";
  const cacheOptions = shouldCache
    ? {
        cache: options.cache ?? "force-cache",
        next: {
          revalidate: options.next?.revalidate ?? getRevalidateSeconds(),
          ...(options.next?.tags ? { tags: options.next.tags } : {}),
        },
      }
    : {};

  return fetch(url, {
    ...options,
    headers,
    ...cacheOptions,
  });
}

export async function fetchStrapiJson<T>(
  url: string,
  options?: StrapiRequestOptions
): Promise<T> {
  const response = await fetchStrapi(url, options);

  if (!response.ok) {
    const message = `Strapi request failed with status ${response.status}`;
    throw new StrapiRequestError(message, response.status);
  }

  return (await response.json()) as T;
}
