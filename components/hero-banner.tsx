import Image from "next/image";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=2200&q=80"
          alt="Abstract hero showcase for a Netflix-style portfolio"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-end px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#ad32ff]/80">
            Senior Frontend Portfolio
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Cinematic UI for employers, clients, and bold products.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            A Netflix-inspired portfolio that turns projects into a high-impact gallery,
            with smooth search, responsive rails, and single-project pages.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Browse Projects
            </Link>
            <a
              href="#about"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/30"
            >
              About My Work
            </a>
          </div>
          <p className="mt-8 max-w-md text-sm uppercase tracking-[0.35em] text-white/50">
            Designed to be swapped with hero video later
          </p>
        </div>
      </div>
    </section>
  );
}
