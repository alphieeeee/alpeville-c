import type { NextConfig } from "next";

const strapiUrl =
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";

const strapiMediaPattern = new URL(
  `${strapiUrl.replace(/\/+$/, "")}/uploads/**`
);

const nextConfig: NextConfig = {
  images: {
    // Next's optimizer cannot fetch localhost because it resolves to a private IP.
    // Local browsers can load the Strapi image directly during development.
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [strapiMediaPattern],
  },
};

export default nextConfig;
