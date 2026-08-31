import type { ComponentPropsWithoutRef } from "react";
import ErrorState from "./ErrorState";

type SectionErrorProps = {
  sectionName: string;
  message: string;
  retryHref?: string;
} & ComponentPropsWithoutRef<"section">;

export default function SectionError({
  sectionName,
  message,
  retryHref,
  ...props
}: SectionErrorProps) {
  return (
    <ErrorState
      {...props}
      message={`${sectionName}: ${message}`}
      retryHref={retryHref}
    />
  );
}
