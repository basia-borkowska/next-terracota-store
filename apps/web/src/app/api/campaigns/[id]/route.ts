import { prisma } from "@/shared/lib/db";
import { getLangFromSearch, json } from "@/shared/lib/http";
import { toCampaignDetail } from "@/entities/campaign/mappers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(req.url);
  const lang = getLangFromSearch(url.searchParams);

  const campaign = await prisma.campaign.findUnique({
    where: { id },
  });
  if (!campaign) return json({ error: "Not found" }, { status: 404 });

  // grab ordered product ids
  const links = await prisma.campaignProduct.findMany({
    where: { campaignId: id },
    orderBy: { position: "asc" },
    select: { productId: true },
  });
  const productIds = links.map((l) => l.productId);

  // map localized DTO and inject ordered ids
  const dto = toCampaignDetail(campaign, productIds, lang);

  return json(dto);
}
