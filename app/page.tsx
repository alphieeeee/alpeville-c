import CtaButton from "./components/CtaButton";
import AboutSection from "./components/home/AboutSection";
import CertificationsSection from "./components/home/CertificationsSection";
import ContactSection from "./components/home/ContactSection";
import ExperienceSection from "./components/home/ExperienceSection";
import HomeHero from "./components/home/HomeHero";
import ErrorState from "./components/ErrorState";
import SectionError from "./components/SectionError";
import WorkSection from "./components/home/WorkSection";
import WhatIDoSection from "./components/home/WhatIDoSection";
import Animated3DChar from "./components/Animated3DChar";
import HomePreloader from "./components/HomePreloader";

import { getHomeHeroData } from "../lib/api/home/service";
import { getAboutData } from "../lib/api/about/service";
import { getWhatIdoData } from "../lib/api/whatido/service";
import { getCertificationsData } from "../lib/api/certifications/service";
import { getExperienceData } from "../lib/api/experience/service";
import { getWorkData } from "../lib/api/work/service";
import AnimPanning from "./components/gsap/AnimPanning";

export default async function Home() {
  const [
    heroResult,
    aboutResult,
    whatIdoResult,
    workResult,
    certificationsResult,
    experienceResult,
  ] = await Promise.all([
    getHomeHeroData(),
    getAboutData(),
    getWhatIdoData(),
    getWorkData(),
    getCertificationsData(),
    getExperienceData(),
  ]);

  if (heroResult.error) {
    return (
      <>
        <HomePreloader />
        <Animated3DChar />
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-10">
          <ErrorState message={heroResult.error.message} retryHref="/" />
        </main>
      </>
    );
  }

  return (
    <>
      <HomePreloader />
      <Animated3DChar />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-10">
      <HomeHero id="home" heroData={heroResult.data} />

      {aboutResult.data ? (
        <AboutSection id="about" aboutData={aboutResult.data} />
      ) : aboutResult.error ? (
        <SectionError
          sectionName="About"
          message={aboutResult.error.message}
          retryHref="/"
        />
      ) : null}

      {whatIdoResult.data?.length ? (
        <WhatIDoSection id="what-i-do" whatIdoData={whatIdoResult.data} />
      ) : whatIdoResult.error ? (
        <SectionError
          sectionName="What I Do"
          message={whatIdoResult.error.message}
          retryHref="/"
        />
      ) : null}

      {workResult.data?.length ? (
        <WorkSection id="work" workData={workResult.data} />
      ) : workResult.error ? (
        <SectionError
          sectionName="Projects"
          message={workResult.error.message}
          retryHref="/"
        />
      ) : null}

      {certificationsResult.data?.length ? (
        <CertificationsSection
          id="certifications"
          certificationsData={certificationsResult.data}
        />
      ) : certificationsResult.error ? (
        <SectionError
          sectionName="Certifications"
          message={certificationsResult.error.message}
          retryHref="/"
        />
      ) : null}

      {experienceResult.data?.length ? (
        <ExperienceSection
          id="experience"
          experienceData={experienceResult.data}
        />
      ) : experienceResult.error ? (
        <SectionError
          sectionName="Experience"
          message={experienceResult.error.message}
          retryHref="/"
        />
      ) : null}

      <ContactSection
        id="contact"
      />

      <div className="flex justify-start">
        <AnimPanning
          duration={0.4}
          direction="up"
          from={25}
          to={0}
          fade="in"
          animOnce={true}
        >
          <CtaButton href="#home" variant="secondary">
            Back to Top
          </CtaButton>
        </AnimPanning>
      </div>
      </main>
    </>
  );
}
