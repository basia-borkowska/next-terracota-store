"use client";

import { Button } from "@shared/ui/atoms/Button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Button onClick={() => alert("It works!")}>Click me</Button>
    </main>
  );
}
