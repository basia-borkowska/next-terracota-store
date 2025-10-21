import { z } from "zod";

export type Locale = "en" | "pl";

export const Paginated = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    page: z.number().int().positive().default(1),
    size: z.number().int().positive(),
    total: z.number().int().nonnegative(),
  });

export type Paginated<T> = {
  items: T[];
  page: number;
  size: number;
  total: number;
};

export const Me = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  role: z.enum(["user", "admin"]),
});
export type Me = z.infer<typeof Me>;
