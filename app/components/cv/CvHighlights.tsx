import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "../../cv/page.module.css";

type CvHighlightsProps = {
  label?: string;
  highlights: string[];
  id?: string;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export default function CvHighlights({
  label,
  highlights,
  id,
  className = "",
  style,
  children,
  ...props
}: CvHighlightsProps) {
  return (
    <section {...props} id={id} style={style} className={`${styles.section} ${className}`.trim()}>
      {label ? <p className={styles.sectionLabel}>{label}</p> : null}
      <ul className={styles.compactList}>
        {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
      </ul>
      {children}
    </section>
  );
}
