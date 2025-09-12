"use client";

import { useEffect, useMemo, useRef } from "react";
import { useProductsInfinite } from "@/shared/lib/queries/products";
import ProductGrid from "@/widgets/ProductGrid";

type Props = {
  lang: "en" | "pl";
  limit?: number;
  category?: string;
  isNew?: boolean;
  onSale?: boolean;
};

export default function ProductsInfinite(props: Props) {
  const { lang, limit = 24, category, isNew, onSale } = props;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useProductsInfinite({ lang, limit, category, isNew, onSale });

  // Flatten pages
  const items = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  );

  // Sentinel for auto-load
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: "400px 0px 800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") {
    return (
      <div className="py-6 text-center text-sm text-gray-500">Loading…</div>
    );
  }
  if (status === "error") {
    return (
      <div className="py-6 text-center text-sm text-red-600">
        {(error as Error).message}{" "}
        <button
          onClick={() => void fetchNextPage()}
          className="underline underline-offset-2"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <ProductGrid items={items} />
      <div ref={sentinelRef} className="h-10" />
      {isFetchingNextPage && (
        <div className="py-6 text-center text-sm text-gray-500">Loading…</div>
      )}
    </>
  );
}
