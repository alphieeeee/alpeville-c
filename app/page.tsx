import CtaButton from "./components/CtaButton";
import AboutSection from "./components/home/AboutSection";
import CertificationsSection from "./components/home/CertificationsSection";
import ContactSection from "./components/home/ContactSection";
import ExperienceSection from "./components/home/ExperienceSection";
import HomeHero from "./components/home/HomeHero";
import WorkSection from "./components/home/WorkSection";
import WhatIDoSection from "./components/home/WhatIDoSection";

import { getHomeHeroData } from "../lib/api/home/service";
import { getAboutData } from "../lib/api/about/service";
import { getWhatIdoData } from "../lib/api/whatido/service";
import { getCertificationsData } from "../lib/api/certifications/service";
import { getExperienceData } from "../lib/api/experience/service";
import { getWorkData } from "../lib/api/work/service";

export default async function Home() {
  const heroData = await getHomeHeroData();
  const aboutData = getAboutData();
  const whatIdoData = getWhatIdoData();
  const workData = await getWorkData();
  const certificationsData = await getCertificationsData();
  const experienceData = await getExperienceData();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-10">
      <HomeHero id="home" heroData={heroData} />
      <AboutSection
        id="about"
        aboutData={aboutData}
      />

      <WhatIDoSection
        id="what-i-do"
        whatIdoData={whatIdoData}
      />

      <WorkSection
        id="work"
        workData={workData}
      />

      <CertificationsSection
        id="certifications"
        certificationsData={certificationsData}
      />

      <ExperienceSection
        id="experience"
        experienceData={experienceData}
      />

      <ContactSection
        id="contact"
      />

      <div className="flex justify-start">
        <CtaButton href="#home" variant="secondary">
          Back to Top
        </CtaButton>
      </div>
    </main>
  );
}
