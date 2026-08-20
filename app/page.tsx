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

export default function Home() {
  const heroData = getHomeHeroData();
  const aboutData = getAboutData();
  const whatIdoData = getWhatIdoData();
  const workData = getWorkData();
  const certificationsData = getCertificationsData();
  const experienceData = getExperienceData();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 sm:px-6 lg:px-8">
      <HomeHero id="home" heroData={heroData} />
      <AboutSection
        id="about"
        aboutData={aboutData}
        className="rounded-3xl p-8 sm:p-10"
      />

      <WhatIDoSection
        id="what-i-do"
        whatIdoData={whatIdoData}
        className="rounded-3xl p-8 sm:p-10"
      />

      <WorkSection
        id="work"
        workData={workData}
        className="rounded-3xl p-8 sm:p-10"
      />

      <CertificationsSection
        id="certifications"
        certificationsData={certificationsData}
        className="rounded-3xl p-8 sm:p-10"
      />

      <ExperienceSection
        id="experience"
        experienceData={experienceData}
        className="rounded-3xl p-8 sm:p-10"
      />

      <ContactSection
        id="contact"
        className="rounded-3xl p-8 sm:p-10"
      />

      <div className="flex justify-start">
        <CtaButton href="#home" variant="secondary">
          Back to Top
        </CtaButton>
      </div>
    </main>
  );
}
