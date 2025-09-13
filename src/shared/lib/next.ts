import { headers } from "next/headers";

/** Absolute origin for server-side fetches (works locally and in prod). */
export async function getBaseUrl() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return `${proto}://${host}`;
}
