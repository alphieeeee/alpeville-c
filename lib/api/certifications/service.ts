import { fetchStrapiJson } from "../strapi/client";
import { strapiEndpoints } from "../strapi/endpoints";
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

export async function getCertificationsData(): Promise<CertificationItem[]> {
  const response = await fetchStrapiJson<StrapiCertificationsResponse>(
    strapiEndpoints.certifications
  );

  return response.data.map(mapCertification);
}
