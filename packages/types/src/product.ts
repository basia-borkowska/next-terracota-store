import { z } from "zod";

export const Lang = z.enum(["en", "pl"]);
export type Lang = z.infer<typeof Lang>;

export const ProductSummaryDTO = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  discountedPrice: z.number().nullable().optional(),
  currency: z.string(),
  isNew: z.boolean(),
  onSale: z.boolean(),
  createdAt: z.string(),
  category: z.string(),
  images: z.array(z.string()),
});

export const ProductDTO = ProductSummaryDTO.extend({
  description: z.string(),
});

export type ProductSummaryDTO = z.infer<typeof ProductSummaryDTO>;
export type ProductDTO = z.infer<typeof ProductDTO>;
