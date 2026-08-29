import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ContentCard from "../ContentCard";
import SectionHeading from "../SectionHeading";
import type { ExperienceItem } from "../../../lib/api/experience/types";
import AnimPanning from "../gsap/AnimPanning";

type ExperienceSectionBaseProps = ComponentPropsWithoutRef<"section">;

type ExperienceSectionProps = {
  experienceData: ExperienceItem[];
  id?: string;
  className?: string;
  children?: ReactNode;
} & ExperienceSectionBaseProps;

export default function ExperienceSection({
  experienceData,
  id,
  className = "",
  style,
  children,
  ...props
}: ExperienceSectionProps) {
  return (
    <section {...props} id={id} style={style} className={`${className}`.trim()}>
      <SectionHeading title="Experience" />

      <div className="mt-8 grid gap-4">
        {experienceData.map((item) => (
          <AnimPanning
            key={`${item.role}`}
            duration={0.8}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
          >
            <ContentCard
              key={`${item.company}-${item.role}`}
              meta={`${item.company} | ${item.period}`}
              title={item.role}
              description={item.description}
            />
          </AnimPanning>
        ))}
      </div>

      {children}
    </section>
  );
}
