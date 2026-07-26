"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FILTERS, GALLERY_ITEMS, type Category } from "@/lib/gallery";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const visibleItems = useMemo(() => {
    if (activeFilter === "All") {
      return GALLERY_ITEMS;
    }

    return GALLERY_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_40%),linear-gradient(180deg,_#0a0a0f_0%,_#050507_100%)] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-red-500/15 blur-3xl" />
          <div className="absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-between gap-6 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-red-400">
                Alpeville
              </p>
              <p className="text-sm text-white/60">Streaming-inspired showcase</p>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    activeFilter === filter
                      ? "bg-white text-black"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </nav>

          <div className="mt-14 grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="mb-4 inline-flex items-center rounded-full border border-red-400/30 bg-red-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-red-300">
                Featured collection
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Discover stories with a cinematic, Netflix-style layout.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                A bold hero, quick category filters, and a poster grid designed
                to feel like a modern streaming home page while staying simple
                enough to extend.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                >
                  Play Featured
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View Details
                </button>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/45">
                Spotlight
              </p>
              <div className="mt-4 aspect-[4/5] rounded-2xl bg-gradient-to-br from-red-500 via-fuchsia-500 to-indigo-600 p-5 shadow-2xl shadow-red-500/20">
                <div className="flex h-full flex-col justify-between rounded-xl border border-white/20 bg-black/30 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                      Now streaming
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      Midnight Circuit
                    </h2>
                  </div>

                  <div className="space-y-2 text-sm text-white/75">
                    <p>Cyber-noir drama with high contrast visuals.</p>
                    <p>Trending worldwide, updated weekly, binge-ready.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Browse gallery</h2>
            <p className="mt-2 text-sm text-white/55">
              Filter the collection to surface different content types.
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 md:hidden">
            {activeFilter}
          </div>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 md:hidden">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                activeFilter === filter
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/5 text-white/70"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item, index) => (
            <Link
              href={`/titles/${item.slug}`}
              key={`${item.title}-${item.category}`}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/[0.08]"
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br ${item.accent}`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.78))]" />
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/80">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 text-sm text-white/65">
                <span>{item.year}</span>
                <span>{item.runtime}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                  ★ {item.rating}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
