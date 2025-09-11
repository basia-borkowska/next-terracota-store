import { prisma } from "@shared/lib/db";
import { getLangFromSearch, json, num } from "@shared/lib/http";
import { toProductSummary } from "@entities/product/mappers";
import type { Product } from ".prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(req.url);
  const sp = url.searchParams;
  const lang = getLangFromSearch(sp);
  const limit = num(sp, "limit", 12, 1);

  const current = await prisma.product.findUnique({ where: { id: params.id } });
  if (!current) return json([]);

  const similar = await prisma.product.findMany({
    where: { category: current.category, id: { not: current.id } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return json(similar.map((p: Product) => toProductSummary(p, lang)));
}
