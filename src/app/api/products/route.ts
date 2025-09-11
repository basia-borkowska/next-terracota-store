import { prisma } from "@shared/lib/db";
import { getLangFromSearch, num, bool, json } from "@shared/lib/http";
import { toProductSummary } from "@entities/product/mappers";

import type { Product } from ".prisma/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const lang = getLangFromSearch(sp);
  const page = num(sp, "page", 1);
  const limit = num(sp, "limit", 30);
  const category = sp.get("category"); // e.g. "sofa"
  const isNew = bool(sp, "isNew");
  const onSale = bool(sp, "onSale");

  const where: { [key: string]: unknown } = {};
  if (category) where.category = category; // assumes lowercase enum in schema
  if (isNew) where.isNew = true;
  if (onSale) where.discountedPrice = { not: null };

  const total = await prisma.product.count({ where });
  const items = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const summaries = items.map((p: Product) => toProductSummary(p, lang));

  return json({
    items: summaries,
    page,
    limit,
    total,
    hasNext: page * limit < total,
  });
}
