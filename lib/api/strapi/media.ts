const strapiUrl =
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";

/**
 * Converts a Strapi media path into a complete URL.
 *
 * Strapi may return either a relative path such as /uploads/image.png
 * or an absolute URL. This helper supports both formats.
 */
export function getStrapiMediaUrl(url?: string | null): string {
  if (!url) {
    return "";
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const baseUrl = strapiUrl.replace(/\/+$/, "");
  const mediaPath = url.replace(/^\/+/, "");

  return `${baseUrl}/${mediaPath}`;
}
