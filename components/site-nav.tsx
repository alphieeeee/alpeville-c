"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type SiteNavProps = {
  showSearch?: boolean;
};

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2]">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function SiteNav({ showSearch = true }: SiteNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const aboutHref = useMemo(() => (pathname === "/" ? "#about" : "/#about"), [pathname]);
  const updateQuery = (nextQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = nextQuery.trim();
    if (trimmed) params.set("q", trimmed);
    else params.delete("q");

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.45em] text-[#ad32ff]">
            Alpeville
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            <Link href="/" className="transition hover:text-[#ad32ff]">
              Home
            </Link>
            <Link href="/projects" className="transition hover:text-[#ad32ff]">
              Projects
            </Link>
            <Link href={aboutHref} className="transition hover:text-[#ad32ff]">
              About
            </Link>
          </nav>
        </div>

        {showSearch ? (
          <form action={pathname} method="get" className="flex items-center gap-2">
            <label className="sr-only" htmlFor="gallery-search">
              Search projects
            </label>
            <input
              id="gallery-search"
              name="q"
              value={query}
              onChange={(event) => {
                const nextValue = event.target.value;
                setQuery(nextValue);
                updateQuery(nextValue);
              }}
              placeholder="Search titles, tags, or categories"
              className="w-44 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#ad32ff] sm:w-72"
            />
            <button
              type="submit"
              aria-label="Search projects"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ad32ff]/50 bg-[#ad32ff] text-black transition hover:opacity-90"
            >
              <SearchIcon />
            </button>
          </form>
        ) : null}
      </div>
    </header>
  );
}
