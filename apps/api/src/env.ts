import { z } from "zod";

export const env = z
  .object({
    PORT: z.coerce.number().default(4000),
    WEB_ORIGIN: z.string().url().default("http://localhost:3000"),
    DATABASE_URL: z.string().min(1),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    SESSION_SECRET: z.string().min(12),
    SESSION_NAME: z.string().default("sid"),
  })
  .parse(process.env);
