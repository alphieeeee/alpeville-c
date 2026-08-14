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
    throw new Error(message);
  }

  return (await response.json()) as T;
}
