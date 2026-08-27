import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "../../cv/page.module.css";

type CvSummaryProps = {
  label?: string;
  summary: string;
  id?: string;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export default function CvSummary({
  label,
  summary,
  id,
  className = "",
  style,
  children,
  ...props
}: CvSummaryProps) {
  return (
    <section {...props} id={id} style={style} className={`${styles.section} ${className}`.trim()}>
      {label ? <p className={styles.sectionLabel}>{label}</p> : null}
      <p className={styles.summary}>{summary}</p>
      {children}
    </section>
  );
}
