import type { ComponentPropsWithoutRef } from "react";
import styles from "./ContentCard.module.css";

type ContentCardProps = {
  title: string;
  description: string;
  meta?: string;
  tags?: string[];
} & ComponentPropsWithoutRef<"article">;

export default function ContentCard({
  title,
  description,
  meta,
  tags,
  id,
  className = "",
  style,
  children,
  ...props
}: ContentCardProps) {
  return (
    <article {...props} id={id} style={style} className={`${styles.card} glass-surface ${className}`.trim()}>
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
