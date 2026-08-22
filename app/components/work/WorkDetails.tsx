import CtaButton from "../CtaButton";
import type { ComponentPropsWithoutRef } from "react";
import type { WorkCard } from "../../../lib/api/work/types";
import styles from "./WorkDetails.module.css";

type WorkDetailsProps = {
  project: WorkCard;
} & ComponentPropsWithoutRef<"div">;

export default function WorkDetails({ project, id, className = "", style, children, ...props }: WorkDetailsProps) {
  return (
    <div {...props} id={id} style={style} className={`${styles.details} ${className}`.trim()}>
      <header className={styles.heading}>
        <h1 className={styles.title}>{project.title}</h1>
      </header>
      <div className={styles.descriptionBlock}>
        <p className={styles.label}>About the project</p>
        <p className={styles.description}>{project.summary}</p>
      </div>
      {children}
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
    </div>
  );
}
