import { PageShell } from "@/components/page-shell";
import { getProjectBySlug, getProjects } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return {
    title: project ? project.title : "Project",
    description: project?.summary ?? "Portfolio project detail page.",
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <PageShell showSearch={false}>
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <section className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/10">
          <div className="relative min-h-[70vh]">
            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
            <p className="text-xs uppercase tracking-[0.4em] text-[#ad32ff]/80">{project.category}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              {project.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 px-2 py-10 sm:px-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white/75">
            <p className="text-xs uppercase tracking-[0.4em] text-white/45">Overview</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Case study summary</h2>
            <p className="mt-4 leading-7">
              This layout is intentionally designed so you can swap the static copy and image
              for Strapi content later without changing the routing or component structure.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white/75">
            <p className="text-xs uppercase tracking-[0.4em] text-white/45">Details</p>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-sm text-white/45">Category</dt>
                <dd className="text-base text-white">{project.category}</dd>
              </div>
              <div>
                <dt className="text-sm text-white/45">Slug</dt>
                <dd className="text-base text-white">{project.slug}</dd>
              </div>
            </dl>
          </div>
        </section>

        <Link href="/projects" className="text-sm text-white/60 transition hover:text-[#ad32ff]">
          ← Back to Projects
        </Link>
      </main>
    </PageShell>
  );
}
