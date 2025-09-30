import type { Locale } from "@terracota/types";
class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function handle<T>(res: Response, path: string): Promise<T> {
  if (!res.ok) {
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      /* ignore */
    }
    throw new ApiError(`${res.status} on ${path}`, res.status, body);
  }
  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
  });
  return handle<T>(res, path);
}

export async function apiPost<T = unknown>(
  path: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...init,
  });
  return handle<T>(res, path);
}

export async function apiDelete<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    credentials: "include",
    ...init,
  });
  return handle<T>(res, path);
}

export async function apiPut<T = unknown>(
  path: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    credentials: "include",
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...init,
  });
  return handle<T>(res, path);
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
