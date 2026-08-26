import CtaButton from "../components/CtaButton";
import { getCvData } from "../../lib/api/cv/service";
import styles from "./page.module.css";

export default async function CVPage() {
  const cvData = await getCvData();
  const { hero, roles, skills, highlights, education, achievements } = cvData;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-10">
      <div>
        <CtaButton href="/" variant="secondary">
          Back
        </CtaButton>
      </div>

      <article className={styles.cv}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>{hero.eyebrow}</p>
            <h1 className={styles.name}>{hero.name}</h1>
            <p className={styles.role}>{hero.role}</p>
            <p className={styles.location}>{hero.location}</p>
          </div>
          <div className={styles.contact}>
            {hero.contact ? <p className={styles.muted}>{hero.contact}</p> : null}
            {hero.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </header>

        <div className={styles.contentGrid}>
          <div className={styles.primaryColumn}>
            <section className={styles.section}>
              <p className={styles.sectionLabel}>{cvData.summaryLabel}</p>
              <p className={styles.summary}>{cvData.summary}</p>
            </section>

            <section className={styles.section}>
              <p className={styles.sectionLabel}>{cvData.rolesLabel}</p>
              <div className={styles.experienceList}>
                {roles.map((role) => (
                  <article className={styles.experience} key={`${role.company}-${role.title}`}>
                    <h2>{role.title}</h2>
                    <p className={styles.company}>{role.company} <span>|</span> {role.dates}</p>
                    <ul className={styles.experienceBullets}>
                      {role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <section className={styles.section}>
              <p className={styles.sectionLabel}>{cvData.skillsLabel}</p>
              <dl className={styles.skills}>
                {skills.map((skill) => (
                  <div key={skill.category}>
                    <dt>{skill.category}</dt>
                    <dd>{skill.skills}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className={styles.section}>
              <p className={styles.sectionLabel}>{cvData.highlightsLabel}</p>
              <ul className={styles.compactList}>
                {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </section>

            <section className={styles.section}>
              <p className={styles.sectionLabel}>{cvData.educationLabel}</p>
              {education.map((item) => (
                <div key={`${item.degree}-${item.school}`}>
                  <h2 className={styles.educationTitle}>{item.degree}</h2>
                  <p className={styles.muted}>{item.school}</p>
                  <p className={styles.muted}>{item.period}</p>
                </div>
              ))}
            </section>

            <section className={styles.section}>
              <p className={styles.sectionLabel}>{cvData.achievementsLabel}</p>
              {achievements.map((achievement) => (
                <p className={styles.muted} key={achievement}>{achievement}</p>
              ))}
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
