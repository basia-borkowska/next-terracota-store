import { apiGetServer, apiPostServer } from "../http.server";
import type { Me } from "@terracota/types";

export async function authMeServer(): Promise<Me | null> {
  return apiGetServer<Me>("/auth/me");
}

export async function authLogoutServer(): Promise<void> {
  return apiPostServer<void>("/auth/logout");
}
