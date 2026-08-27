import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { CvHero as CvHeroData } from "../../../lib/api/cv/types";
import styles from "../../cv/page.module.css";

type CvHeroProps = {
  hero: CvHeroData;
  id?: string;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"header">;

export default function CvHero({
  hero,
  id,
  className = "",
  style,
  children,
  ...props
}: CvHeroProps) {
  return (
    <header {...props} id={id} style={style} className={`${styles.hero} ${className}`.trim()}>
      <div>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1 className={styles.name}>{hero.name}</h1>
        <p className={styles.role}>{hero.role}</p>
        <p className={styles.location}>{hero.location}</p>
      </div>

      <div className={styles.contact}>
        {hero.contact ? <p className={styles.muted}>{hero.contact}</p> : null}
        {hero.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>

      {children}
    </header>
  );
}
