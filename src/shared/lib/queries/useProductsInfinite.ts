"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchProductsPage,
  getNextPageParam,
  productsKey,
  type ProductsQueryParams,
} from "./products";

export function useProductsInfinite(params: ProductsQueryParams) {
  return useInfiniteQuery({
    queryKey: productsKey(params),
    queryFn: ({ pageParam }) =>
      fetchProductsPage({
        ...params,
        page: (pageParam as number | undefined) ?? 1,
      }),
    initialPageParam: 1,
    getNextPageParam,
  });
}
