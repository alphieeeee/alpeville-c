import type { ApiResponseBase } from "../types/common";

export interface StrapiHealthResponse extends ApiResponseBase {
  url: string;
  status?: number;
  statusText?: string;
  payload?: string;
}
