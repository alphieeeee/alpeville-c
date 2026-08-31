import { createStrapiApiError, fetchStrapiJson } from "../strapi/client";
import { strapiEndpoints } from "../strapi/endpoints";
import type { ApiResult } from "../types/common";
import type { CertificationItem } from "./types";

type StrapiCertification = {
  issuer?: string;
  name?: string;
  link?: string | null;
  description?: string;
};

type StrapiCertificationEntry =
  | StrapiCertification
  | { attributes: StrapiCertification };

type StrapiCertificationsResponse = {
  data: StrapiCertificationEntry[];
};

function getCertificationFields(
  certification: StrapiCertificationEntry
): StrapiCertification {
  if ("attributes" in certification) {
    return certification.attributes;
  }

  return certification;
}

function mapCertification(
  certification: StrapiCertificationEntry
): CertificationItem {
  const fields = getCertificationFields(certification);

  return {
    issuer: fields.issuer ?? "",
    name: fields.name ?? "",
    description: fields.description ?? "",
    link: fields.link ?? undefined,
  };
}

export async function getCertificationsData(): Promise<ApiResult<CertificationItem[]>> {
  try {
    const response = await fetchStrapiJson<StrapiCertificationsResponse>(
      strapiEndpoints.certifications,
      { next: { tags: ["strapi:certifications"] } }
    );

    return { data: response.data.map(mapCertification), error: null };
  } catch (error) {
    return {
      data: null,
      error: createStrapiApiError(
        error,
        "Certifications are currently unavailable."
      ),
    };
  }
}
