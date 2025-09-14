"use client";

import { useEffect, useMemo, useRef } from "react";
import { useProductsInfinite } from "@/shared/lib/queries/useProductsInfinite";
import ProductGrid from "@/widgets/ProductGrid/ProductGrid";
import { Locale } from "@/shared/lib/types";

type Props = {
  lang: Locale;
  limit?: number;
  category?: string;
  isNew?: boolean;
  onSale?: boolean;
};

export default function ProductsInfinite({
  lang,
  limit = 24,
  category,
  isNew,
  onSale,
}: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useProductsInfinite({ lang, limit, category, isNew, onSale });

  const items = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) void fetchNextPage();
      },
      { rootMargin: "400px 0px 800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending")
    return (
      <div className="py-6 text-center text-sm text-gray-500">Loading…</div>
    );
  if (status === "error")
    return (
      <div className="py-6 text-center text-sm text-red-600">
        {(error as Error).message}
      </div>
    );

  return (
    <>
      <ProductGrid items={items} showNewBadge={!isNew} />
      <div ref={sentinelRef} className="h-10" />
      {isFetchingNextPage && (
        <div className="py-6 text-center text-sm text-gray-500">Loading…</div>
      )}
    </>
  );
}
