import { fetchStrapiJson } from "../strapi/client";
import { strapiEndpoints } from "../strapi/endpoints";
import cvMock from "./mock";
import type {
  CvData,
  CvEducation,
  CvHero,
  CvLink,
  CvRole,
  CvSkill,
} from "./types";

type StrapiSection = {
  __component?: string;
  attributes?: Record<string, unknown>;
  [key: string]: unknown;
};

type StrapiCvResponse = {
  data:
    | {
        Sections?: StrapiSection[];
        sections?: StrapiSection[];
      }
    | {
        attributes: {
          Sections?: StrapiSection[];
          sections?: StrapiSection[];
        };
      };
};

type ObjectFields = Record<string, unknown>;

function isObject(value: unknown): value is ObjectFields {
  return typeof value === "object" && value !== null;
}

// Strapi 4 nests fields in attributes. Strapi 5 returns them directly.
function getObjectFields(value: unknown): ObjectFields {
  if (!isObject(value)) {
    return {};
  }

  return isObject(value.attributes) ? value.attributes : value;
}

function getPageFields(response: StrapiCvResponse) {
  if ("attributes" in response.data) {
    return response.data.attributes;
  }

  return response.data;
}

function getSectionFields(section: StrapiSection): StrapiSection {
  return getObjectFields(section);
}

function getSections(response: StrapiCvResponse): StrapiSection[] {
  const page = getPageFields(response);
  return page.Sections ?? page.sections ?? [];
}

function getSection(
  sections: StrapiSection[],
  componentName: string
): StrapiSection | undefined {
  return sections.find((section) => section.__component === componentName);
}

function getString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function parseJson(value: unknown): unknown {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function getStringArray(value: unknown): string[] {
  const parsedValue = parseJson(value);

  if (!Array.isArray(parsedValue)) {
    return [];
  }

  return parsedValue.filter(
    (item): item is string => typeof item === "string"
  );
}

function getBlockText(block: unknown): string {
  if (!block || typeof block !== "object") {
    return "";
  }

  if ("text" in block && typeof block.text === "string") {
    return block.text;
  }

  if ("children" in block && Array.isArray(block.children)) {
    return block.children.map(getBlockText).join("");
  }

  return "";
}

function getBlocksText(value: unknown): string {
  const parsedValue = parseJson(value);

  if (typeof parsedValue === "string") {
    return parsedValue;
  }

  if (!Array.isArray(parsedValue)) {
    return "";
  }

  return parsedValue.map(getBlockText).filter(Boolean).join("\n\n");
}

function getLinks(value: unknown): CvLink[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const fields = getObjectFields(item);

    if (!("href" in fields) || !("label" in fields)) {
      return [];
    }

    const href = getString(fields.href);
    const label = getString(fields.label);

    return href && label ? [{ href, label }] : [];
  });
}

function getRoles(value: unknown): CvRole[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const fields = getObjectFields(item);

    const title = getString("title" in fields ? fields.title : "");
    const company = getString("company" in fields ? fields.company : "");
    const period = getString("period" in fields ? fields.period : "");
    const bullets = getStringArray("bullets" in fields ? fields.bullets : []);

    return title || company ? [{ title, company, dates: period, bullets }] : [];
  });
}

function getSkills(value: unknown): CvSkill[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (Array.isArray(item) && item.length >= 2) {
      const category = getString(item[0]);
      const skills = getString(item[1]);
      return category && skills ? [{ category, skills }] : [];
    }

    if (item && typeof item === "object") {
      const category = "category" in item
        ? getString(item.category)
        : "label" in item
          ? getString(item.label)
          : "";
      const skills = "skills" in item
        ? getString(item.skills)
        : "value" in item
          ? getString(item.value)
          : "";

      return category && skills ? [{ category, skills }] : [];
    }

    return [];
  });
}

function getEducation(value: unknown): CvEducation[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const fields = getObjectFields(item);

    const degree = "degree" in fields ? getString(fields.degree) : "";
    const school = "school" in fields ? getString(fields.school) : "";
    const period = "period" in fields ? getString(fields.period) : "";

    return degree || school ? [{ degree, school, period }] : [];
  });
}

function getHero(section?: StrapiSection): CvHero {
  const fields = section ? getSectionFields(section) : {};

  return {
    eyebrow: getString(fields.eyebrow),
    name: getString(fields.name),
    role: getString(fields.role),
    location: getString(fields.location),
    contact: getString(fields.contact),
    links: getLinks(fields.links),
  };
}

function mapCvData(response: StrapiCvResponse): CvData {
  const sections = getSections(response);
  const summarySection = getSection(sections, "blocks.cv-summary");
  const rolesSection = getSection(sections, "blocks.roles");
  const skillsSection = getSection(sections, "blocks.skills");
  const highlightsSection = getSection(sections, "blocks.highlights");
  const educationSection = getSection(sections, "blocks.education");
  const achievementsSection = getSection(sections, "blocks.achievements");

  const summaryFields = summarySection ? getSectionFields(summarySection) : {};
  const rolesFields = rolesSection ? getSectionFields(rolesSection) : {};
  const skillsFields = skillsSection ? getSectionFields(skillsSection) : {};
  const highlightsFields = highlightsSection
    ? getSectionFields(highlightsSection)
    : {};
  const educationFields = educationSection
    ? getSectionFields(educationSection)
    : {};
  const achievementsFields = achievementsSection
    ? getSectionFields(achievementsSection)
    : {};

  const summary = getBlocksText(summaryFields.summary);

  return {
    hero: getHero(getSection(sections, "blocks.cv-hero")),
    summaryLabel: getString(summaryFields.label) || cvMock.summaryLabel,
    summary,
    rolesLabel: getString(rolesFields.label) || cvMock.rolesLabel,
    roles: getRoles(rolesFields.roles),
    skillsLabel: getString(skillsFields.label) || cvMock.skillsLabel,
    skills: getSkills(skillsFields.skills),
    highlightsLabel:
      getString(highlightsFields.label) || cvMock.highlightsLabel,
    highlights: getStringArray(highlightsFields.highlights),
    educationLabel: getString(educationFields.label) || cvMock.educationLabel,
    education: getEducation(educationFields.schools),
    achievementsLabel:
      getString(achievementsFields.label) || cvMock.achievementsLabel,
    achievements: getStringArray(achievementsFields.achievements),
  };
}

export async function getCvData(): Promise<CvData> {
  const response = await fetchStrapiJson<StrapiCvResponse>(
    strapiEndpoints.cvPage
  );

  return mapCvData(response);
}

export { cvMock };
