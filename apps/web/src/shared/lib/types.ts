export type Locale = "en" | "pl";

export type LocaleParams = Promise<{ locale: Locale }>;

export type ListResponse<T> = {
  items: T[];
  page: number;
  size: number;
  total: number;
};
