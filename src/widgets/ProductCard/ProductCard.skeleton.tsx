import Skeleton from "@/shared/ui/atoms/Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden">
      <Skeleton className="w-[286px] h-[380px]" />
      <div className="py-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  );
}
