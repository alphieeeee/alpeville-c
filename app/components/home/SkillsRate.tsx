"use client";

import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./SkillsRate.module.css";
import type { SkillRateItem } from "../../../lib/api/about/types";

type SkillsRateBaseProps = ComponentPropsWithoutRef<"div">;

type SkillsRateProps = {
  items: SkillRateItem[];
  id?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & SkillsRateBaseProps;

export default function SkillsRate({
  items,
  id,
  className = "",
  style,
  children,
  ...props
}: SkillsRateProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const barsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.isIntersecting);
        if (!entry) return;

        hasAnimatedRef.current = true;
        barsRef.current.forEach((bar, index) => {
          const percent = items[index]?.percent ?? 0;
          if (!bar) return;

          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${Math.max(0, Math.min(percent, 100))}%`,
              duration: 1.2,
              ease: "back.out(1.5)",
              delay: index * 0.12,
            }
          );
        });

        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [items]);

  return (
    <div
      {...props}
      id={id}
      ref={sectionRef}
      style={style}
      className={`${styles.section} ${className}`.trim()}
    >
      <div className={styles.list}>
        {items.map((item, index) => (
          <article key={item.skill} className={styles.item}>
            <div className={`${styles.row} mb-[1rem] lg:mb-0`}>
              <span className={styles.marker} aria-hidden="true" />
              <div className={styles.skill}>{item.skill}</div>
            </div>

            <div className={styles.track} aria-hidden="true">
              <span
                ref={(node) => {
                  barsRef.current[index] = node;
                }}
                className={styles.fill}
                style={{ width: "0%" }}
              />
            </div>
          </article>
        ))}
      </div>

      {children}
    </div>
  );
}
