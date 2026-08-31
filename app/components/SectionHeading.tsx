import type { ComponentPropsWithoutRef } from "react";
import styles from "./SectionHeading.module.css";
import AnimPanning from "./gsap/AnimPanning";

type SectionHeadingProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
} & ComponentPropsWithoutRef<"div">;

export default function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  className = "",
  children,
  style,
  ...props
}: SectionHeadingProps) {
  return (
    <div {...props} id={id} style={style} className={`${styles.wrap} ${className}`.trim()}>
      {eyebrow ? (
        <AnimPanning
          duration={0.8}
          direction="up"
          from={5}
          to={0}
          fade="in"
          animOnce={true}
        >
          <p className={styles.eyebrow}>{eyebrow}</p>
        </AnimPanning>
      ) : null}
      {title ? (
        <AnimPanning
          duration={0.8}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
        >
          <h2 className={`${styles.title} text-3xl font-semibold tracking-tight sm:text-4xl`}>
            {title}
          </h2>
        </AnimPanning>
      ) : null}
      {description ? (
        <AnimPanning
          duration={0.8}
          direction="up"
          from={50}
          to={0}
          fade="in"
          animOnce={true}
        >
          <p className={styles.description}>{description}</p>
        </AnimPanning>
      ) : null}
      {children}
    </div>
  );
}
