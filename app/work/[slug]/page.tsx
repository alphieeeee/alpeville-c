import { notFound } from "next/navigation";
import CtaButton from "../../components/CtaButton";
import ErrorState from "../../components/ErrorState";
import WorkDetails from "../../components/work/WorkDetails";
import WorkHero from "../../components/work/WorkHero";
import { getWorkBySlug } from "../../../lib/api/work/service";

type WorkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const result = await getWorkBySlug(slug);

  if (result.error?.status === 404 || (!result.data && !result.error)) {
    notFound();
  }

  if (result.error || !result.data) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-10">
        <CtaButton href="/" variant="secondary">
          Back
        </CtaButton>
        <ErrorState
          message={result.error?.message ?? "This project is currently unavailable."}
          retryHref={`/work/${slug}`}
        />
      </main>
    );
  }

  const project = result.data;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-10">
      <div>
        <CtaButton href="/" variant="secondary">
          Back
        </CtaButton>
      </div>
      <WorkHero project={project} />
      <WorkDetails project={project} />
    </main>
  );
}
