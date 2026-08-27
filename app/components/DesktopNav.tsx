"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { navItems } from "../data/navigation";
import type { NavItem } from "../types/navigation";

type DesktopNavProps = {
  onNavigate: (item: NavItem) => void;
  activeHref: string;
} & ComponentPropsWithoutRef<"div">;

export default function DesktopNav({
  onNavigate,
  activeHref,
  id,
  className = "",
  style,
  children,
  ...props
}: DesktopNavProps) {
  const logo = (
    <Link
      href="/"
      className={`text-lg font-semibold tracking-[0.28em] uppercase transition-colors hover:text-secondary ${
        activeHref === "/" ? "text-secondary" : "text-foreground"
      }`}
    >
      Alpeville
    </Link>
  );

  return (
    <div {...props} id={id} style={style} className={`hidden w-full items-center justify-between lg:flex ${className}`.trim()}>
      {logo}

      <nav aria-label="Primary" className="flex items-center gap-5 text-sm">
        {navItems.map((item) => (
          <button
            key={item.href}
            type="button"
            onClick={() => onNavigate(item)}
            className={`transition-colors focus-visible:text-secondary ${
              activeHref === item.href
                ? "text-secondary"
                : "text-foreground/80 hover:text-secondary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      {children}
    </div>
  );
}
