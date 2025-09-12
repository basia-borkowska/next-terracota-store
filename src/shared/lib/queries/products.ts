import type { ProductsListResponse } from "@/shared/lib/api/products";

export type ProductsQueryParams = {
  lang: "en" | "pl";
  limit?: number;
  category?: string;
  isNew?: boolean;
  onSale?: boolean;
};

export const productsKey = (p: ProductsQueryParams) =>
  [
    "products",
    p.lang,
    {
      limit: p.limit ?? 24,
      category: p.category,
      isNew: p.isNew,
      onSale: p.onSale,
    },
  ] as const;

export async function fetchProductsPage(
  params: ProductsQueryParams & { page: number }
) {
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

export const getNextPageParam = (last: ProductsListResponse) =>
  last.hasNext ? last.page + 1 : undefined;
