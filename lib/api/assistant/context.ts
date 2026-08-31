import { getAboutData } from "../about/service";
import { getCertificationsData } from "../certifications/service";
import { getExperienceData } from "../experience/service";
import { getHomeHeroData } from "../home/service";
import { getWhatIdoData } from "../whatido/service";
import { getWorkData } from "../work/service";

const contactInformation = {
  email: "alpsgega@gmail.com",
  availability: "Open to select freelance projects and full-time opportunities.",
};

export async function getPortfolioAssistantContext(): Promise<string> {
  const [hero, about, whatIdo, work, certifications, experience] =
    await Promise.all([
      getHomeHeroData(),
      getAboutData(),
      getWhatIdoData(),
      getWorkData(),
      getCertificationsData(),
      getExperienceData(),
    ]);

  // JSON keeps the context structured while ensuring only data rendered by the
  // portfolio is passed to the model.
  return JSON.stringify(
    {
      hero: hero.data,
      about: about.data,
      services: whatIdo.data,
      projects: work.data,
      certifications: certifications.data,
      experience: experience.data,
      contact: contactInformation,
    },
    null,
    2,
  );
}
