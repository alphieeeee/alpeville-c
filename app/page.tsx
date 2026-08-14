import PlaceholderSection from "./components/site/PlaceholderSection";

const homeSections = [
  {
    id: "about",
    title: "About",
    description: "About section placeholder for the single-page portfolio home.",
  },
  {
    id: "work",
    title: "Work",
    description: "Work gallery placeholder for future Strapi project cards.",
  },
  {
    id: "certifications",
    title: "Certifications",
    description: "Certifications section placeholder for future credential data.",
  },
  {
    id: "experience",
    title: "Experience",
    description: "Experience section placeholder for timeline content.",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Contact section placeholder for email and social links.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 sm:px-6 lg:px-8">
      <section className="glass-surface min-h-[85vh] min-h-[85dvh] flex flex-col justify-center rounded-3xl p-10">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-secondary">
          Portfolio Skeleton
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          A deploy-ready shell for the 3D portfolio.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/75">
          This scaffold keeps the GSAP setup intact, adds the route structure,
          and prepares the app for Strapi-driven content later.
        </p>
      </section>

      <div className="grid gap-6">
        {homeSections.map((section) => (
          <div key={section.id} id={section.id}>
            <PlaceholderSection
              title={section.title}
              description={section.description}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
