import type { ComponentPropsWithoutRef } from "react";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
} & ComponentPropsWithoutRef<"div">;

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <div {...props} className={`${styles.wrap} ${className}`.trim()}>
      {eyebrow ? (
        <p className={styles.eyebrow}>{eyebrow}</p>
      ) : null}
      {title ? (
        <h2 className={`${styles.title} text-3xl font-semibold tracking-tight sm:text-4xl`}>
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className={styles.description}>{description}</p>
      ) : null}
      {children}
    </div>
  );
}
