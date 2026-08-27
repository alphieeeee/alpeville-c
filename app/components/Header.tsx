"use client";

import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { usePathname, useRouter } from "next/navigation";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { navItems } from "../data/navigation";

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother);

function useHeaderScrollState() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
}

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);
}

type HeaderProps = ComponentPropsWithoutRef<"header">;

export default function Header({
  id = "header",
  className = "",
  style,
  children,
  ...props
}: HeaderProps) {
  const isScrolled = useHeaderScrollState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");
  const pathname = usePathname();
  const router = useRouter();
  const activeHref = pathname === "/" ? activeSection : pathname;

  useLockBodyScroll(isMenuOpen);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = navItems
      .filter((item) => item.isSection && item.target)
      .map((item) => item.target as string);

    const observers = sections
      .map((section) => document.getElementById(section))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!observers.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (!visibleEntry) return;
        setActiveSection(`#${visibleEntry.target.id}`);
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0.1,
      }
    );

    observers.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  const goToSection = (target: string, index: number, navLength: number) => {
    const targetElement = document.getElementById(target);
    if (!targetElement) return;

    const headerHeight =
      index === navLength ? 0 : document.querySelector<HTMLElement>("#header-divider")?.clientHeight ?? 0;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      const destination =
        targetElement.getBoundingClientRect().top + smoother.scrollTop() - headerHeight;
      smoother.scrollTo(destination, true);
      return;
    }

    gsap.to(window, {
      duration: 0.1,
      scrollTo: {
        y: `#${target}`,
        offsetY: headerHeight,
      },
      ease: "none",
    });
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const target = window.location.hash.slice(1);
    if (!target) return;

    const frame = window.requestAnimationFrame(() => {
      const itemIndex = navItems.findIndex((item) => item.target === target);
      setActiveSection(`#${target}`);
      goToSection(target, itemIndex, navItems.length);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const handleNavigate = (itemIndex: number) => {
    const item = navItems[itemIndex];
    setIsMenuOpen(false);

    if (item.isSection && item.target) {
      const targetHref = `/#${item.target}`;

      if (pathname !== "/") {
        window.location.assign(targetHref);
        return;
      }

      if (window.location.hash !== `#${item.target}`) {
        window.history.pushState(null, "", targetHref);
      }

      setActiveSection(`#${item.target}`);
      goToSection(item.target, itemIndex, navItems.length);
      return;
    }

    router.push(item.href);
  };

  return (
    <header
      {...props}
      id={id}
      style={style}
      className={`fixed top-0 w-full z-50 ${
        isScrolled && !isMenuOpen
          ? "glass-shell bg-background/55 shadow-[0_16px_48px_rgba(0,0,0,0.22)]"
          : ""
      } ${className}`.trim()}
    >
      <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
        <DesktopNav
          activeHref={activeHref}
          onNavigate={(item) => handleNavigate(navItems.indexOf(item))}
        />
        <MobileNav
          isOpen={isMenuOpen}
          activeHref={activeHref}
          onToggle={() => setIsMenuOpen((value) => !value)}
          onNavigate={(item) => handleNavigate(navItems.indexOf(item))}
        />
      </div>
      {children}
    </header>
  );
}
