import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { CvRole } from "../../../lib/api/cv/types";
import styles from "../../cv/page.module.css";

type CvExperienceProps = {
  label: string;
  roles: CvRole[];
  id?: string;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export default function CvExperience({
  label,
  roles,
  id,
  className = "",
  style,
  children,
  ...props
}: CvExperienceProps) {
  return (
    <section {...props} id={id} style={style} className={`${styles.section} ${className}`.trim()}>
      <p className={styles.sectionLabel}>{label}</p>
      <div className={styles.experienceList}>
        {roles.map((role) => (
          <article className={styles.experience} key={`${role.company}-${role.title}`}>
            <h2>{role.title}</h2>
            <p className={styles.company}>
              {role.company} <span>|</span> {role.dates}
            </p>
            <ul className={styles.experienceBullets}>
              {role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </article>
        ))}
      </div>
      {children}
    </section>
  );
}
