import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const products = Router();

products.get("/products", async (req, res, next) => {
  try {
    const page = Number(req.query.page ?? 1);
    const size = Number(req.query.size ?? 12);
    const skip = Math.max(0, (page - 1) * size);

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: size,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count(),
    ]);

    res.json({ items, page, size, total });
  } catch (error) {
    next(error);
  }
});

products.get("/products/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
});
