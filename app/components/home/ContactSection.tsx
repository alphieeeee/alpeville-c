import type { ComponentPropsWithoutRef, ReactNode } from "react";
import CtaButton from "../CtaButton";
import SectionHeading from "../SectionHeading";

type ContactSectionBaseProps = ComponentPropsWithoutRef<"section">;

type ContactSectionProps = {
  id?: string;
  className?: string;
  children?: ReactNode;
} & ContactSectionBaseProps;

export default function ContactSection({
  id,
  className = "",
  children,
  ...props
}: ContactSectionProps) {
  return (
    <section {...props} id={id} className={`${className}`.trim()}>
      <SectionHeading title="Contact" />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div className="space-y-4">
          <p className="copy-base max-w-2xl text-foreground/75">
            I’m available for frontend, creative development, and motion-led web projects. This block is intentionally simple so it can later bind to contactEmail and socialLinks from Strapi.
          </p>
          <div className="flex flex-wrap gap-3">
            <CtaButton href="mailto:hello@alpeville.com">Email Me</CtaButton>
            <CtaButton href="/cv" variant="secondary">
              View CV
            </CtaButton>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-3xl border border-border bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-secondary">Email</p>
            <p className="mt-2 text-lg">hello@alpeville.com</p>
          </div>
          <div className="rounded-3xl border border-border bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-secondary">Availability</p>
            <p className="mt-2 text-lg">Open for select freelance and full-time roles</p>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}

