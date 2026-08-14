"use client";

import Link from "next/link";
import type { NavItem } from "./navTypes";
import { navItems } from "./navTypes";

type DesktopNavProps = {
  onNavigate: (item: NavItem) => void;
  activeHref: string;
};

export default function DesktopNav({ onNavigate, activeHref }: DesktopNavProps) {
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
    <div className="hidden w-full items-center justify-between lg:flex">
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
    </div>
  );
}
