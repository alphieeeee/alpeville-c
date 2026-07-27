import { HeroBanner } from "@/components/hero-banner";
import { GallerySection } from "@/components/gallery-section";
import { PageShell } from "@/components/page-shell";
import { getProjects } from "@/lib/content";
import { filterProjects } from "@/lib/filterProjects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alpeville | Frontend Portfolio",
  description:
    "A Netflix-inspired frontend portfolio for showcasing projects to employers and clients.",
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const projects = await getProjects();
  const resolvedSearchParams = (await searchParams) ?? {};
  const query = resolvedSearchParams.q ?? "";
  const filtered = filterProjects(projects, query);
  const showHero = !query.trim();

  return (
    <PageShell>
      {showHero ? <HeroBanner /> : null}
      <main>
        <GallerySection items={filtered} mode={showHero ? "slider" : "grid"} title={query ? `Results for "${query}"` : "Featured Projects"} />
      </main>
    </PageShell>
  );
}
