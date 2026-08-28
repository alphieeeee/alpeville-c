import type { MetadataRoute } from "next";

function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/+$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/health"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
