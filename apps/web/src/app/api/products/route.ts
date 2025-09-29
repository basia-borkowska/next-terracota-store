import { prisma } from "@/shared/lib/db";
import { getLangFromSearch, num, bool, json } from "@/shared/lib/http";
import { toProductSummary } from "@/entities/product/mappers";
import type { Product } from ".prisma/client";

/**
 * GET /api/products
 *
 * Supports:
 *  - ids=a,b,c            (batch by ids; uniform envelope; no pagination)
 *  - page,limit           (pagination)
 *  - category,isNew,onSale (filters)
 *
 * Always returns a uniform envelope:
 * {
 *   items: ProductSummaryDTO[],
 *   page: number,
 *   limit: number,
 *   total: number,
 *   hasNext: boolean
 * }
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const lang = getLangFromSearch(sp);

  // Optional: explicit ids for wishlist/batch fetch
  const idsParam = sp.get("ids");
  const ids = idsParam
    ? idsParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;

  // List filters (used only when ids are not provided)
  const page = num(sp, "page", 1);
  const limit = num(sp, "limit", 30);
  const category = sp.get("category"); // e.g. "sofa"
  const isNew = bool(sp, "isNew");
  const onSale = bool(sp, "onSale");

  // --- Branch A: explicit ids (wishlist / batch lookup) ---------------------
  if (ids && ids.length) {
    const rows = await prisma.product.findMany({
      where: { id: { in: ids } },
    });

    // preserve requested order
    const index = new Map(ids.map((id, i) => [id, i]));
    rows.sort((a, b) => (index.get(a.id) ?? 0) - (index.get(b.id) ?? 0));

    const items = rows.map((p: Product) =>
      toProductSummary(p as unknown as Product, lang)
    );

    // Return a uniform envelope (no pagination for ids)
    return json({
      items,
      page: 1,
      limit: items.length,
      total: items.length,
      hasNext: false,
    });
  }

  // --- Branch B: regular listing (filters + pagination) ---------------------
  const where: Record<string, unknown> = {};
  if (category) where.category = category; // adjust if enum in your schema
  if (isNew) where.isNew = true;
  if (onSale) where.discountedPrice = { not: null };

  const total = await prisma.product.count({ where });
  const rows = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const items = rows.map((p: Product) =>
    toProductSummary(p as unknown as Product, lang)
  );

  return json({
    items,
    page,
    limit,
    total,
    hasNext: page * limit < total,
  });
}
