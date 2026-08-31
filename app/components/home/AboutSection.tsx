import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";
import Image from "next/image";
import SectionHeading from "../SectionHeading";
import type { AboutData } from "../../../lib/api/about/types";
import styles from "./AboutSection.module.css";
import SkillsRate from "./SkillsRate";
import AnimPanning from "../gsap/AnimPanning";

type AboutSectionBaseProps = ComponentPropsWithoutRef<"section">;

type AboutSectionProps = {
  aboutData: AboutData;
  id?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & AboutSectionBaseProps;

export default function AboutSection({
  aboutData,
  id,
  className = "",
  style,
  children,
  ...props
}: AboutSectionProps) {
  const { headshot, name, jobTitle, bioPrimary, bioSecondary, skills } = aboutData;

  return (
    <section {...props} id={id} style={style} className={`${styles.section} ${className}`.trim()}>
      <SectionHeading title="About" className={styles.heading} />

      <div className={`${styles.container} grid gap-8 grid-cols-1`}>
        <div className={`grid gap-8`}>
          <AnimPanning
            duration={0.8}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
          >
          <div className={styles.profileRow}>
            <div className={styles.headshotWrap}>
              <div className={styles.headshotShell}>
                <Image
                  src={headshot}
                  alt={name}
                  fill
                  sizes="280px"
                  className={styles.headshot}
                />
              </div>
            </div>

            <div className={styles.profileCopy}>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.jobTitle}>{jobTitle}</p>
            </div>
          </div>
          </AnimPanning>
          <AnimPanning
            duration={0.8}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
          >
            <div className={styles.bio}>
              <p className={styles.bioPrimary}>{bioPrimary}</p>
              <p className={styles.bioSecondary}>{bioSecondary}</p>
            </div>
          </AnimPanning>
        </div>
        <AnimPanning
          duration={0.8}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
        >
          <div>
            <SkillsRate
              className="h-full"
              items={skills ?? []}
            />
          </div>
        </AnimPanning>
      </div>

      {children}
    </section>
  );
}
