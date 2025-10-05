import { ApiError } from "./http";

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const body = error.body as { message?: string } | null;
    if (body?.message) {
      return body.message;
    }
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getApiErrorDetails(error: unknown): {
  message: string;
  status: number;
  body: unknown;
} | null {
  if (isApiError(error)) {
    return {
      message: getErrorMessage(error),
      status: error.status,
      body: error.body,
    };
  }
  return null;
}

export function getFieldErrors(error: unknown): Record<string, string> | null {
  if (isApiError(error)) {
    const body = error.body as { errors?: Record<string, string> } | null;
    return body?.errors || null;
  }
  return null;
}
