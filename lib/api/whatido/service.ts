import whatIdoData from "./mock";
import type { ApiResult } from "../types/common";
import type { WhatIdoItem } from "./types";

export function getWhatIdoData(): ApiResult<WhatIdoItem[]> {
  return { data: whatIdoData, error: null };
}
