"use client";

import Link from "next/link";
import { cn } from "@shared/lib/cn";
import ProductCard from "@/widgets/ProductCard/ProductCard";

import type { EmblaOptionsType } from "embla-carousel";
import { ProductSummaryDTO } from "@/shared/lib/api/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/molecules/Carousel";

type Props = {
  products: ProductSummaryDTO[];
  title?: string;
  seeAllHref?: string;
  className?: string;
  cardProps?: {
    showNewBadge?: boolean;
    showDiscountBadge?: boolean;
  };
  /** Tailwind classes controlling slide width per breakpoint */
  itemBasis?: string; // e.g. 'basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
  options?: EmblaOptionsType; // embla options (align, loop, dragFree, etc.)
  ariaLabel?: string;
};

export default function ProductCarousel({
  products,
  title,
  seeAllHref,
  className,
  cardProps,
  itemBasis = "basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4",
  options = { align: "start", loop: false },
  ariaLabel = "Products carousel",
}: Props) {
  if (!products?.length) return null;

  return (
    <section className={cn("w-full", className)}>
      {(title || seeAllHref) && (
        <div className="mb-3 flex items-center justify-between">
          {title ? (
            <h2 className="text-lg font-semibold">{title}</h2>
          ) : (
            <span />
          )}
          {seeAllHref && (
            <Link
              href={seeAllHref}
              className="text-sm text-interactive hover:underline"
            >
              See all
            </Link>
          )}
        </div>
      )}

      <Carousel opts={options} className="relative">
        <CarouselContent className="-ml-3" aria-label={ariaLabel} role="region">
          {products.map((p) => (
            <CarouselItem key={p.id} className={cn("pl-3", itemBasis)}>
              <ProductCard
                product={p}
                showNewBadge={cardProps?.showNewBadge ?? true}
                showDiscountBadge={cardProps?.showDiscountBadge ?? true}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          aria-label="Previous products"
          className="hidden sm:inline-flex"
        />
        <CarouselNext
          aria-label="Next products"
          className="hidden sm:inline-flex"
        />
      </Carousel>
    </section>
  );
}
