import { ProductDTO, ProductSummaryDTO } from "@/entities/product/types";
import { ListResponse, Locale } from "../types";
import { apiGet } from "../http";

export async function getProducts(params: {
  page?: number;
  size?: number;
  lang?: Locale;
  category?: string;
  isNew?: boolean;
  onSale?: boolean;
}) {
  const { page = 1, size = 30, lang = "en", category, isNew, onSale } = params;

  const q = new URLSearchParams();
  q.set("page", String(page));
  q.set("size", String(size));
  q.set("lang", lang);
  if (category) q.set("category", category);
  if (isNew) q.set("isNew", "true");
  if (onSale) q.set("onSale", "true");

  return await apiGet<ListResponse<ProductSummaryDTO>>(
    `/products?${q.toString()}`
  );
}

export async function getProductById(id: string, lang: Locale) {
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
  lang: Locale = "en"
) {
  const q = new URLSearchParams({ size: String(size), lang });
  return apiGet<{ items: ProductSummaryDTO[]; size: number; baseId: string }>(
    `/products/${id}/similar?${q.toString()}`
  );
}

export async function fetchProductsByIds(ids: string[], lang: Locale) {
  if (ids.length === 0) return [];
  const q = new URLSearchParams({ ids: ids.join(","), lang });
  const res = await apiGet<{ items: ProductSummaryDTO[] }>(
    `/products?${q.toString()}`
  );
  return res.items;
}
