import { redirect } from "next/navigation";
import { authLogoutServer } from "@/shared/lib/api/auth.server";
import { pathnames, withLocale } from "@/shared/lib/pathnames";
import { LocaleParams } from "@/shared/lib/types";

export const dynamic = "force-dynamic";

export default async function LogoutPage({ params }: { params: LocaleParams }) {
  const { locale } = await params;

  try {
    await authLogoutServer();
  } catch (error) {
    console.error("Server-side logout failed:", error);
  }

  redirect(withLocale(locale, pathnames.home));
}
