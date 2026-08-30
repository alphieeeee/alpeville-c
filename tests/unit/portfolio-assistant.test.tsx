import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PortfolioAssistant from "@/app/components/PortfolioAssistant";

describe("PortfolioAssistant", () => {
  it("opens with the About Me suggestion selected", () => {
    render(<PortfolioAssistant isOpen onClose={vi.fn()} />);

    expect(screen.getByRole("dialog", { name: "Ask Alps" })).toBeVisible();
    expect(screen.getByText(/Alpeville Carinan is a Senior Frontend Developer/)).toBeVisible();
    expect(screen.getByRole("button", { name: "Tell me about Alps" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("shows a new answer when a suggestion is selected", async () => {
    const user = userEvent.setup();
    render(<PortfolioAssistant isOpen onClose={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "What kind of work do you do?" }));

    expect(screen.getByText(/interactive creative development/)).toBeVisible();
    expect(screen.getByRole("button", { name: "What kind of work do you do?" })).toHaveAttribute(
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
});
