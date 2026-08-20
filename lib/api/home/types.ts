export type HomeHeroCta = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export type HomeHeroData = {
  eyebrow: string;
  name: string;
  lead: string;
  ctas: HomeHeroCta[];
};