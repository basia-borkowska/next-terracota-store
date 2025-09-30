import { ProductDTO, ProductSummaryDTO } from "@/entities/product/types";
import { Locale } from "../types";
import { apiGet } from "../http";

export type ProductsListResponse = {
  items: ProductSummaryDTO[];
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
};

// Matches Express API shape
type ExpressProductsResponse<T> = {
  items: T[];
  page: number;
  size: number;
  total: number;
};

/** Server-safe fetch wrapper (RSC) now hitting Express */
export async function getProducts(params: {
  page?: number;
  limit?: number; // will map to Express "size"
  lang?: Locale;
  category?: string;
  isNew?: boolean;
  onSale?: boolean;
}) {
  const { page = 1, limit = 30, lang = "en", category, isNew, onSale } = params;

  const q = new URLSearchParams();
  q.set("page", String(page));
  q.set("size", String(limit)); // Express expects "size"
  q.set("lang", lang); // forwarded (ignored by API until implemented)
  if (category) q.set("category", category);
  if (isNew) q.set("isNew", "true");
  if (onSale) q.set("onSale", "true");

  const data = await apiGet<ExpressProductsResponse<ProductSummaryDTO>>(
    `/products?${q.toString()}`
  );

  // map Express response to your existing shape
  const mapped: ProductsListResponse = {
    items: data.items,
    page: data.page,
    limit: data.size,
    total: data.total,
    hasNext: data.page * data.size < data.total,
  };
  return mapped;
}

export async function getProductById(id: string, lang: "en" | "pl") {
  try {
    return await apiGet<ProductDTO>(`/products/${id}?lang=${lang}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.status === 404) return null;
    throw error;
  }
}

export async function getSimilarProducts(
  id: string,
  size = 12,
  lang: "en" | "pl" = "en"
) {
  const q = new URLSearchParams({ size: String(size), lang });
  return apiGet<{ items: ProductSummaryDTO[]; size: number; baseId: string }>(
    `/products/${id}/similar?${q.toString()}`
  );
}

export async function fetchProductsByIds(ids: string[], lang: "en" | "pl") {
  if (ids.length === 0) return [];
  const q = new URLSearchParams({ ids: ids.join(","), lang });
  const res = await apiGet<{ items: ProductSummaryDTO[] }>(
    `/products?${q.toString()}`
  );
  return res.items;
}
