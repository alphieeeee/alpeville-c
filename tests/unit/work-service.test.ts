import { beforeEach, describe, expect, it, vi } from "vitest";
import { getWorkBySlug, getWorkData } from "@/lib/api/work/service";

const { fetchStrapiJsonMock, MockStrapiRequestError } = vi.hoisted(() => {
  class HoistedStrapiRequestError extends Error {
    status: number;

    constructor(status: number) {
      super(`Request failed with status ${status}`);
      this.name = "StrapiRequestError";
      this.status = status;
    }
  }

  return {
    fetchStrapiJsonMock: vi.fn(),
    MockStrapiRequestError: HoistedStrapiRequestError,
  };
});

vi.mock("@/lib/api/strapi/client", () => ({
  createStrapiApiError: vi.fn((_error: unknown, message: string) => ({
    message,
    status: 500,
  })),
  fetchStrapiJson: fetchStrapiJsonMock,
  StrapiRequestError: MockStrapiRequestError,
}));

const project = {
  slug: "portfolio-refresh",
  title: "Portfolio Refresh",
  type: "Web design",
  summary: [
    { children: [{ text: "A thoughtful redesign." }] },
    { children: [{ text: "Built for clarity." }] },
  ],
  tools: ["Figma", "Next.js", 123],
  thumbnail: {
    url: "/uploads/portfolio-thumb.png",
    alternativeText: "Portfolio preview",
  },
  hero: {
    attributes: {
      url: "/uploads/portfolio-hero.png",
      alternativeText: "Portfolio hero image",
    },
  },
  link: "https://example.com/portfolio-refresh",
};

describe("getWorkData", () => {
  beforeEach(() => {
    fetchStrapiJsonMock.mockReset();
  });

  it("maps a project into the shape used by the UI", async () => {
    fetchStrapiJsonMock.mockResolvedValue({ data: [{ attributes: project }] });

    await expect(getWorkData()).resolves.toEqual({
      data: [
        {
          slug: "portfolio-refresh",
          title: "Portfolio Refresh",
          type: "Web design",
          thumbSrc: "http://localhost:1337/uploads/portfolio-thumb.png",
          thumbAlt: "Portfolio preview",
          imgSrc: "http://localhost:1337/uploads/portfolio-hero.png",
          imgAlt: "Portfolio hero image",
          summary: "A thoughtful redesign.\n\nBuilt for clarity.",
          tools: ["Figma", "Next.js"],
          link: "https://example.com/portfolio-refresh",
        },
      ],
      error: null,
    });
  });

  it("returns a safe error when a project is missing required fields", async () => {
    fetchStrapiJsonMock.mockResolvedValue({
      data: [{ title: "Missing slug" }],
    });

    await expect(getWorkData()).resolves.toEqual({
      data: null,
      error: {
        message: "Work data is currently unavailable.",
        status: 500,
      },
    });
  });
});

describe("getWorkBySlug", () => {
  beforeEach(() => {
    fetchStrapiJsonMock.mockReset();
  });

  it("returns the matching project when Strapi returns one object", async () => {
    fetchStrapiJsonMock.mockResolvedValue({ data: { attributes: project } });

    const result = await getWorkBySlug("portfolio-refresh");

    expect(result.data?.slug).toBe("portfolio-refresh");
    expect(result.error).toBeNull();
  });

  it("returns a 404 result when no project matches the slug", async () => {
    fetchStrapiJsonMock.mockResolvedValue({ data: [] });

    await expect(getWorkBySlug("does-not-exist")).resolves.toEqual({
      data: null,
      error: {
        message: "Project was not found.",
        status: 404,
      },
    });
  });

  it("turns a Strapi 404 exception into the same 404 result", async () => {
    fetchStrapiJsonMock.mockRejectedValue(new MockStrapiRequestError(404));

    await expect(getWorkBySlug("does-not-exist")).resolves.toEqual({
      data: null,
      error: {
        message: "Project was not found.",
        status: 404,
      },
    });
  });
});
