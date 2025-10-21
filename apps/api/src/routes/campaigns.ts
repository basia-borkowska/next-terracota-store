import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import {
  toCampaignDTO,
  toCampaignSummaryDTO,
  toProductSummaryDTO,
} from "../lib/mappers.js";
import { Locale } from "@terracota/types";

export const campaigns = Router();

campaigns.get("/campaigns", async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page ?? 1));
    const size = Math.max(1, Math.min(60, Number(req.query.size ?? 12)));
    const skip = (page - 1) * size;
    const lang = (req.query.lang as Locale) ?? "en";

    const [rows, total] = await Promise.all([
      prisma.campaign.findMany({
        skip,
        take: size,
        orderBy: { createdAt: "desc" },
      }),
      prisma.campaign.count(),
    ]);

    res.json({
      items: rows.map((c) => toCampaignSummaryDTO(c, lang)),
      page,
      size,
      total,
    });
  } catch (err) {
    next(err);
  }
});

campaigns.get("/campaigns/:id", async (req, res, next) => {
  try {
    const lang = (req.query.lang as Locale) ?? "en";
    const c = await prisma.campaign.findUnique({
      where: { id: req.params.id },
    });
    if (!c) return res.status(404).json({ error: "Not found" });
    res.json(toCampaignDTO(c, lang));
  } catch (err) {
    next(err);
  }
});

campaigns.get("/campaigns/:id/products", async (req, res, next) => {
  try {
    const lang = (req.query.lang as Locale) ?? "en";
    const size = Math.max(1, Math.min(60, Number(req.query.size ?? 30)));

    const cps = await prisma.campaignProduct.findMany({
      where: { campaignId: req.params.id },
      orderBy: { position: "asc" },
      take: size,
      include: { product: true },
    });

    if (cps.length === 0) {
      const exists = await prisma.campaign.findUnique({
        where: { id: req.params.id },
        select: { id: true },
      });
      if (!exists) return res.status(404).json({ error: "Not found" });
    }

    const items = cps.map((cp) => toProductSummaryDTO(cp.product, lang));
    res.json({ items, size, campaignId: req.params.id });
  } catch (err) {
    next(err);
  }
});
