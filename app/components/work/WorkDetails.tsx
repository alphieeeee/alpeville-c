import CtaButton from "../CtaButton";
import type { ComponentPropsWithoutRef } from "react";
import type { WorkCard } from "../../../lib/api/work/types";
import styles from "./WorkDetails.module.css";
import AnimPanning from "../gsap/AnimPanning";

type WorkDetailsProps = {
  project: WorkCard;
} & ComponentPropsWithoutRef<"div">;

export default function WorkDetails({ project, id, className = "", style, children, ...props }: WorkDetailsProps) {
  return (
    <div {...props} id={id} style={style} className={`${styles.details} ${className}`.trim()}>
      <header className={styles.heading}>
        <AnimPanning
          duration={0.8}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
        >
          <h1 className={styles.title}>{project.title}</h1>
        </AnimPanning>
      </header>
      <div className={styles.descriptionBlock}>
        <AnimPanning
          duration={0.8}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
        >
          <p className={styles.label}>About the project</p>
        </AnimPanning>
        <AnimPanning
          duration={0.8}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
        >
          <p className={styles.description}>{project.summary}</p>
        </AnimPanning>
      </div>
      {children}
      <AnimPanning
        duration={0.8}
        direction="up"
        from={0}
        to={0}
        fade="in"
        animOnce={true}
      >
        <div className={`${styles.metadata} glass-surface`}>
          <div className={styles.metadataRow}>
            <p className={styles.label}>Project type</p>
            <p className={`${styles.value} uppercase`}>{project.type}</p>
          </div>
          <div className={`${styles.metadataRow}`}>
            <p className={styles.label}>Built with</p>
            <ul className={styles.tools}>
              {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </div>
          {project.link ? (
            <CtaButton href={project.link} external>
              Visit live project
            </CtaButton>
          ) : null}
        </div>
      </AnimPanning>
    </div>
  );
}
