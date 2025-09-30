import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { productsKey, getNextPageParam } from "@/shared/lib/queries/products";
import { getProducts } from "@/shared/lib/api/products";
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
  const baseParams = { lang: locale, size: 24 };

  await queryClient.prefetchInfiniteQuery({
    queryKey: productsKey(baseParams),
    queryFn: ({ pageParam }) =>
      getProducts({
        ...baseParams,
        page: (pageParam as number | undefined) ?? 1,
      }),
    initialPageParam: 1,
    getNextPageParam,
  });
  return (
    <Container>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsInfinite lang={locale} size={24} />
      </HydrationBoundary>
    </Container>
  );
}
