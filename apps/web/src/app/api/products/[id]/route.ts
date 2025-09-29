import { prisma } from "@shared/lib/db";
import { getLangFromSearch, json } from "@shared/lib/http";
import { toProductDetail } from "@entities/product/mappers";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(req.url);
  const lang = getLangFromSearch(url.searchParams);

  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return json({ error: "Not found" }, { status: 404 });

  return json(toProductDetail(product, lang));
}
