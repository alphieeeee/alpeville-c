"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import styles from "./CtaButton.module.css";

gsap.registerPlugin(ScrollToPlugin);

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export default function CtaButton({
  href,
  children,
  variant = "primary",
  external = false,
}: CtaButtonProps) {
  const className =
    `${styles.base} ${variant === "primary" ? styles.primary : styles.secondary}`;

  const handleScrollClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    const target = href.slice(1);

    if (!target) return;

    gsap.to(window, {
      duration: 0.9,
      scrollTo: {
        y: `#${target}`,
        offsetY: document.querySelector<HTMLElement>("#header-divider")?.clientHeight ?? 0,
      },
      ease: "power2.out",
    });
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleScrollClick}>
      {children}
    </Link>
  );
}
