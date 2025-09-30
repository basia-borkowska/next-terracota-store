import { Product, Prisma, Campaign } from "@prisma/client";

/* ---------- Product DTOs ---------- */
export type ProductSummaryDTO = {
  id: string;
  title: string;
  price: number;
  discountedPrice?: number | null;
  currency: string;
  isNew: boolean;
  onSale: boolean;
  createdAt: string;
  category: string;
  images: string[];
};

export type ProductDTO = ProductSummaryDTO & {
  description: string;
};

function toNumber(value: Prisma.Decimal | number | null | undefined) {
  return value == null
    ? value
    : (value as any)?.toNumber
    ? (value as Prisma.Decimal).toNumber()
    : (value as number);
}

export function toProductSummaryDTO(
  p: Product,
  lang: "en" | "pl"
): ProductSummaryDTO {
  const discounted = toNumber(p.discountedPrice) ?? null;
  return {
    id: p.id,
    title: lang === "pl" ? p.title_pl : p.title_en,
    price: toNumber(p.price) as number,
    discountedPrice: discounted,
    currency: p.currency,
    isNew: p.isNew,
    onSale: discounted != null,
    createdAt: p.createdAt.toISOString(),
    category: p.category,
    images: p.images.slice(0, 2),
  };
}

export function toProductDTO(p: Product, lang: "en" | "pl"): ProductDTO {
  return {
    ...toProductSummaryDTO(p, lang),
    images: p.images,
    description: lang === "pl" ? p.description_pl : p.description_en,
  };
}

/* ---------- Campaign DTOs ---------- */
export type CampaignSummaryDTO = {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
};

export type CampaignDTO = CampaignSummaryDTO & {
  story: string;
};

export function toCampaignSummaryDTO(
  c: Campaign,
  lang: "en" | "pl"
): CampaignSummaryDTO {
  return {
    id: c.id,
    title: lang === "pl" ? c.title_pl : c.title_en,
    description: lang === "pl" ? c.description_pl : c.description_en,
    images: c.images,
    createdAt: c.createdAt.toISOString(),
  };
}

export function toCampaignDTO(c: Campaign, lang: "en" | "pl"): CampaignDTO {
  return {
    ...toCampaignSummaryDTO(c, lang),
    story: lang === "pl" ? c.story_pl : c.story_en,
  };
}
