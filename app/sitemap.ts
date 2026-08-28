import type { MetadataRoute } from "next";
import { getWorkData } from "../lib/api/work/service";

export const revalidate = 900;

function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/+$/, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const workResult = await getWorkData();
  const workEntries = workResult.data ?? [];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/cv`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const workPages: MetadataRoute.Sitemap = workEntries.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...workPages];
}
