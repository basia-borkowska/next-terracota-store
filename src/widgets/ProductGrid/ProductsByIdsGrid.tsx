import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import type { ProductDTO } from "@/entities/product/types";
import { cn } from "@/shared/lib/cn";
import ProductCard from "@/widgets/ProductCard/ProductCard";

type Props = {
  ids: string[];
  className?: string;
  title?: string;
  /** Override locale if needed; otherwise read from route */
  locale?: "en" | "pl";
  /** Limit how many cards to show (optional) */
  limit?: number;
};

export const revalidate = 0; // always fresh; tweak if you want caching

export default async function ProductsByIdsGrid({
  ids,
  className,
  title,
  locale,
  limit,
}: Props) {
  if (!ids?.length) return null;

  const lang = locale ?? (await getLocale());

  // Build absolute URL to avoid "Failed to parse URL from /api/..." on server
  const h = await headers();
  const base = `${h.get("x-forwarded-proto") ?? "http"}://${
    h.get("x-forwarded-host") ?? h.get("host")
  }`;

  const sp = new URLSearchParams();
  sp.set("lang", lang);
  sp.set("ids", ids.join(","));

  const res = await fetch(`${base}/api/products?${sp.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;

  // Uniform envelope expected from /api/products
  const payload = await res.json();
  const list: ProductDTO[] = payload.items ?? [];
  if (!list.length) return null;

  // Preserve incoming order
  const order = new Map(ids.map((id, i) => [id, i]));
  list.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));

  const items = typeof limit === "number" ? list.slice(0, limit) : list;

  return (
    <section className={cn(className)}>
      {title && <h2 className="mb-2 text-xl font-medium">{title}</h2>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
