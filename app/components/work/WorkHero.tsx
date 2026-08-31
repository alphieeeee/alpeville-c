import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import type { WorkCard } from "../../../lib/api/work/types";
import styles from "./WorkHero.module.css";
import AnimPanning from "../gsap/AnimPanning";

type WorkHeroProps = {
  project: WorkCard;
} & ComponentPropsWithoutRef<"div">;

export default function WorkHero({ project, id, className = "", style, children, ...props }: WorkHeroProps) {
  return (
    <div {...props} id={id} style={style} className={`${styles.hero} ${className}`.trim()}>
      <AnimPanning
        delay={0.2}
        duration={0.8}
        direction="up"
        from={0}
        to={0}
        fade="in"
        animOnce={true}
        onScroll={false}
      >
        <div className={styles.imageWrap}>
          <Image
            src={project.imgSrc}
            alt={project.imgAlt || `${project.title} hero image`}
            fill
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
            className={styles.image}
          />
        </div>
      </AnimPanning>
      {children}
    </div>
  );
}
