import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";

const prisma = new PrismaClient();

const ProductEN = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  category: z.enum(["table", "chair", "bed", "sofa", "carpet", "lamp"]),
  price: z.number(),
  discountedPrice: z.number().nullable().optional(),
  currency: z.string().default("PLN"),
  isNew: z.boolean().default(false),
});
const ProductPL = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

const CampaignEN = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  story: z.string(),
  images: z.array(z.string()),
  products: z.array(z.string()).default([]),
});
const CampaignPL = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  story: z.string(),
});

async function readJson<T>(p: string): Promise<T> {
  const abs = path.resolve(p);
  const raw = await fs.readFile(abs, "utf8");
  return JSON.parse(raw) as T;
}

async function main() {
  console.log("🌱 Seeding database…");

  // --- Load & validate products ---
  const enProductsRaw = await readJson<unknown[]>(
    "src/seed-data/en/products.json"
  );
  const plProductsRaw = await readJson<unknown[]>(
    "src/seed-data/pl/products.json"
  );

  const enProducts = enProductsRaw.map((p, i) => {
    const parsed = ProductEN.safeParse(p);
    if (!parsed.success) {
      console.error(
        "Invalid EN product at index",
        i,
        parsed.error.flatten().fieldErrors
      );
      throw new Error("Invalid EN products.json");
    }
    return parsed.data;
  });

  const plById = new Map(
    plProductsRaw
      .map((p) => {
        const parsed = ProductPL.safeParse(p);
        if (!parsed.success) return null;
        return [parsed.data.id, parsed.data] as const;
      })
      .filter(Boolean) as [string, z.infer<typeof ProductPL>][]
  );

  // --- Upsert products (merge EN + PL) ---
  for (const p of enProducts) {
    const pl = plById.get(p.id);
    await prisma.product.upsert({
      where: { id: p.id },
      update: {
        title_en: p.title,
        title_pl: pl?.title ?? p.title, // fallback to EN
        description_en: p.description,
        description_pl: pl?.description ?? p.description,
        images: p.images,
        category: p.category,
        price: p.price.toString(), // Decimal
        discountedPrice:
          p.discountedPrice != null ? p.discountedPrice.toString() : null,
        currency: p.currency ?? "PLN",
        isNew: p.isNew ?? false,
      },
      create: {
        id: p.id,
        title_en: p.title,
        title_pl: pl?.title ?? p.title,
        description_en: p.description,
        description_pl: pl?.description ?? p.description,
        images: p.images,
        category: p.category,
        price: p.price.toString(),
        discountedPrice:
          p.discountedPrice != null ? p.discountedPrice.toString() : null,
        currency: p.currency ?? "PLN",
        isNew: p.isNew ?? false,
      },
    });
  }

  // --- Load & validate campaigns ---
  const enCampaignsRaw = await readJson<unknown[]>(
    "src/seed-data/en/campaigns.json"
  );
  const plCampaignsRaw = await readJson<unknown[]>(
    "src/seed-data/pl/campaigns.json"
  );

  const enCampaigns = enCampaignsRaw.map((c, i) => {
    const parsed = CampaignEN.safeParse(c);
    if (!parsed.success) {
      console.error(
        "Invalid EN campaign at index",
        i,
        parsed.error.flatten().fieldErrors
      );
      throw new Error("Invalid EN campaigns.json");
    }
    return parsed.data;
  });

  const plCampById = new Map(
    plCampaignsRaw
      .map((c) => {
        const parsed = CampaignPL.safeParse(c);
        if (!parsed.success) return null;
        return [parsed.data.id, parsed.data] as const;
      })
      .filter(Boolean) as [string, z.infer<typeof CampaignPL>][]
  );

  // --- Upsert campaigns & ordered products via join table ---
  for (const c of enCampaigns) {
    const pl = plCampById.get(c.id);

    await prisma.campaign.upsert({
      where: { id: c.id },
      update: {
        title_en: c.title,
        title_pl: pl?.title ?? c.title,
        description_en: c.description,
        description_pl: pl?.description ?? c.description,
        story_en: c.story,
        story_pl: pl?.story ?? c.story,
        images: c.images,
      },
      create: {
        id: c.id,
        title_en: c.title,
        title_pl: pl?.title ?? c.title,
        description_en: c.description,
        description_pl: pl?.description ?? c.description,
        story_en: c.story,
        story_pl: pl?.story ?? c.story,
        images: c.images,
      },
    });

    // clear & recreate campaign-product ordering
    await prisma.campaignProduct.deleteMany({ where: { campaignId: c.id } });

    for (let i = 0; i < c.products.length; i++) {
      const pid = c.products[i];
      // only create relation if product exists
      await prisma.campaignProduct
        .create({
          data: { campaignId: c.id, productId: pid, position: i },
        })
        .catch(() => {
          console.warn(
            `Skipped relation campaign=${c.id} product=${pid} (product missing)`
          );
        });
    }
  }

  console.log("✅ Seed finished");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
