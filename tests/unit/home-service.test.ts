import { beforeEach, describe, expect, it, vi } from "vitest";
import { getHomeHeroData } from "@/lib/api/home/service";

// vi.mock is moved before imports by Vitest, so create shared mocks with vi.hoisted.
const { fetchStrapiJsonMock } = vi.hoisted(() => ({
  fetchStrapiJsonMock: vi.fn(),
}));

vi.mock("@/lib/api/strapi/client", () => ({
  createStrapiApiError: vi.fn((_error: unknown, message: string) => ({
    message,
    status: 500,
  })),
  fetchStrapiJson: fetchStrapiJsonMock,
}));

describe("getHomeHeroData", () => {
  beforeEach(() => {
    fetchStrapiJsonMock.mockReset();
  });

  it("maps the hero section and defaults missing CTAs to an empty list", async () => {
    fetchStrapiJsonMock.mockResolvedValue({
      data: {
        attributes: {
          Sections: [
            { eyebrow: "Designer", name: "Alps", lead: "Hello" },
          ],
        },
      },
    });

    await expect(getHomeHeroData()).resolves.toEqual({
      data: {
        eyebrow: "Designer",
        name: "Alps",
        lead: "Hello",
        ctas: [],
      },
      error: null,
    });
  });

  it("returns a safe error when the CMS response has no hero", async () => {
    fetchStrapiJsonMock.mockResolvedValue({ data: { Sections: [] } });

    await expect(getHomeHeroData()).resolves.toEqual({
      data: null,
      error: {
        message: "Home data is currently unavailable.",
        status: 500,
      },
    });
  });
});
