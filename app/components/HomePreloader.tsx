"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./HomePreloader.module.css";

const MINIMUM_DISPLAY_MS = 700;
const PROGRESS_TICK_MS = 40;

export default function HomePreloader() {
  const { progress } = useProgress();
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [hasMinimumTimePassed, setHasMinimumTimePassed] = useState(false);
  const [visualProgress, setVisualProgress] = useState(0);
  const actualProgress = Math.min(Math.max(progress, 0), 100);
  const percentage = Math.round(visualProgress);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsMounted(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setHasMinimumTimePassed(true),
      MINIMUM_DISPLAY_MS,
    );

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const targetProgress =
      actualProgress >= 100 ? 100 : Math.min(Math.max(actualProgress, 8), 92);
    const interval = window.setInterval(() => {
      setVisualProgress((currentProgress) => {
        if (currentProgress >= targetProgress) return currentProgress;

        const step = targetProgress >= 100 ? 3 : 1.4;
        return Math.min(targetProgress, currentProgress + step);
      });
    }, PROGRESS_TICK_MS);

    return () => window.clearInterval(interval);
  }, [actualProgress]);

  useEffect(() => {
    if (visualProgress < 100 || !hasMinimumTimePassed) return;

    const timeout = window.setTimeout(() => setIsVisible(false), 180);
    return () => window.clearTimeout(timeout);
  }, [hasMinimumTimePassed, visualProgress]);

  useEffect(() => {
    if (!isVisible) return;

    document.documentElement.classList.add("preloader-active");
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const preventScroll = (event: Event) => event.preventDefault();
    const preventKeyboardScroll = (event: KeyboardEvent) => {
      if ([" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(event.key)) {
        event.preventDefault();
      }
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", preventScroll, { capture: true, passive: false });
    window.addEventListener("touchmove", preventScroll, { capture: true, passive: false });
    window.addEventListener("keydown", preventKeyboardScroll, { capture: true });

    return () => {
      document.documentElement.classList.remove("preloader-active");
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("wheel", preventScroll, true);
      window.removeEventListener("touchmove", preventScroll, true);
      window.removeEventListener("keydown", preventKeyboardScroll, true);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const preloader = (
    <section
      className={styles.preloader}
      role="status"
      aria-label="Loading portfolio"
      aria-busy="true"
      onPointerDown={(event) => event.preventDefault()}
      onClick={(event) => event.preventDefault()}
    >
      <div className={styles.content}>
        <p className={styles.eyebrow}>Alpeville</p>
        <p className={styles.label}>Preparing the experience</p>
        <div
          className={styles.track}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
          aria-label={`${percentage}% loaded`}
        >
          <span className={styles.fill} style={{ width: `${percentage}%` }} />
        </div>
        <p className={styles.percentage}>{percentage}%</p>
      </div>
    </section>
  );

  // Render the first frame in place for SSR, then escape the smooth-scroll
  // stacking context once the browser is ready.
  return isMounted ? createPortal(preloader, document.body) : preloader;
}
