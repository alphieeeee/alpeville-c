import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryItemBySlug } from "@/lib/gallery";

type TitlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TitlePage({ params }: TitlePageProps) {
  const { slug } = await params;
  const item = getGalleryItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_40%),linear-gradient(180deg,_#0a0a0f_0%,_#050507_100%)] text-white">
      <section className="mx-auto max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >
          ← Back to home
        </Link>

        <article className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-7">
          <div
            className={`relative aspect-[16/8] overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${item.accent}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.82))]" />
            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/80">
              {item.category}
            </div>
            <div className="absolute inset-x-5 bottom-5 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                Single page detail
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                {item.title}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                {item.tagline}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/45">
                Overview
              </p>
              <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">
                {item.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Year
                </p>
                <p className="mt-2 text-lg font-semibold">{item.year}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Runtime
                </p>
                <p className="mt-2 text-lg font-semibold">{item.runtime}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Rating
                </p>
                <p className="mt-2 text-lg font-semibold">★ {item.rating}</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
