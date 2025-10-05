import { cn } from "@/shared/lib/cn";

export function Paragraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-base text-justify leading-relaxed", className)}>
      {children}
    </p>
  );
}
