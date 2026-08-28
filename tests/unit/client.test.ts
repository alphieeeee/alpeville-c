import { describe, expect, it, vi } from "vitest";
import {
  createStrapiApiError,
  StrapiRequestError,
} from "@/lib/api/strapi/client";

describe("createStrapiApiError", () => {
  it("hides implementation details and preserves an HTTP status", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const result = createStrapiApiError(
      new StrapiRequestError("Database details", 404),
      "Project was not found."
    );

    expect(result).toEqual({
      message: "Project was not found.",
      status: 404,
    });
  });

  it("uses status 500 for an unexpected error", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    expect(createStrapiApiError(new Error("Private details"), "Try again.")).toEqual({
      message: "Try again.",
      status: 500,
    });
  });
});
