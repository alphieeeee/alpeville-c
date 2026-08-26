import type { ComponentPropsWithoutRef, ReactNode } from "react";
import SectionHeading from "../SectionHeading";
import WorkProjectCard from "../WorkProjectCard";
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
  style,
  children,
  ...props
}: WorkSectionProps) {
  return (
    <section {...props} id={id} style={style} className={`${className}`.trim()}>
      <SectionHeading title="Projects" />

      <div className="mt-8 grid grid-cols-12 gap-4">
        {workData.map((project) => (
          <WorkProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {children}
    </section>
  );
}
