import {
  createStrapiApiError,
  fetchStrapiJson,
} from "../strapi/client";
import { strapiEndpoints } from "../strapi/endpoints";
import type { ApiResult } from "../types/common";
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

// Maps the CV hero section into the shape used by the page.
function mapHero(section?: StrapiSection): CvHero | null {
  const fields = section ? getSectionFields(section) : {};
  const hero = {
    eyebrow: getString(fields.eyebrow),
    name: getString(fields.name),
    role: getString(fields.role),
    location: getString(fields.location),
    contact: getString(fields.contact),
    links: getLinks(fields.links),
  };

  return hero.name || hero.role || hero.location || hero.contact || hero.links.length
    ? hero
    : null;
}

// Maps the summary section and converts Strapi rich text blocks into plain text.
function mapSummary(section?: StrapiSection): Pick<CvData, "summaryLabel" | "summary"> {
  const fields = section ? getSectionFields(section) : {};

  return {
    summaryLabel: getString(fields.label),
    summary: getBlocksText(fields.summary),
  };
}

// Maps the professional experience section into CV role items.
function mapRoles(section?: StrapiSection): Pick<CvData, "rolesLabel" | "roles"> {
  const fields = section ? getSectionFields(section) : {};

  return {
    rolesLabel: getString(fields.label),
    roles: getRoles(fields.roles),
  };
}

// Maps the skills section into category and skill values.
function mapSkills(section?: StrapiSection): Pick<CvData, "skillsLabel" | "skills"> {
  const fields = section ? getSectionFields(section) : {};

  return {
    skillsLabel: getString(fields.label),
    skills: getSkills(fields.skills),
  };
}

// Maps the project highlights section into a simple list of strings.
function mapHighlights(
  section?: StrapiSection
): Pick<CvData, "highlightsLabel" | "highlights"> {
  const fields = section ? getSectionFields(section) : {};

  return {
    highlightsLabel: getString(fields.label),
    highlights: getStringArray(fields.highlights),
  };
}

// Maps the education section into degree, school, and period values.
function mapEducation(
  section?: StrapiSection
): Pick<CvData, "educationLabel" | "education"> {
  const fields = section ? getSectionFields(section) : {};

  return {
    educationLabel: getString(fields.label),
    education: getEducation(fields.schools),
  };
}

// Maps the achievements section into a simple list of strings.
function mapAchievements(
  section?: StrapiSection
): Pick<CvData, "achievementsLabel" | "achievements"> {
  const fields = section ? getSectionFields(section) : {};

  return {
    achievementsLabel: getString(fields.label),
    achievements: getStringArray(fields.achievements),
  };
}

// Finds each dynamic-zone section and combines the mapped results into one CV object.
function mapCvData(response: StrapiCvResponse): CvData {
  const sections = getSections(response);

  const hero = mapHero(getSection(sections, "blocks.cv-hero"));
  const summary = mapSummary(getSection(sections, "blocks.cv-summary"));
  const roles = mapRoles(getSection(sections, "blocks.roles"));
  const skills = mapSkills(getSection(sections, "blocks.skills"));
  const highlights = mapHighlights(getSection(sections, "blocks.highlights"));
  const education = mapEducation(getSection(sections, "blocks.education"));
  const achievements = mapAchievements(
    getSection(sections, "blocks.achievements")
  );

  return {
    hero,
    ...summary,
    ...roles,
    ...skills,
    ...highlights,
    ...education,
    ...achievements,
  };
}

function getCvDataSource(): "mock" | "strapi" {
  const source = process.env.CV_DATA_SOURCE ?? "strapi";

  if (source !== "mock" && source !== "strapi") {
    throw new Error(
      `Invalid CV_DATA_SOURCE value: ${source}. Use "mock" or "strapi".`
    );
  }

  return source;
}

export async function getCvData(): Promise<ApiResult<CvData>> {
  try {
    if (getCvDataSource() === "mock") {
      return { data: cvMock, error: null };
    }

    const response = await fetchStrapiJson<StrapiCvResponse>(
      strapiEndpoints.cvPage
    );

    return { data: mapCvData(response), error: null };
  } catch (error) {
    return {
      data: null,
      error: createStrapiApiError(
        error,
        "CV data is currently unavailable."
      ),
    };
  }
}

export { cvMock };
