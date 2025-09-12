import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import {
  fetchProductsPage,
  productsKey,
  getNextPageParam,
} from "@/shared/lib/queries/products";
import ProductsInfinite from "./ProductsInfinite";
import { Container } from "@/shared/ui/layout/Container";

export default async function ProductsPage({
  params,
}: {
  params: { locale: "en" | "pl" };
}) {
  const queryClient = new QueryClient();
  const baseParams = { lang: params.locale as "en" | "pl", limit: 24 };

  await queryClient.prefetchInfiniteQuery({
    queryKey: productsKey(baseParams),
    queryFn: ({ pageParam }) =>
      fetchProductsPage({
        ...baseParams,
        page: (pageParam as number | undefined) ?? 1,
      }),
    initialPageParam: 1,
    getNextPageParam,
  });
  return (
    <Container>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsInfinite lang={params.locale} limit={24} />
      </HydrationBoundary>
    </Container>
  );
}
