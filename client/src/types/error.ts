export interface ApiError {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export interface ApiErrorResponse {
  errors: ApiError[];
}
