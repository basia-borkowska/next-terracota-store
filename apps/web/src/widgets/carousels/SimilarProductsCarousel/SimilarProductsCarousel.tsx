import { Suspense } from "react";
import { ProductCarouselSkeleton } from "../ProductCarousel/ProductCarousel.skeleton";
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import { getLocale, getTranslations } from "next-intl/server";
import { getSimilarProducts } from "@/shared/lib/api/products";
import { Locale } from "@/shared/lib/types";

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
  const { items } = await getSimilarProducts(
    productId,
    limit,
    locale as Locale
  );
  if (!items?.length) return null;

  return (
    <ProductCarousel
      products={items}
      title={translatedTitle}
      className={className}
    />
  );
}
