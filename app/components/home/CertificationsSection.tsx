import type { ComponentPropsWithoutRef, ReactNode } from "react";
import CtaButton from "../CtaButton";
import ContentCard from "../ContentCard";
import SectionHeading from "../SectionHeading";
import type { CertificationItem } from "../../../lib/api/certifications/types";

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
        {certificationsData.map((cert) => (
          <ContentCard
            key={cert.name}
            meta={cert.issuer}
            title={cert.name}
            description={cert.description}
          >
            <CtaButton href={cert.link} external variant="secondary">
              Verify Credential
            </CtaButton>
          </ContentCard>
        ))}
      </div>

      {children}
    </section>
  );
}
