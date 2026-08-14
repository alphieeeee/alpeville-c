import PlaceholderSection from "../../components/site/PlaceholderSection";

type WorkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full">
        <PlaceholderSection
          title={`Work project: ${slug}`}
          description="Project detail route placeholder for future Strapi-driven case studies and structured data."
        />
      </div>
    </main>
  );
}
