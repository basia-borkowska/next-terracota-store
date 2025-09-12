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
    lang?: "en" | "pl";
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
