import CtaButton from "../CtaButton";
import type { HomeHeroData } from "../../../lib/api/home/types";
import styles from "./HomeHero.module.css";
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";

type HomeHeroBaseProps = ComponentPropsWithoutRef<"section">;

type HomeHeroProps = {
  heroData: HomeHeroData;
  id?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & HomeHeroBaseProps;

export default function HomeHero({
  heroData,
  id,
  className = "",
  style,
  children,
  ...props
}: HomeHeroProps) {
  const { eyebrow, name, lead, ctas } = heroData;

  return (
    <section
      {...props}
      id={id}
      style={style}
      className={`${styles.hero} flex flex-col items-center justify-between p-8 sm:p-10 ${className}`.trim()}
    >
      <div className={`${styles.layout} w-full grow flex items-center justify-center lg:justify-start`}>
        <div className={`${styles.copy} text-center lg:text-left`}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.lead}>{lead}</p>
        </div>
      </div>
      <div className={`${styles.actionsWrap} w-full flex flex-col items-center`}>
        <div className={`${styles.actions} flex justify-center gap-[0.75rem]`}>
          {ctas.map((cta) => (
            <CtaButton
              key={cta.href}
              href={cta.href}
              variant={cta.variant ?? "primary"}
            >
              {cta.label}
            </CtaButton>
          ))}
        </div>
        <div className={`${styles.scrollIndicator} flex flex-col items-center justify-center gap-[0.55rem]`} aria-hidden="true">
          <span className={styles.scrollText}>Scroll</span>
          <span className={styles.scrollLine} />
        </div>
      </div>

      {children}
    </section>
  );
}
