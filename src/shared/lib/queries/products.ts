"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { ProductsListResponse } from "@/shared/lib/api/products";

type BaseParams = {
  lang: "en" | "pl";
  limit?: number;
  category?: string;
  isNew?: boolean;
  onSale?: boolean;
};

async function fetchProductsPage(params: BaseParams & { page: number }) {
  const { lang, page, limit = 24, category, isNew, onSale } = params;
  const q = new URLSearchParams();
  q.set("lang", lang);
  q.set("page", String(page));
  q.set("limit", String(limit));
  if (category) q.set("category", category);
  if (isNew) q.set("isNew", "true");
  if (onSale) q.set("onSale", "true");

  const res = await fetch(`/api/products?${q.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as ProductsListResponse;
}

/** Infinite products with page-based pagination */
export function useProductsInfinite(params: BaseParams) {
  const { lang, limit = 24, category, isNew, onSale } = params;

  return useInfiniteQuery({
    queryKey: ["products", lang, { limit, category, isNew, onSale }],
    queryFn: ({ pageParam }) =>
      fetchProductsPage({
        lang,
        page: (pageParam as number | undefined) ?? 1,
        limit,
        category,
        isNew,
        onSale,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
  });
}
