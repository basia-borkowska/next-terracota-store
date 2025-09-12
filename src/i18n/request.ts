// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const l = locale || "en";
  // Load the JSON for the current locale
  const messages = (await import(`../../messages/${l}.json`)).default;
  return { messages, locale: l };
});
