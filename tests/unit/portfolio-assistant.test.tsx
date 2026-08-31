import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PortfolioAssistant from "@/app/components/PortfolioAssistant";

describe("PortfolioAssistant", () => {
  it("opens with the About Me suggestion selected", () => {
    render(<PortfolioAssistant isOpen onClose={vi.fn()} />);

    expect(screen.getByRole("dialog", { name: "Ask Alps" })).toBeVisible();
    expect(screen.getByText(/Alpeville Carinan is a Senior Frontend Developer/)).toBeVisible();
    expect(screen.getByRole("button", { name: "Who is Alps?" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("shows a new answer when a suggestion is selected", async () => {
    const user = userEvent.setup();
    render(<PortfolioAssistant isOpen onClose={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Explore projects" }));

    expect(screen.getByText(/motion-led websites/)).toBeVisible();
    expect(screen.getByRole("button", { name: "Explore projects" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("calls onClose when the close button is selected", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<PortfolioAssistant isOpen onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Close portfolio assistant" }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("shows the answer returned by the AI endpoint", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ answer: "This answer is from the portfolio context." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(<PortfolioAssistant isOpen onClose={vi.fn()} />);

    await user.type(
      screen.getByRole("textbox", { name: "Ask a custom question" }),
      "What projects has Alps built?",
    );
    await user.click(screen.getByRole("button", { name: "Ask" }));

    expect(await screen.findByText("This answer is from the portfolio context.")).toBeVisible();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/assistant",
      expect.objectContaining({ method: "POST" }),
    );
    fetchMock.mockRestore();
  });
});
