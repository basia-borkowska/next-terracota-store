"use client";

import ProductCard from "@widgets/ProductCard/ProductCard";
import type { ProductSummaryDTO } from "@shared/lib/api/products";
import { useTranslations } from "next-intl";

type Props = { items: ProductSummaryDTO[] };

export default function ProductGrid({ items }: Props) {
  const t = useTranslations();

  if (!items.length)
    return <p className="text-sm text-gray-500">No products found.</p>;
  return (
    <div className="flex flex-col gap-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">
          {t("common.products")} ({items.length})
        </h1>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
