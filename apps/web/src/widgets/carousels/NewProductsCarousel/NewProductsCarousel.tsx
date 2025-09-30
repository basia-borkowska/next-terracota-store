import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import { ProductCarouselSkeleton } from "../ProductCarousel/ProductCarousel.skeleton";
import { getProducts } from "@/shared/lib/api/products";

type Props = {
  title?: string;
  size?: number;
  className?: string;
};

export default function NewProductsCarousel(props: Props) {
  return (
    <Suspense fallback={<ProductCarouselSkeleton />}>
      <NewProductsInner {...props} />
    </Suspense>
  );
}

async function NewProductsInner({ title, size = 12, className }: Props) {
  const locale = await getLocale();
  const t = await getTranslations({ locale });
  const translatedTitle = title ?? t("widgets.carousels.newProducts");

  const { items } = await getProducts({
    isNew: true,
    size,
    lang: locale as "en" | "pl",
    page: 1,
  });
  if (!items?.length) return null;

  return (
    <ProductCarousel
      products={items}
      title={translatedTitle}
      className={className}
      cardProps={{
        showNewBadge: false,
      }}
    />
  );
}
