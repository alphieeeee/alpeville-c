import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContentCard from "@/app/components/ContentCard";

describe("ContentCard", () => {
  it("renders its required content", () => {
    render(
      <ContentCard title="About me" description="A short introduction." />
    );

    expect(screen.getByRole("heading", { name: "About me" })).toBeVisible();
    expect(screen.getByText("A short introduction.")).toBeVisible();
  });

  it("renders optional metadata, tags, and children", () => {
    render(
      <ContentCard
        title="Skills"
        description="Tools I use."
        meta="Capabilities"
        tags={["TypeScript", "React"]}
      >
        <a href="/cv">View CV</a>
      </ContentCard>
    );

    expect(screen.getByText("Capabilities")).toBeVisible();
    expect(screen.getByRole("list")).toHaveTextContent("TypeScriptReact");
    expect(screen.getByRole("link", { name: "View CV" })).toHaveAttribute(
      "href",
      "/cv"
    );
  });
});
