import {
  createStrapiApiError,
  fetchStrapiJson,
  StrapiRequestError,
} from "../strapi/client";
import { getStrapiMediaUrl } from "../strapi/media";
import { strapiEndpoints } from "../strapi/endpoints";
import type { ApiResult } from "../types/common";
import type { WorkCard } from "./types";

type StrapiMedia = {
  url?: string;
  attributes?: {
    url?: string;
  };
};

type StrapiWork = {
  slug?: string;
  title?: string;
  type?: string;
  link?: string;
  summary?: unknown;
  tools?: unknown;
  hero?: StrapiMedia | null;
  thumbnail?: StrapiMedia | null;
};

type StrapiWorkEntry = StrapiWork | { attributes: StrapiWork };

type StrapiWorkResponse = {
  data: StrapiWorkEntry[] | StrapiWorkEntry;
};

function getWorkFields(work: StrapiWorkEntry): StrapiWork {
  if ("attributes" in work) {
    return work.attributes;
  }

  return work;
}

function getMediaUrl(media?: StrapiMedia | null): string {
  const url = media?.url ?? media?.attributes?.url;
  return getStrapiMediaUrl(url);
}

// Strapi Blocks content is stored as paragraphs with text children.
function getSummaryText(summary: unknown): string {
  if (typeof summary === "string") {
    return summary;
  }

  if (!Array.isArray(summary)) {
    return "";
  }

  return summary
    .map((block) => {
      if (!block || typeof block !== "object") {
        return "";
      }

      const children = "children" in block ? block.children : [];

      if (!Array.isArray(children)) {
        return "";
      }

      return children
        .map((child) => {
          if (!child || typeof child !== "object" || !("text" in child)) {
            return "";
          }

          return typeof child.text === "string" ? child.text : "";
        })
        .join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

function getTools(tools: unknown): string[] {
  return Array.isArray(tools)
    ? tools.filter((tool): tool is string => typeof tool === "string")
    : [];
}

function mapWork(work: StrapiWorkEntry): WorkCard {
  const fields = getWorkFields(work);

  if (!fields.slug || !fields.title) {
    throw new Error("Strapi returned a work entry without a slug or title");
  }

  return {
    slug: fields.slug,
    title: fields.title,
    type: fields.type ?? "",
    thumbSrc: getMediaUrl(fields.thumbnail),
    imgSrc: getMediaUrl(fields.hero),
    summary: getSummaryText(fields.summary),
    tools: getTools(fields.tools),
    link: fields.link ?? "",
  };
}

export async function getWorkData(): Promise<ApiResult<WorkCard[]>> {
  try {
    const response = await fetchStrapiJson<StrapiWorkResponse>(
      strapiEndpoints.works
    );

    const works = Array.isArray(response.data)
      ? response.data
      : [response.data];

    return { data: works.map(mapWork), error: null };
  } catch (error) {
    return {
      data: null,
      error: createStrapiApiError(
        error,
        "Work data is currently unavailable."
      ),
    };
  }
}

export async function getWorkBySlug(
  slug: string
): Promise<ApiResult<WorkCard>> {
  try {
    const response = await fetchStrapiJson<StrapiWorkResponse>(
      strapiEndpoints.workBySlug(slug)
    );

    if (!Array.isArray(response.data)) {
      return { data: mapWork(response.data), error: null };
    }

    const work = response.data[0];
    return work
      ? { data: mapWork(work), error: null }
      : {
          data: null,
          error: {
            message: "Project was not found.",
            status: 404,
          },
        };
  } catch (error) {
    if (error instanceof StrapiRequestError && error.status === 404) {
      return {
        data: null,
        error: {
          message: "Project was not found.",
          status: 404,
        },
      };
    }

    return {
      data: null,
      error: createStrapiApiError(
        error,
        "This project is currently unavailable."
      ),
    };
  }
}
