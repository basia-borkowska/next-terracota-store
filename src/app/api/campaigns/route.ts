import { prisma } from "@shared/lib/db";
import { getLangFromSearch, json } from "@shared/lib/http";
import type { Campaign } from ".prisma/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = getLangFromSearch(url.searchParams);

  const rows = await prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
  });

  const items = rows.map((c: Campaign) => ({
    id: c.id,
    title: lang === "pl" ? c.title_pl : c.title_en,
    description: lang === "pl" ? c.description_pl : c.description_en,
    story: lang === "pl" ? c.story_pl : c.story_en,
    images: c.images,
  }));

  return json({ items });
}
