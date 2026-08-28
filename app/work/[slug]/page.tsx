import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getWorkBySlug(slug);

  if (!result.data) {
    return {
      title: "Project not found",
      description: "The requested project could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const project = result.data;
  const description =
    project.summary || `${project.title} project by Alpeville.`;
  const imageUrl = project.imgSrc || "/og-image.png";
  const imageAlt = project.imgAlt || `${project.title} hero image`;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: project.title,
      description,
      siteName: "Alpeville",
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [imageUrl],
    },
  };
}

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
