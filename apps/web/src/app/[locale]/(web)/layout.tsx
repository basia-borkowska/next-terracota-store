import Navbar from "@/widgets/navbar/Navbar";
import { authMeServer } from "@/shared/lib/api/auth.server";
import { Me } from "@terracota/types";
import QueryProvider from "@/shared/providers/query";

// Force dynamic rendering to prevent caching of auth state
export const dynamic = "force-dynamic";

export default async function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("WebLayout: Checking authentication...");

  let user: Awaited<Me> | null = null;
  try {
    user = await authMeServer();
    console.log("WebLayout: User authenticated:", user?.email || "null");
  } catch (error) {
    console.log("WebLayout: Auth check failed:", error);
    user = null; // 401 → not logged in
  }

  return (
    <QueryProvider>
      <Navbar user={user} />
      {children}
    </QueryProvider>
  );
}
