import { apiGet, apiPost } from "../http";

export type Me = {
  id: string;
  email: string;
  name?: string | null;
  role: "user" | "admin";
};

export async function authRegister(input: {
  email: string;
  password: string;
  name?: string;
}) {
  return apiPost<Me>("/auth/register", input);
}

export async function authLogin(input: { email: string; password: string }) {
  return apiPost<Me>("/auth/login", input);
}

export async function authLogout() {
  return apiPost<void>("/auth/logout");
}

export async function authMe() {
  return apiGet<Me>("/auth/me");
}
