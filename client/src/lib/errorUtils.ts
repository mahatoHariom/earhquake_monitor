import { ApiErrorResponse } from "@/types/error";

export const isApiErrorResponse = (
  error: unknown
): error is ApiErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    "errors" in error &&
    Array.isArray((error as ApiErrorResponse).errors)
  );
};

export const formatApiError = (error: unknown): string => {
  if (isApiErrorResponse(error)) {
    return error.errors.map((err) => `${err.path}: ${err.msg}`).join(", ");
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};
