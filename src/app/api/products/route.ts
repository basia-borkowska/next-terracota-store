import { prisma } from "@shared/lib/db";
import { getLangFromSearch, num, bool, json } from "@shared/lib/http";
import { toProductSummary } from "@entities/product/mappers";
import type { Product } from ".prisma/client";

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

  // List filters (used only when ids is not provided)
  const page = num(sp, "page", 1);
  const limit = num(sp, "limit", 30);
  const category = sp.get("category"); // e.g. "sofa"
  const isNew = bool(sp, "isNew");
  const onSale = bool(sp, "onSale");

  // --- Branch A: explicit ids (wishlist) -----------------------------------
  if (ids && ids.length) {
    // Fetch by ids (order from DB is arbitrary)
    const rows = await prisma.product.findMany({
      where: { id: { in: ids } }, // if your id is numeric, map to Number(id)
      // You can include relations here if your mapper needs them
    });

    // Re-map to requested order
    const index = new Map(ids.map((id, i) => [id, i]));
    rows.sort((a, b) => (index.get(a.id) ?? 0) - (index.get(b.id) ?? 0));

    const items = rows.map((p: Product) => toProductSummary(p, lang));

    // For wishlist we typically return all items; no pagination
    return json({
      items,
      page: 1,
      limit: items.length,
      total: items.length,
      hasNext: false,
    });
  }

  // --- Branch B: regular listing (filters + pagination) ---------------------
  const where: { [key: string]: unknown } = {};
  if (category) where.category = category; // adjust to your schema
  if (isNew) where.isNew = true;
  if (onSale) where.discountedPrice = { not: null };

  const total = await prisma.product.count({ where });
  const rows = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const items = rows.map((p: Product) => toProductSummary(p, lang));

  return json({
    items,
    page,
    limit,
    total,
    hasNext: page * limit < total,
  });
}
