import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function buildCookieHeader() {
  const c = await cookies();
  return c
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

async function handle<T>(res: Response, path: string): Promise<T> {
  if (!res.ok) {
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {}
    throw new ApiError(`${res.status} on ${path}`, res.status, body);
  }
  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

export async function apiGetServer<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const cookieHeader = await buildCookieHeader();
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      cookie: cookieHeader,
    },
    cache: "no-store",
  });
  return handle<T>(res, path);
}

export async function apiPostServer<T = unknown>(
  path: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const cookieHeader = await buildCookieHeader();
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers || {}),
      cookie: cookieHeader,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  return handle<T>(res, path);
}
