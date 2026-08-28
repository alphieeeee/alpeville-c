import { describe, expect, it } from "vitest";
import { getStrapiMediaUrl } from "@/lib/api/strapi/media";

describe("getStrapiMediaUrl", () => {
  it("turns a relative Strapi path into an absolute URL", () => {
    expect(getStrapiMediaUrl("/uploads/portrait.png")).toBe(
      "http://localhost:1337/uploads/portrait.png"
    );
  });

  it("keeps an absolute URL unchanged", () => {
    expect(getStrapiMediaUrl("https://cdn.example.com/portrait.png")).toBe(
      "https://cdn.example.com/portrait.png"
    );
  });

  it("returns an empty string when no media URL exists", () => {
    expect(getStrapiMediaUrl()).toBe("");
    expect(getStrapiMediaUrl(null)).toBe("");
  });
});
