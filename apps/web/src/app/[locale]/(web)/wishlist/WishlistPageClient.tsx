"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/features/wishlist/model/useWishlist";
import { ProductSummaryDTO } from "@/entities/product/types";
import ProductGrid from "@/widgets/ProductGrid/ProductGrid";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/shared/ui/atoms/Button";
import { Locale } from "@/shared/lib/types";
import { Container } from "@/shared/ui/layout/Container";
import { ProductGridSkeleton } from "@/widgets/ProductGrid/ProductGrid.skeleton";
import { pathnames, withLocale } from "@/shared/lib/pathnames";
import PageHeader from "@/shared/ui/molecules/PageHeader/PageHeader";
import { fetchProductsByIds } from "@/shared/lib/api/products";

export default function WishlistPageClient({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const { ids, isReady } = useWishlist();
  const [items, setItems] = useState<ProductSummaryDTO[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;
    if (!ids.length) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchProductsByIds(ids, locale)
      .then((data) => setItems(data ?? []))
      .finally(() => setLoading(false));
  }, [ids, isReady, locale]);

  const hasItems = items && items.length > 0;

  return (
    <Container className="flex flex-col">
      <PageHeader
        title={t("wishList.header")}
        description={
          hasItems
            ? t("wishList.description")
            : t("wishList.emptyStateDescription")
        }
      />
      {(!isReady || loading) && <ProductGridSkeleton />}

      {!loading &&
        (hasItems ? (
          <ProductGrid items={items} />
        ) : (
          <Link
            href={withLocale(locale, pathnames.products)}
            className="mt-10 w-fit mx-auto"
          >
            <Button className="min-w-[200px] cursor-pointer">
              {t("wishList.browseProducts")}
            </Button>
          </Link>
        ))}
    </Container>
  );
}
