// src/app/page.tsx
"use client";

import { Button } from "@/shared/ui/atoms/Button";
import { Sun } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center">
      <Button>
        <Sun className="mr-2 h-4 w-4" />
        Hello shadcn
      </Button>
    </main>
  );
}
