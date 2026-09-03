import type { Metadata } from "next";
import { checkStrapiHealth } from "@/lib/api/strapi/service";

export const metadata: Metadata = {
  title: "Health",
  description: "Internal API health check for the Alpeville portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function HealthPage() {
  const data = await checkStrapiHealth();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 px-5 py-10 sm:px-10">
      <section className="glass-surface w-full rounded-3xl p-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-secondary">
          Health Check
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          API status
        </h2>
        <pre className="mt-6 overflow-x-auto rounded-2xl border border-border bg-background/80 p-4 text-sm text-foreground/80">
          {JSON.stringify(data, null, 2)}
        </pre>
      </section>
    </main>
  );
}
