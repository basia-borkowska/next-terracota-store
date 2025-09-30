import { cn } from "@/shared/lib/cn";

interface PageHeaderSkeletonProps {
  className?: string;
}

export default function PageHeaderSkeleton({
  className,
}: PageHeaderSkeletonProps) {
  return (
    <header
      className={cn(
        "mb-8 flex flex-col items-center gap-4 text-center",
        className
      )}
    >
      <div className="h-10 w-3/4 max-w-[500px] animate-pulse rounded-md bg-gray-200" />
      <div className="h-4 w-full max-w-[700px] animate-pulse rounded-md bg-gray-200" />
    </header>
  );
}
