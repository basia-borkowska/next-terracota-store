import Skeleton from "@/shared/ui/atoms/Skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex gap-1 mb-2">
        <Skeleton className="h-5 w-15" />
        <Skeleton className="h-5 w-13" />
      </div>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
      <Skeleton className="mt-6 h-7 w-40" />
      <div className="mt-8 flex items-center gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  );
}
