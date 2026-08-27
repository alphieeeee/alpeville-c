import type { ComponentPropsWithoutRef, ReactNode } from "react";
import CtaButton from "./CtaButton";
import styles from "./ErrorState.module.css";

type ErrorStateProps = {
  message: string;
  retryHref?: string;
  id?: string;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export default function ErrorState({
  message,
  retryHref,
  id,
  className = "",
  style,
  children,
  ...props
}: ErrorStateProps) {
  return (
    <section
      {...props}
      id={id}
      style={style}
      role="alert"
      className={`${styles.root} ${className}`.trim()}
    >
      <p className={styles.label}>Unable to load content</p>
      <p className={styles.message}>{message}</p>
      {retryHref ? (
        <div>
          <CtaButton href={retryHref} variant="secondary">
            Try again
          </CtaButton>
        </div>
      ) : null}
      {children}
    </section>
  );
}
