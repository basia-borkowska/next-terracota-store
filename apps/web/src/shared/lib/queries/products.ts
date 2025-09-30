import type { ProductsListResponse } from "@/shared/lib/api/products";
import { Locale } from "@/shared/lib/types";

export type ProductsQueryParams = {
  lang: Locale;
  size?: number;
  category?: string;
  isNew?: boolean;
  onSale?: boolean;
};

export const productsKey = (p: ProductsQueryParams) =>
  [
    "products",
    p.lang,
    {
      size: p.size ?? 24,
      category: p.category,
      isNew: p.isNew,
      onSale: p.onSale,
    },
  ] as const;

export const getNextPageParam = (last: ProductsListResponse) =>
  last.page * last.size < last.total ? last.page + 1 : undefined;
