import type { ComponentPropsWithoutRef, ReactNode } from "react";
import CtaButton from "../CtaButton";
import ContentCard from "../ContentCard";
import SectionHeading from "../SectionHeading";
import type { CertificationItem } from "../../../lib/api/certifications/types";
import AnimPanning from "../gsap/AnimPanning";

type CertificationsSectionBaseProps = ComponentPropsWithoutRef<"section">;

type CertificationsSectionProps = {
  certificationsData: CertificationItem[];
  id?: string;
  className?: string;
  children?: ReactNode;
} & CertificationsSectionBaseProps;

export default function CertificationsSection({
  certificationsData,
  id,
  className = "",
  style,
  children,
  ...props
}: CertificationsSectionProps) {
  return (
    <section {...props} id={id} style={style} className={`${className}`.trim()}>
      <SectionHeading title="Certifications" />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {certificationsData.map((cert, index) => (
          <AnimPanning
            key={`${cert.name}`}
            delay={index * 0.1}
            duration={0.8}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
          >
            <ContentCard
              key={cert.name}
              meta={cert.issuer}
              title={cert.name}
              description={cert.description}
            >
              {cert.link ? (
                <CtaButton href={cert.link} external variant="secondary">
                  Verify Credential
                </CtaButton>
              ) : null}
            </ContentCard>
          </AnimPanning>
        ))}
      </div>

      {children}
    </section>
  );
}
