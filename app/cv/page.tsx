import type { Metadata } from "next";
import CtaButton from "../components/CtaButton";
import ErrorState from "../components/ErrorState";
import CvAchievements from "../components/cv/CvAchievements";
import CvEducation from "../components/cv/CvEducation";
import CvExperience from "../components/cv/CvExperience";
import CvHero from "../components/cv/CvHero";
import CvHighlights from "../components/cv/CvHighlights";
import CvSkills from "../components/cv/CvSkills";
import CvSummary from "../components/cv/CvSummary";
import { getCvData } from "../../lib/api/cv/service";
import styles from "./page.module.css";
import AnimPanning from "../components/gsap/AnimPanning";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description:
    "View Alpeville's professional experience, skills, education, and achievements.",
  openGraph: {
    title: "Curriculum Vitae",
    description:
      "View Alpeville's professional experience, skills, education, and achievements.",
    url: "/cv",
  },
};

export default async function CVPage() {
  const { data: cvData, error } = await getCvData();

  if (error || !cvData) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-10">
        <CtaButton href="/" variant="secondary">
          Back
        </CtaButton>
        <ErrorState
          message={error?.message ?? "CV data is currently unavailable."}
          retryHref="/cv"
        />
      </main>
    );
  }

  const { hero, roles, skills, highlights, education, achievements } = cvData;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-10">
      <div>
        <AnimPanning
          duration={0.4}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
          onScroll={false}
        >
          <CtaButton href="/" variant="secondary">
            Back
          </CtaButton>
        </AnimPanning>
      </div>
      <AnimPanning
        delay={0.2}
        duration={0.8}
        direction="up"
        from={0}
        to={0}
        fade="in"
        animOnce={true}
        onScroll={false}
      >
      <article className={styles.cv}>
        {hero ? <CvHero hero={hero} /> : null}

        <div className={styles.contentGrid}>
          <div className={styles.primaryColumn}>
            {cvData.summary.trim() ? (
              <CvSummary label={cvData.summaryLabel} summary={cvData.summary} />
            ) : null}
            {roles.length > 0 ? (
              <CvExperience label={cvData.rolesLabel} roles={roles} />
            ) : null}
          </div>

          <aside className={styles.sidebar}>
            {skills.length > 0 ? (
              <CvSkills label={cvData.skillsLabel} skills={skills} />
            ) : null}
            {highlights.length > 0 ? (
              <CvHighlights label={cvData.highlightsLabel} highlights={highlights} />
            ) : null}
            {education.length > 0 ? (
              <CvEducation label={cvData.educationLabel} education={education} />
            ) : null}
            {achievements.length > 0 ? (
              <CvAchievements
                label={cvData.achievementsLabel}
                achievements={achievements}
              />
            ) : null}
          </aside>
        </div>
      </article>
      </AnimPanning>
    </main>
  );
}
