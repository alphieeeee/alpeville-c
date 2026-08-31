"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import styles from "./PortfolioAssistant.module.css";

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother);

function stopAssistantEvent(event: SyntheticEvent) {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
}

type AssistantOption = {
  id: string;
  label: string;
  answer: string;
  sectionId?: string;
  sectionLabel?: string;
};

const assistantOptions: AssistantOption[] = [
  {
    id: "about",
    label: "Who is Alps?",
    answer:
      "Alpeville Carinan is a Senior Frontend Developer who brings designs to life through code, motion, and interaction. Alps focuses on polished, responsive web experiences and creative development.",
    sectionId: "about",
    sectionLabel: "Explore About Me",
  },
  {
    id: "projects",
    label: "Explore projects",
    answer:
      "The work section includes motion-led websites, interactive campaigns, rich media experiences, and AI-augmented frontend projects built with technologies such as React, Vue, Nuxt, GSAP, and Next.js.",
    sectionId: "work",
    sectionLabel: "Explore Projects",
  },
  {
    id: "contact",
    label: "Get in touch",
    answer:
      "You can reach Alps through the contact section or use the email link in the portfolio navigation.",
    sectionId: "contact",
    sectionLabel: "Go to Contact",
  },
];

type PortfolioAssistantProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PortfolioAssistant({
  isOpen,
  onClose,
}: PortfolioAssistantProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedOptionId, setSelectedOptionId] = useState("about");
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectedOption = assistantOptions.find(
    (option) => option.id === selectedOptionId,
  );

  useEffect(() => {
    if (!isOpen) return;

    const focusFrame = window.requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const goToSection = (sectionId?: string) => {
    if (!sectionId || typeof window === "undefined") return;

    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    const headerHeight =
      document.querySelector<HTMLElement>("#header-divider")?.clientHeight ?? 0;
    const smoother = ScrollSmoother.get();

    if (smoother) {
      const destination =
        targetElement.getBoundingClientRect().top + smoother.scrollTop() - headerHeight;
      smoother.scrollTo(destination, true);
      return;
    }

    gsap.to(window, {
      duration: 0.8,
      scrollTo: {
        y: `#${sectionId}`,
        offsetY: headerHeight,
      },
      ease: "power2.out",
    });
  };

  const askAssistant = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) return;

    setIsLoading(true);
    setAiAnswer(null);
    setError(null);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmedQuestion }),
      });
      const result = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok || !result.answer) {
        throw new Error(result.error ?? "The assistant could not answer right now.");
      }

      setAiAnswer(result.answer);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The assistant could not answer right now.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !selectedOption) return null;

  return createPortal(
    <section
      className={styles.panel}
      role="dialog"
      aria-modal="false"
      aria-labelledby="portfolio-assistant-title"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Meet the portfolio guide</p>
          <h2 id="portfolio-assistant-title" className={styles.title}>
            Ask Alps
          </h2>
        </div>
        <button
          type="button"
          className={styles.closeButton}
          onClick={(event) => {
            stopAssistantEvent(event);
            onClose();
          }}
          aria-label="Close portfolio assistant"
        >
          <span aria-hidden="true">x</span>
        </button>
      </div>

      <p className={styles.prompt}>
        Start with a topic or ask a question about Alps&apos;s portfolio.
      </p>

      <ul className={styles.suggestions} aria-label="Suggested questions">
        {assistantOptions.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              className={`${styles.suggestion} ${
                option.id === selectedOptionId ? styles.suggestionActive : ""
              }`.trim()}
              onClick={() => {
                setSelectedOptionId(option.id);
                setAiAnswer(null);
                setError(null);
              }}
              aria-pressed={option.id === selectedOptionId}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>

      <form className={styles.askForm} onSubmit={askAssistant}>
        <label className={styles.inputLabel} htmlFor="assistant-question">
          Ask a custom question
        </label>
        <div className={styles.inputRow}>
          <input
            id="assistant-question"
            ref={inputRef}
            className={styles.questionInput}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={500}
            placeholder="Ask about the work or experience..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.askButton}
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? "..." : "Ask"}
          </button>
        </div>
      </form>

      <div className={styles.answer} aria-live="polite">
        {isLoading ? <p>Looking through the portfolio...</p> : null}
        {error ? <p className={styles.error}>{error}</p> : null}
        {aiAnswer ? <p className={styles.answerText}>{aiAnswer}</p> : null}
        {!isLoading && !error && !aiAnswer ? <p>{selectedOption.answer}</p> : null}
        {!aiAnswer && selectedOption.sectionId ? (
          <button
            type="button"
            className={styles.sectionLink}
            onClick={() => goToSection(selectedOption.sectionId)}
          >
            {selectedOption.sectionLabel} -&gt;
          </button>
        ) : null}
      </div>
    </section>,
    document.body,
  );
}
