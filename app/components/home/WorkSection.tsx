import type { ComponentPropsWithoutRef, ReactNode } from "react";
import SectionHeading from "../SectionHeading";
import WorkProjectCard from "../WorkProjectCard";
import type { WorkCard } from "../../../lib/api/work/types";
import AnimPanning from "../gsap/AnimPanning";

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
        {workData.map((project, index) => (
          <AnimPanning
            key={`${project.title}-${index}`}
            duration={0.8}
            // direction={`${index % 2 === 0 ? "left" : "right"}`}
            // from={index % 2 === 0 ? -25 : 25}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
            className="col-span-12 md:col-span-6"
          >
            <WorkProjectCard key={project.slug} project={project} />
          </AnimPanning>
        ))}
      </div>

      {children}
    </section>
  );
}
