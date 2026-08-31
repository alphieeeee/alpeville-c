import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { CvSkill } from "../../../lib/api/cv/types";
import styles from "../../cv/page.module.css";

type CvSkillsProps = {
  label?: string;
  skills: CvSkill[];
  id?: string;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export default function CvSkills({
  label,
  skills,
  id,
  className = "",
  style,
  children,
  ...props
}: CvSkillsProps) {
  return (
    <section {...props} id={id} style={style} className={`${styles.section} ${className}`.trim()}>
      {label ? <p className={styles.sectionLabel}>{label}</p> : null}
      <dl className={styles.skills}>
        {skills.map((skill) => (
          <div key={skill.category}>
            <dt>{skill.category}</dt>
            <dd>{skill.skills}</dd>
          </div>
        ))}
      </dl>
      {children}
    </section>
  );
}
