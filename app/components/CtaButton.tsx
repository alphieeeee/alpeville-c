"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import styles from "./CtaButton.module.css";

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother);

type CtaButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children"> & {
  children: ReactNode;
};

export default function CtaButton({
  href,
  children,
  variant = "primary",
  external = false,
  id,
  className = "",
  style,
  ...props
}: CtaButtonProps) {
  const buttonClassName =
    `${styles.base} ${variant === "primary" ? styles.primary : styles.secondary} ${className}`.trim();

  const handleScrollClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    const target = href.slice(1);

    if (!target) return;

    const targetElement = document.getElementById(target);
    const headerHeight =
      document.querySelector<HTMLElement>("#header-divider")?.clientHeight ?? 0;
    const smoother = ScrollSmoother.get();

    if (targetElement && smoother) {
      const destination =
        targetElement.getBoundingClientRect().top + smoother.scrollTop() - headerHeight;
      smoother.scrollTo(destination, true);
      return;
    }

    gsap.to(window, {
      duration: 0.9,
      scrollTo: {
        y: `#${target}`,
        offsetY: headerHeight,
      },
      ease: "power2.out",
    });
  };

  if (external) {
    return (
      <a {...props} href={href} id={id} style={style} target="_blank" rel="noreferrer" className={buttonClassName}>
        {children}
      </a>
    );
  }

  return (
    <Link {...props} href={href} id={id} style={style} className={buttonClassName} onClick={handleScrollClick}>
      {children}
    </Link>
  );
}
