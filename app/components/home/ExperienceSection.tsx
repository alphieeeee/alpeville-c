import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ContentCard from "../ContentCard";
import SectionHeading from "../SectionHeading";
import type { ExperienceItem } from "../../../lib/api/experience/types";

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
  children,
  ...props
}: ExperienceSectionProps) {
  return (
    <section {...props} id={id} className={`${className}`.trim()}>
      <SectionHeading title="Experience" />

      <div className="mt-8 grid gap-4">
        {experienceData.map((item) => (
          <ContentCard
            key={`${item.company}-${item.role}`}
            meta={`${item.company} | ${item.period}`}
            title={item.role}
            description={item.description}
          />
        ))}
      </div>

      {children}
    </section>
  );
}

