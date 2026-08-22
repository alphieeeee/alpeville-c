import type { ComponentPropsWithoutRef } from "react";
import SectionHeading from "../SectionHeading";
import styles from "./WhatIDoSection.module.css";

type WhatIdoItem = {
  title: string;
  description: string;
  skills: string[];
};

export type { WhatIdoItem };

type WhatIDoSectionProps = {
  whatIdoData: WhatIdoItem[];
  title?: string;
} & ComponentPropsWithoutRef<"section">;

export default function WhatIDoSection({
  whatIdoData,
  title = "What I Do",
  id,
  className = "",
  style,
  children,
  ...props
}: WhatIDoSectionProps) {
  return (
    <section {...props} id={id} style={style} className={`${styles.section} ${className}`.trim()}>
      <SectionHeading title={title} />

      <div className="mt-8 grid gap-4 lg:grid-cols-1">
        {whatIdoData.map((item) => (
          <article key={item.title} className={`${styles.card} glass-surface`}>
            <div className={styles.titleRow}>
              <span className={styles.number}>
                {item.title.split(".")[0]}.
              </span>
              <h3 className={styles.title}>
                {item.title.replace(/^\d+\.\s*/, "")}
              </h3>
            </div>

            <p className={styles.description}>{item.description}</p>

            <ul className={styles.skills}>
              {item.skills.map((skill) => (
                <li key={skill} className={styles.skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {children}
    </section>
  );
}
