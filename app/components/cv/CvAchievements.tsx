import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "../../cv/page.module.css";

type CvAchievementsProps = {
  label: string;
  achievements: string[];
  id?: string;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export default function CvAchievements({
  label,
  achievements,
  id,
  className = "",
  style,
  children,
  ...props
}: CvAchievementsProps) {
  return (
    <section {...props} id={id} style={style} className={`${styles.section} ${className}`.trim()}>
      <p className={styles.sectionLabel}>{label}</p>
      {achievements.map((achievement) => (
        <p className={styles.muted} key={achievement}>{achievement}</p>
      ))}
      {children}
    </section>
  );
}
