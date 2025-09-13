import {
  fetchProducts,
  getNextPageParam,
  productsKey,
} from "@/shared/lib/queries/products";
import { LocaleParams } from "@/shared/lib/types";
import { Container } from "@/shared/ui/layout/Container";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductsInfinite from "../products/ProductsInfinite";

export default async function NewProductsPage({
  params,
}: {
  params: LocaleParams;
}) {
  const queryClient = new QueryClient();
  const { locale } = await params;
  const baseParams = { lang: locale, limit: 24 };

  await queryClient.prefetchInfiniteQuery({
    queryKey: productsKey(baseParams),
    queryFn: ({ pageParam }) =>
      fetchProducts({
        ...baseParams,
        isNew: true,
        page: (pageParam as number | undefined) ?? 1,
      }),
    initialPageParam: 1,
    getNextPageParam,
  });

  return (
    <Container>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsInfinite {...baseParams} isNew />
      </HydrationBoundary>
    </Container>
  );
}
