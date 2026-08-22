import type { ComponentPropsWithoutRef } from "react";
import styles from "./PlaceholderSection.module.css";

type PlaceholderSectionProps = {
  title: string;
  description: string;
} & ComponentPropsWithoutRef<"section">;

export default function PlaceholderSection({
  title,
  description,
  id,
  className = "",
  style,
  children,
  ...props
}: PlaceholderSectionProps) {
  return (
    <section {...props} id={id} style={style} className={`${styles.card} glass-surface ${className}`.trim()}>
      <p className={styles.eyebrow}>Placeholder</p>
      <h2 className={`${styles.title} text-3xl font-semibold tracking-tight sm:text-4xl`}>
        {title}
      </h2>
      <p className={styles.description}>{description}</p>
      {children}
    </section>
  );
}
