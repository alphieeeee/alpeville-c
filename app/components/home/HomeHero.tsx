import CtaButton from "../CtaButton";
import type { HomeHeroData } from "../../../lib/api/home/types";
import styles from "./HomeHero.module.css";
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";
import AnimPanning from "../gsap/AnimPanning";

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
      className={`${styles.hero} flex flex-col items-center justify-between py-8 sm:p-10 ${className}`.trim()}
    >
      <div className={`${styles.layout} w-full grow flex justify-center lg:justify-start`}>
        <div className={`${styles.copy} text-center lg:text-left`}>
          <AnimPanning
            delay={0.5}
            duration={0.8}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
            onScroll={false}
          >
            <p className={styles.eyebrow}>{eyebrow}</p>
          </AnimPanning>
          <AnimPanning
            delay={0.5}
            duration={0.8}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
            onScroll={false}
          >
            <h1 className={styles.name}>{name}</h1>
          </AnimPanning>
          <AnimPanning
            delay={0.5}
            duration={0.8}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
            onScroll={false}
          >
            <p className={styles.lead}>{lead}</p>
          </AnimPanning>
        </div>
      </div>
      <div className={`${styles.actionsWrap} w-full flex flex-col items-center`}>
        <div className={`${styles.actions} flex justify-center gap-[0.75rem]`}>
          {ctas.map((cta, index) => (
            <AnimPanning
              key={`${cta.label}-cta`}
              delay={0.5 + index * 0.1}
              duration={0.4}
              direction="up"
              from={25}
              to={0}
              fade="in"
              animOnce={true}
              onScroll={false}
            >
              <CtaButton
                key={cta.href}
                href={cta.href}
                variant={cta.variant ?? "primary"}
              >
                {cta.label}
              </CtaButton>
            </AnimPanning>
          ))}
        </div>
        <AnimPanning
          delay={0.8}
          duration={0.8}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
          onScroll={false}
        >
          <div className={`${styles.scrollIndicator} flex flex-col items-center justify-center gap-[0.55rem]`} aria-hidden="true">
            <span className={styles.scrollText}>Scroll</span>
            <span className={styles.scrollLine} />
          </div>
        </AnimPanning>
      </div>

      {children}
    </section>
  );
}
