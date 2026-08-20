import PlaceholderSection from "../components/PlaceholderSection";

export default function CVPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full">
        <PlaceholderSection
          title="CV"
          description="CV route placeholder. This page will later render the downloadable resume or an embedded version."
        />
      </div>
    </main>
  );
}
