import { cn } from "@/shared/lib/cn";

export function Label({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-xs text-dark uppercase", className)}
    >
      {children}
    </label>
  );
}
