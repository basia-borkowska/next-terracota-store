import { cn } from "@/shared/lib/cn";

export function HelperText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-xs text-light-muted/60", className)}>{children}</p>
  );
}
