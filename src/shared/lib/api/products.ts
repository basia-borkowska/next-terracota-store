import { getBaseUrl } from "../next";
import { Locale } from "../types";

export type ProductDTO = {
  id: string;
  title: string;
  description: string;
  images: string[]; // full set for detail endpoint
  price: number;
  discountedPrice: number | null;
  currency: string;
  isNew: boolean;
  category: string;
};

export type ProductSummaryDTO = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number; // already converted in API
  discountedPrice: number | null;
  currency: string;
  isNew: boolean;
  images: string[]; // first 2 images
};

export type ProductsListResponse = {
  items: ProductSummaryDTO[];
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
};

/** Server-safe fetch wrapper (RSC) */
export async function fetchProductsList(
  params: {
    page?: number;
    limit?: number;
    lang?: Locale;
    category?: string;
    isNew?: boolean;
    onSale?: boolean;
  },
  baseUrl = "" // pass absolute base from the page
) {
  const { page = 1, limit = 30, lang = "en", category, isNew, onSale } = params;
  const q = new URLSearchParams();
  q.set("page", String(page));
  q.set("limit", String(limit));
  q.set("lang", lang);
  if (category) q.set("category", category);
  if (isNew) q.set("isNew", "true");
  if (onSale) q.set("onSale", "true");

  const url = `${baseUrl}/api/products?${q.toString()}`;
  const res = await fetch(url, {
    // cache strategy: revalidate often while developing
    next: { revalidate: 10 },
  });
  if (!res.ok) throw new Error("Failed to load products");
  return (await res.json()) as ProductsListResponse;
}

export async function getProductById(id: string, lang: "en" | "pl") {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/products/${id}?lang=${lang}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as ProductDTO;
}
