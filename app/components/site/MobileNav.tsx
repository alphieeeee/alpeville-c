"use client";

import Link from "next/link";
import type { NavItem } from "./navTypes";
import { navItems } from "./navTypes";

type MobileNavProps = {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (item: NavItem) => void;
  activeHref: string;
};

export default function MobileNav({
  isOpen,
  onToggle,
  onNavigate,
  activeHref,
}: MobileNavProps) {
  return (
    <div className="flex w-full items-center justify-between lg:hidden">
      <Link
        href="/"
        className={`text-lg font-semibold tracking-[0.28em] uppercase transition-colors hover:text-secondary ${
          activeHref === "/" ? "text-secondary" : "text-foreground"
        }`}
        onClick={() => {
          if (isOpen) onToggle();
        }}
      >
        Alpeville
      </Link>

      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full border border-border bg-background/30 p-3 text-foreground transition-colors hover:border-secondary hover:text-secondary z-50"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              isOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5 rotate-0"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              isOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5 rotate-0"
            }`}
          />
        </span>
      </button>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          className="absolute inset-0 bg-background/45 backdrop-blur-xl"
          onClick={onToggle}
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <nav
            aria-label="Mobile primary"
            className="glass-shell flex w-full max-w-sm flex-col items-center gap-4 rounded-[2rem] p-8 text-center"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => onNavigate(item)}
                className={`text-lg font-medium transition-colors ${
                  activeHref === item.href
                    ? "text-secondary"
                    : "text-foreground/85 hover:text-secondary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
