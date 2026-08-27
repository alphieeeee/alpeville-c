import aboutData from "./mock";
import type { ApiResult } from "../types/common";
import type { AboutData } from "./types";

export function getAboutData(): ApiResult<AboutData> {
  return { data: aboutData, error: null };
}
