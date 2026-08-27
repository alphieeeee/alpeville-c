import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { CvEducation as CvEducationData } from "../../../lib/api/cv/types";
import styles from "../../cv/page.module.css";

type CvEducationProps = {
  label: string;
  education: CvEducationData[];
  id?: string;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export default function CvEducation({
  label,
  education,
  id,
  className = "",
  style,
  children,
  ...props
}: CvEducationProps) {
  return (
    <section {...props} id={id} style={style} className={`${styles.section} ${className}`.trim()}>
      <p className={styles.sectionLabel}>{label}</p>
      {education.map((item) => (
        <div key={`${item.degree}-${item.school}`}>
          <h2 className={styles.educationTitle}>{item.degree}</h2>
          <p className={styles.muted}>{item.school}</p>
          <p className={styles.muted}>{item.period}</p>
        </div>
      ))}
      {children}
    </section>
  );
}
