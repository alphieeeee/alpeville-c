type PlaceholderSectionProps = {
  title: string;
  description: string;
};

export default function PlaceholderSection({
  title,
  description,
}: PlaceholderSectionProps) {
  return (
    <section className="glass-surface rounded-3xl p-8">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-secondary">
        Placeholder
      </p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/75">
        {description}
      </p>
    </section>
  );
}
