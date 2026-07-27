import { GallerySection } from "@/components/gallery-section";
import { PageShell } from "@/components/page-shell";
import { getProjects } from "@/lib/content";
import { filterProjects } from "@/lib/filterProjects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Alpeville",
  description: "Browse all portfolio projects in a clean thumbnail gallery.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const projects = await getProjects();
  const resolvedSearchParams = (await searchParams) ?? {};
  const query = resolvedSearchParams.q ?? "";
  const filtered = filterProjects(projects, query);

  return (
    <PageShell>
      <main className="min-h-[calc(100vh-8rem)]">
        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Projects</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Thumbnail gallery for all portfolio work
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
            This page keeps the gallery in a pure grid layout so employers and clients can
            scan your work fast without the slider.
          </p>
        </section>
        <GallerySection items={filtered} mode="grid" title={query ? `Results for "${query}"` : "All Projects"} />
      </main>
    </PageShell>
  );
}
