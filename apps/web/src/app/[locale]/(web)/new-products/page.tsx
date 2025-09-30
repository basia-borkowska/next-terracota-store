import { getNextPageParam, productsKey } from "@/shared/lib/queries/products";
import { getProducts } from "@/shared/lib/api/products";
import { LocaleParams } from "@/shared/lib/types";
import { Container } from "@/shared/ui/layout/Container";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductsInfinite from "../products/ProductsInfinite";
import PageHeader from "@/shared/ui/molecules/PageHeader/PageHeader";
import { getTranslations } from "next-intl/server";

export default async function NewProductsPage({
  params,
}: {
  params: LocaleParams;
}) {
  const queryClient = new QueryClient();
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const baseParams = { lang: locale, size: 24 };

  await queryClient.prefetchInfiniteQuery({
    queryKey: productsKey(baseParams),
    queryFn: ({ pageParam }) =>
      getProducts({
        ...baseParams,
        isNew: true,
        page: (pageParam as number | undefined) ?? 1,
      }),
    initialPageParam: 1,
    getNextPageParam,
  });

  return (
    <Container>
      <PageHeader
        title={t("newProducts.header")}
        description={t("newProducts.description")}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsInfinite {...baseParams} isNew />
      </HydrationBoundary>
    </Container>
  );
}
