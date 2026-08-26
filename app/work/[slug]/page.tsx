import { notFound } from "next/navigation";
import CtaButton from "../../components/CtaButton";
import WorkDetails from "../../components/work/WorkDetails";
import WorkHero from "../../components/work/WorkHero";
import { getWorkBySlug } from "../../../lib/api/work/service";

type WorkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = await getWorkBySlug(slug);

  if (!project) notFound();

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
