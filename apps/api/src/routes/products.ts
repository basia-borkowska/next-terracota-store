import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { toProductDTO, toProductSummaryDTO } from "../lib/mappers.js";

export const products = Router();

products.get("/products", async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page ?? 1));
    const size = Math.max(1, Math.min(60, Number(req.query.size ?? 12)));
    const skip = (page - 1) * size;

    const lang = (req.query.lang as "en" | "pl") ?? "en";
    const category = (req.query.category as string | undefined)?.trim();
    const isNew = req.query.isNew === "true";
    const onSale = req.query.onSale === "true";

    // temp solution for fetching specific products by ids - wishlist
    if (req.query.ids) {
      const ids = (req.query.ids as string).split(",");
      const rows = await prisma.product.findMany({
        where: { id: { in: ids } },
      });
      return res.json({
        items: rows.map((p) => toProductSummaryDTO(p, lang)),
        page: 1,
        size: rows.length,
        total: rows.length,
      });
    }

    // Build Prisma where clause
    const where: import("@prisma/client").Prisma.ProductWhereInput = {};
    if (category) where.category = category as any; // enum value (e.g., "chair")
    if (isNew) where.isNew = true;
    if (onSale) where.discountedPrice = { not: null };

    const [rows, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: size,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      items: rows.map((p) => toProductSummaryDTO(p, lang)),
      page,
      size,
      total,
    });
  } catch (err) {
    next(err);
  }
});

products.get("/products/:id", async (req, res, next) => {
  try {
    const lang = (req.query.lang as "en" | "pl") ?? "en";
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(toProductDTO(product, lang));
  } catch (err) {
    next(err);
  }
});

products.get("/products/:id/similar", async (req, res, next) => {
  try {
    const lang = (req.query.lang as "en" | "pl") ?? "en";
    const size = Math.max(1, Math.min(24, Number(req.query.size ?? 12)));

    const base = await prisma.product.findUnique({
      where: { id: req.params.id },
      select: { id: true, category: true },
    });
    if (!base) return res.status(404).json({ error: "Not found" });

    const rows = await prisma.product.findMany({
      where: {
        category: base.category,
        id: { not: base.id },
      },
      take: size,
      orderBy: { createdAt: "desc" },
    });

    res.json({
      items: rows.map((p) => toProductSummaryDTO(p, lang)),
      size,
      baseId: base.id,
    });
  } catch (err) {
    next(err);
  }
});
