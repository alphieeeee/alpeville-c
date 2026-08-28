import type { NavItem } from "../types/navigation";

export const navItems: NavItem[] = [
  { label: "Home", href: "/", target: "home", isSection: true },
  { label: "About", href: "/#about", target: "about", isSection: true },
  { label: "Work", href: "/#work", target: "work", isSection: true },
  {
    label: "Certifications",
    href: "/#certifications",
    target: "certifications",
    isSection: true,
  },
  {
    label: "Experience",
    href: "/#experience",
    target: "experience",
    isSection: true,
  },
  { label: "Contact", href: "/#contact", target: "contact", isSection: true },
  { label: "CV", href: "/cv" },
];
