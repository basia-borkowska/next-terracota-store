"use client";

import QueryProvider from "@/shared/providers/query";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
