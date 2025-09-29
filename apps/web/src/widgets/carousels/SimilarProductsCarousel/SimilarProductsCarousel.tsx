import { Suspense } from "react";
import { headers } from "next/headers";
import { ProductCarouselSkeleton } from "../ProductCarousel/ProductCarousel.skeleton";
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import { getLocale, getTranslations } from "next-intl/server";
import { ProductSummaryDTO } from "@/entities/product/types";

type Props = {
  productId: string;
  title?: string;
  limit?: number;
  className?: string;
};

export default function SimilarProductsCarousel(props: Props) {
  return (
    <Suspense fallback={<ProductCarouselSkeleton />}>
      <SimilarProductsInner {...props} />
    </Suspense>
  );
}

async function SimilarProductsInner({
  productId,
  title,
  limit = 12,
  className,
}: Props) {
  const locale = await getLocale();
  const t = await getTranslations({ locale });
  const translatedTitle = title ?? t("widgets.carousels.similarProducts");

  const h = await headers();
  const base = `${h.get("x-forwarded-proto") ?? "http"}://${
    h.get("x-forwarded-host") ?? h.get("host")
  }`;

  const res = await fetch(
    `${base}/api/products/${encodeURIComponent(
      productId
    )}/similar?lang=${locale}&limit=${limit}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;

  const items = (await res.json()) as ProductSummaryDTO[];
  if (!items?.length) return null;

  return (
    <ProductCarousel
      products={items}
      title={translatedTitle}
      className={className}
    />
  );
}
