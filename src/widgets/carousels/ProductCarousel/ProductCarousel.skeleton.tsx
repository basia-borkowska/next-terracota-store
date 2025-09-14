import { cn } from "@/shared/lib/cn";
import { ProductCardSkeleton } from "@/widgets/ProductCard/ProductCard.skeleton";
import Skeleton from "@/shared/ui/atoms/Skeleton";

type Props = {
  count?: number;
  showHeader?: boolean;
  className?: string;
  /** Tailwind classes controlling slide width per breakpoint */
  itemBasis?: string; // e.g. 'basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
};

export function ProductCarouselSkeleton({
  count = 8,
  showHeader = true,
  className,
  itemBasis = "basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4",
}: Props) {
  return (
    <section className={cn("w-full", className)}>
      {showHeader && (
        <div className="mb-3 flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
      )}

      {/* Mimic carousel layout with horizontal list */}
      <div className="-ml-3 overflow-hidden">
        <div className="flex">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className={cn("pl-3", itemBasis)}>
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

