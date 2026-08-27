import CtaButton from "../components/CtaButton";
import CvAchievements from "../components/cv/CvAchievements";
import CvEducation from "../components/cv/CvEducation";
import CvExperience from "../components/cv/CvExperience";
import CvHero from "../components/cv/CvHero";
import CvHighlights from "../components/cv/CvHighlights";
import CvSkills from "../components/cv/CvSkills";
import CvSummary from "../components/cv/CvSummary";
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
        <CvHero hero={hero} />

        <div className={styles.contentGrid}>
          <div className={styles.primaryColumn}>
            <CvSummary label={cvData.summaryLabel} summary={cvData.summary} />
            <CvExperience label={cvData.rolesLabel} roles={roles} />
          </div>

          <aside className={styles.sidebar}>
            <CvSkills label={cvData.skillsLabel} skills={skills} />
            <CvHighlights label={cvData.highlightsLabel} highlights={highlights} />
            <CvEducation label={cvData.educationLabel} education={education} />
            <CvAchievements
              label={cvData.achievementsLabel}
              achievements={achievements}
            />
          </aside>
        </div>
      </article>
    </main>
  );
}
