import type { ReactNode } from "react";
import styles from "./ContentCard.module.css";

type ContentCardProps = {
  title: string;
  description: string;
  meta?: string;
  tags?: string[];
  className?: string;
  children?: ReactNode;
};

export default function ContentCard({
  title,
  description,
  meta,
  tags,
  className = "",
  children,
}: ContentCardProps) {
  return (
    <article className={`${styles.card} glass-surface ${className}`}>
      {meta ? (
        <p className={styles.meta}>
          {meta}
        </p>
      ) : null}
      <h3 className={`${styles.title} text-xl font-semibold tracking-tight text-foreground`}>
        {title}
      </h3>
      <p className={styles.description}>{description}</p>
      {tags?.length ? (
        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li
              key={tag}
              className={styles.tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      {children ? <div className={styles.children}>{children}</div> : null}
    </article>
  );
}
