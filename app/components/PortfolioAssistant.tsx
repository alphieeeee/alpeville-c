"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./PortfolioAssistant.module.css";

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
    label: "Tell me about Alps",
    answer:
      "Alpeville Carinan is a Senior Frontend Developer who brings designs to life through code, motion, and interaction. Alps focuses on polished, responsive web experiences and creative development.",
    sectionId: "about",
    sectionLabel: "Explore About Me",
  },
  {
    id: "work",
    label: "What kind of work do you do?",
    answer:
      "Alps works across interactive creative development, frontend applications, rich media, web animation, API integrations, and headless CMS projects.",
    sectionId: "what-i-do",
    sectionLabel: "See What I Do",
  },
  {
    id: "projects",
    label: "Show me some projects",
    answer:
      "The work section includes motion-led websites, interactive campaigns, rich media experiences, and AI-augmented frontend projects built with technologies such as React, Vue, Nuxt, GSAP, and Next.js.",
    sectionId: "work",
    sectionLabel: "Explore Projects",
  },
  {
    id: "skills",
    label: "What are your strongest skills?",
    answer:
      "The portfolio highlights frontend development, creative development, web animation, API integration, and problem solving, with experience across React, Vue, Next.js, Nuxt, GSAP, and Three.js.",
    sectionId: "about",
    sectionLabel: "View Skills",
  },
  {
    id: "contact",
    label: "How can I contact you?",
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedOptionId, setSelectedOptionId] = useState("about");
  const selectedOption = assistantOptions.find(
    (option) => option.id === selectedOptionId,
  );

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const goToSection = (sectionId?: string) => {
    if (!sectionId) return;

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!isOpen || !selectedOption) return null;

  return createPortal(
    <section
      className={styles.panel}
      role="dialog"
      aria-modal="false"
      aria-labelledby="portfolio-assistant-title"
    >
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Meet the portfolio guide</p>
          <h2 id="portfolio-assistant-title" className={styles.title}>
            Ask Alps
          </h2>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close portfolio assistant"
        >
          <span aria-hidden="true">x</span>
        </button>
      </div>

      <p className={styles.prompt}>
        Choose a question to discover more about Alps and the work behind this
        site.
      </p>

      <ul className={styles.suggestions} aria-label="Suggested questions">
        {assistantOptions.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              className={`${styles.suggestion} ${
                option.id === selectedOptionId ? styles.suggestionActive : ""
              }`.trim()}
              onClick={() => setSelectedOptionId(option.id)}
              aria-pressed={option.id === selectedOptionId}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.answer} aria-live="polite">
        <p>{selectedOption.answer}</p>
        {selectedOption.sectionId ? (
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
