import { SiteNav } from "@/components/site-nav";
import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  showSearch?: boolean;
};

export function PageShell({ children, showSearch = true }: PageShellProps) {
  return (
    <div className="min-h-screen bg-black text-[#ad32ff]">
      <SiteNav showSearch={showSearch} />
      {children}
      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs uppercase tracking-[0.35em] text-white/40">
        Built for modern portfolio storytelling
      </footer>
    </div>
  );
}
