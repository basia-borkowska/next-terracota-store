import { Locale } from "./types";

export function getLangFromSearch(searchParams: URLSearchParams): Locale {
  const lang = searchParams.get("lang");
  return lang === "pl" ? "pl" : "en";
}

export function num(
  searchParams: URLSearchParams,
  key: string,
  fallback: number,
  min = 1
) {
  const v = Number(searchParams.get(key));
  return Number.isFinite(v) ? Math.max(min, v) : fallback;
}

export function bool(searchParams: URLSearchParams, key: string) {
  return searchParams.get(key) === "true";
}

export function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, init);
}
