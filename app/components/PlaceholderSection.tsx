import styles from "./PlaceholderSection.module.css";

type PlaceholderSectionProps = {
  title: string;
  description: string;
};

export default function PlaceholderSection({
  title,
  description,
}: PlaceholderSectionProps) {
  return (
    <section className={`${styles.card} glass-surface`}>
      <p className={styles.eyebrow}>Placeholder</p>
      <h2 className={`${styles.title} text-3xl font-semibold tracking-tight sm:text-4xl`}>
        {title}
      </h2>
      <p className={styles.description}>{description}</p>
    </section>
  );
}
