import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

type FooterProps = ComponentPropsWithoutRef<"footer">;

export default function Footer({
  id,
  className = "",
  style,
  children,
  ...props
}: FooterProps) {
  return (
    <footer {...props} id={id} style={style} className={`mt-auto border-t border-border/60 ${className}`.trim()}>
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-foreground/65 sm:px-6 lg:px-8">
        <p>
          Copyright © 2026 Alpeville Carinan. Built with code, motion, and a
          little too much coffee.
        </p>
        <p className="mt-2 text-xs text-foreground/50">
          Fan-made project · Not affiliated with or endorsed by Nintendo. {" "}
          <Link href="/credits" className="underline decoration-secondary/60 underline-offset-4 transition-colors hover:text-secondary focus-visible:text-secondary">
            Credits
          </Link>
        </p>
        {children}
      </div>
    </footer>
  );
}
