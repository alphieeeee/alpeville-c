// Fields that every API status response should include.
export interface ApiResponseBase {
  ok: boolean;
  timestamp: string;
  error?: string;
}

export type ApiError = {
  message: string;
  status: number;
};

export type ApiResult<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: ApiError;
    };
