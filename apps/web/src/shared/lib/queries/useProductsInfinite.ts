"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getNextPageParam,
  productsKey,
  type ProductsQueryParams,
} from "./products";
import { getProducts } from "@/shared/lib/api/products";

export function useProductsInfinite(params: ProductsQueryParams) {
  return useInfiniteQuery({
    queryKey: productsKey(params),
    queryFn: ({ pageParam }) =>
      getProducts({
        ...params,
        page: (pageParam as number | undefined) ?? 1,
      }),
    initialPageParam: 1,
    getNextPageParam,
  });
}
