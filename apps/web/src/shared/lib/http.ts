import { Locale } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    // important: forward cookies/credentials if you later use sessions
    credentials: "include",
    headers: {
      ...(init?.headers ?? {}),
    },
    // cache config is optional; you can tweak per call
  });
  if (!res.ok) {
    throw new Error(`GET ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

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
