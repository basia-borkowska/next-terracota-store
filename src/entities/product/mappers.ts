import type { Product, Prisma } from ".prisma/client";
import type { Lang } from "@shared/lib/http";

function decToNumber(d: Prisma.Decimal | null): number | null {
  return d == null ? null : Number(d);
}

// Summary: only first 2 images
export function toProductSummary(p: Product, lang: Lang) {
  return {
    id: p.id,
    title: lang === "pl" ? p.title_pl : p.title_en,
    description: lang === "pl" ? p.description_pl : p.description_en,
    category: p.category, // enum string (we recommend lowercase in schema)
    price: decToNumber(p.price)!,
    discountedPrice: decToNumber(p.discountedPrice),
    currency: p.currency,
    isNew: p.isNew,
    images: (p.images ?? []).slice(0, 2),
  };
}

export function toProductDetail(p: Product, lang: Lang) {
  return {
    id: p.id,
    title: lang === "pl" ? p.title_pl : p.title_en,
    description: lang === "pl" ? p.description_pl : p.description_en,
    category: p.category,
    price: decToNumber(p.price)!,
    discountedPrice: decToNumber(p.discountedPrice),
    currency: p.currency,
    isNew: p.isNew,
    images: p.images ?? [], // all images
  };
}
