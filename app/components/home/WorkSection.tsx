import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ContentCard from "../ContentCard";
import SectionHeading from "../SectionHeading";
import type { WorkCard } from "../../../lib/api/work/types";

type WorkSectionBaseProps = ComponentPropsWithoutRef<"section">;

type WorkSectionProps = {
  workData: WorkCard[];
  id?: string;
  className?: string;
  children?: ReactNode;
} & WorkSectionBaseProps;

export default function WorkSection({
  workData,
  id,
  className = "",
  children,
  ...props
}: WorkSectionProps) {
  return (
    <section {...props} id={id} className={`${className}`.trim()}>
      <SectionHeading title="Projects" />

      <div className="mt-8 grid grid-cols-12 gap-4">
        {workData.map((project) => (
          <article key={project.title} className={project.layout}>
            <ContentCard
              meta={project.type}
              title={project.title}
              description={project.summary}
              tags={project.tools}
              className="h-full"
            />
          </article>
        ))}
      </div>

      {children}
    </section>
  );
}

