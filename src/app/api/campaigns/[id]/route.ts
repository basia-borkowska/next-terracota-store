import { prisma } from "@shared/lib/db";
import { getLangFromSearch, json } from "@shared/lib/http";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(req.url);
  const lang = getLangFromSearch(url.searchParams);

  const campaign = await prisma.campaign.findUnique({
    where: { id: params.id },
    include: {
      products: {
        orderBy: { position: "asc" },
        select: { productId: true, position: true },
      },
    },
  });

  if (!campaign) return json({ error: "Not found" }, { status: 404 });

  return json({
    id: campaign.id,
    title: lang === "pl" ? campaign.title_pl : campaign.title_en,
    description:
      lang === "pl" ? campaign.description_pl : campaign.description_en,
    story: lang === "pl" ? campaign.story_pl : campaign.story_en,
    images: campaign.images,
    products: campaign.products,
  });
}
