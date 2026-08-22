export type SkillRateItem = {
  skill: string;
  percent: number;
};

export type AboutData = {
  headshot: string;
  name: string;
  jobTitle: string;
  bioPrimary: string;
  bioSecondary: string;
  skills?: SkillRateItem[];
};