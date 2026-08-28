export type WorkCard = {
  slug: string;
  title: string;
  type: string;
  thumbSrc: string;
  thumbAlt?: string;
  imgSrc: string;
  imgAlt?: string;
  summary: string;
  tools: string[];
  link?: string;
};
