import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import {
  fetchProducts,
  productsKey,
  getNextPageParam,
} from "@/shared/lib/queries/products";
import ProductsInfinite from "./ProductsInfinite";
import { Container } from "@/shared/ui/layout/Container";
import { LocaleParams } from "@/shared/lib/types";

export default async function ProductsPage({
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
        page: (pageParam as number | undefined) ?? 1,
      }),
    initialPageParam: 1,
    getNextPageParam,
  });
  return (
    <Container>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsInfinite lang={locale} limit={24} />
      </HydrationBoundary>
    </Container>
  );
}
