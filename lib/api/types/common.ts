// Fields that every API status response should include.
export interface ApiResponseBase {
  ok: boolean;
  timestamp: string;
  error?: string;
}
