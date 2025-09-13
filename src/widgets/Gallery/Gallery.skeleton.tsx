import Skeleton from "@/shared/ui/atoms/Skeleton";

export function GallerySkeleton() {
  return (
    <div className="flex flex-col gap-1">
      {/* row of 2, tall */}
      <div className="flex gap-1">
        <Skeleton className="h-[600px] flex-1" />
        <Skeleton className="h-[600px] flex-1" />
      </div>
      {/* row of 3, short */}
      <div className="flex gap-1">
        <Skeleton className="h-56 flex-1" />
        <Skeleton className="h-56 flex-1" />
        <Skeleton className="h-56 flex-1" />
      </div>
    </div>
  );
}
