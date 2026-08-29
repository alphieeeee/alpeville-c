import type { ComponentPropsWithoutRef, ReactNode } from "react";
import CtaButton from "../CtaButton";
import SectionHeading from "../SectionHeading";
import styles from "./ContactSection.module.css";
import AnimPanning from "../gsap/AnimPanning";

type ContactSectionBaseProps = ComponentPropsWithoutRef<"section">;

type ContactSectionProps = {
  id?: string;
  className?: string;
  children?: ReactNode;
} & ContactSectionBaseProps;

export default function ContactSection({
  id,
  className = "",
  style,
  children,
  ...props
}: ContactSectionProps) {
  return (
    <section {...props} id={id} style={style} className={`${className}`.trim()}>
      <SectionHeading title="Contact" />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div className="space-y-4">
          <AnimPanning
            duration={0.8}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
          >
            <p className="copy-base max-w-2xl text-foreground/75">
              Have a project, opportunity, or idea in mind? Let&apos;s connect. You bring the vision. I&apos;ll bring the code and motion.
            </p>
          </AnimPanning>
          <div className="flex flex-wrap gap-3">
            <AnimPanning
              delay={0.2}
              duration={0.4}
              direction="up"
              from={25}
              to={0}
              fade="in"
              animOnce={true}
            >
              <CtaButton href="mailto:alpsgega@gmail.com">Email Me</CtaButton>
            </AnimPanning>
            <AnimPanning
              delay={0.3}
              duration={0.4}
              direction="up"
              from={25}
              to={0}
              fade="in"
              animOnce={true}
            >
              <CtaButton href="/cv" variant="secondary">
                View CV
              </CtaButton>
            </AnimPanning>
          </div>
        </div>

        <div className="grid gap-3">
          <AnimPanning
            delay={0.4}
            duration={0.8}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
          >
            <div className={`${styles.contactCard} glass-surface`}>
              <p className="text-xs uppercase tracking-[0.28em] text-secondary">Email</p>
              <p className="mt-2 text-lg">alpsgega@gmail.com</p>
            </div>
          </AnimPanning>
          <AnimPanning
            delay={0.5}
            duration={0.8}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
          >
            <div className={`${styles.contactCard} glass-surface`}>
              <p className="text-xs uppercase tracking-[0.28em] text-secondary">Availability</p>
              <p className="mt-2 text-lg">Open to select freelance projects and full-time opportunities.</p>
            </div>
          </AnimPanning>
        </div>
      </div>

      {children}
    </section>
  );
}
