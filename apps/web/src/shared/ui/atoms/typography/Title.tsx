import { cn } from "@/shared/lib/cn";

export function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn("text-2xl font-bold text-dark", className)}>
      {children}
    </h1>
  );
}
