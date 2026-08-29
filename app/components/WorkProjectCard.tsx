import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { WorkCard } from "../../lib/api/work/types";
import styles from "./WorkProjectCard.module.css";
import AnimPanning from "./gsap/AnimPanning";

type WorkProjectCardProps = {
  project: WorkCard;
} & ComponentPropsWithoutRef<"article">;

export default function WorkProjectCard({
  project,
  id,
  className = "",
  style,
  children,
  ...props
}: WorkProjectCardProps) {
  return (
    <article {...props} id={id} style={style} className={`col-span-12 md:col-span-6 ${className}`.trim()}>
      <Link
        href={`/work/${project.slug}`}
        className={styles.card}
        aria-label={`Explore case study: ${project.title}`}
      >
        <div className={styles.visual}>
          <Image
            src={project.thumbSrc}
            alt={project.thumbAlt || `${project.title} thumb image`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={styles.thumb}
            data-speed={1.1}
          />
          <div className={styles.copy}>
            <AnimPanning
              duration={1}
              direction="right"
              ease="back.out(1.1)"
              from={-100}
              to={0}
              fade="in"
              animOnce={true}
            >
              <div><span className={styles.visualType}>{project.type}</span></div>
            </AnimPanning>
            <AnimPanning
              delay={0.1}
              duration={1}
              direction="right"
              ease="back.out(1.1)"
              from={-100}
              to={0}
              fade="in"
              animOnce={true}
            >
              <h3 className={styles.title}>{project.title}</h3>
            </AnimPanning>
          </div>
          <span className={styles.visualMark} />
          <span className={styles.viewLabel}>Explore case study</span>
        </div>
      </Link>
      {children}
    </article>
  );
}
