"use client";

import ProductCard from "@/widgets/ProductCard/ProductCard";
import type { ProductSummaryDTO } from "@shared/lib/api/products";
import { useTranslations } from "next-intl";

type Props = { items: ProductSummaryDTO[]; showNewBadge?: boolean };

export default function ProductGrid({ items, showNewBadge }: Props) {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm self-end">
        {t("common.product", { count: items.length }).toLocaleLowerCase()}
      </span>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} showNewBadge={showNewBadge} />
        ))}
      </div>
    </div>
  );
}
