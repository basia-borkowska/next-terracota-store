import { Suspense } from "react";
import { headers } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import { ProductCarouselSkeleton } from "../ProductCarousel/ProductCarousel.skeleton";

type Props = {
  title?: string;
  limit?: number;
  className?: string;
  revalidate?: number; // ISR seconds
};

export default function NewProductsCarousel(props: Props) {
  return (
    <Suspense fallback={<ProductCarouselSkeleton />}>
      <NewProductsInner {...props} />
    </Suspense>
  );
}

async function NewProductsInner({
  title,
  limit = 12,
  className,
  revalidate = 60,
}: Props) {
  const locale = await getLocale();
  const t = await getTranslations({ locale });
  const translatedTitle = title ?? t("widgets.carousels.newProducts");

  // Build absolute base URL for server-side fetch
  const h = await headers();
  const base = `${h.get("x-forwarded-proto") ?? "http"}://${
    h.get("x-forwarded-host") ?? h.get("host")
  }`;

  const res = await fetch(
    `${base}/api/products?lang=${locale}&isNew=true&limit=${limit}`,
    { next: { revalidate } }
  );
  if (!res.ok) return null;

  const data = await res.json();
  const items = Array.isArray(data) ? data : data.items ?? [];
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
