import { useState, useCallback } from "react";
import { getErrorMessage, getFieldErrors } from "../lib/error";

export function useServerError() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleError = useCallback((error: unknown) => {
    setServerError(getErrorMessage(error));

    const fieldErrs = getFieldErrors(error);
    setFieldErrors(fieldErrs || {});
  }, []);

  const clearError = useCallback(() => {
    setServerError(null);
    setFieldErrors({});
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    serverError,
    fieldErrors,
    setServerError,
    setFieldErrors,
    handleError,
    clearError,
    clearFieldError,
  };
}
