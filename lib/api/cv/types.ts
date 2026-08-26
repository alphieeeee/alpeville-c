export type CvLink = {
  href: string;
  label: string;
};

export type CvHero = {
  eyebrow: string;
  name: string;
  role: string;
  location: string;
  contact: string;
  links: CvLink[];
};

export type CvRole = {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
};

export type CvSkill = {
  category: string;
  skills: string;
};

export type CvEducation = {
  degree: string;
  school: string;
  period: string;
};

export type CvData = {
  hero: CvHero;
  summaryLabel: string;
  summary: string;
  rolesLabel: string;
  roles: CvRole[];
  skillsLabel: string;
  skills: CvSkill[];
  highlightsLabel: string;
  highlights: string[];
  educationLabel: string;
  education: CvEducation[];
  achievementsLabel: string;
  achievements: string[];
};
