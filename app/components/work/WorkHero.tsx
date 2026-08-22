import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import type { WorkCard } from "../../../lib/api/work/types";
import styles from "./WorkHero.module.css";

type WorkHeroProps = {
  project: WorkCard;
} & ComponentPropsWithoutRef<"div">;

export default function WorkHero({ project, id, className = "", style, children, ...props }: WorkHeroProps) {
  return (
    <div {...props} id={id} style={style} className={`${styles.hero} ${className}`.trim()}>
      <div className={styles.imageWrap}>
        <Image
          src={project.imgSrc}
          alt={`${project.title} project image`}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className={styles.image}
        />
      </div>
      {children}
    </div>
  );
}
