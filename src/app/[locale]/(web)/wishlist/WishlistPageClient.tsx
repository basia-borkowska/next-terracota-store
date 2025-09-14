"use client";

import { useEffect, useMemo, useState } from "react";
import { useWishlist } from "@/features/wishlist/model/useWishlist";
import type { ProductDTO } from "@/shared/lib/api/products";
import ProductGrid from "@/widgets/ProductGrid/ProductGrid";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/shared/ui/atoms/Button";
import { Locale } from "@/shared/lib/types";
import { Container } from "@/shared/ui/layout/Container";
import { ProductGridSkeleton } from "@/widgets/ProductGrid/ProductGrid.skeleton";
import { pathnames, withLocale } from "@/shared/lib/pathnames";
import PageHeader from "@/shared/ui/molecules/PageHeader/PageHeader";

export default function WishlistPageClient({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const { ids, isReady } = useWishlist();
  const [items, setItems] = useState<ProductDTO[] | null>(null);
  const [loading, setLoading] = useState(true);

  const query = useMemo(() => {
    const sp = new URLSearchParams();
    sp.set("lang", locale);
    if (ids.length) sp.set("ids", ids.join(","));
    return sp.toString();
  }, [ids, locale]);

  useEffect(() => {
    if (!isReady) return;
    if (!ids.length) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/products?${query}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setItems((Array.isArray(data) ? data : data.items) ?? []))
      .finally(() => setLoading(false));
  }, [ids, isReady, query]);

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
