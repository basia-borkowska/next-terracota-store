import { cn } from "@/shared/lib/cn";

interface PageHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-8 flex flex-col items-center gap-4 text-center",
        className
      )}
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-interactive">
        {title}
      </h1>
      <p className="max-w-[700px] text-base sm:text-lg text-dark/70">
        {description}
      </p>
    </header>
  );
}
