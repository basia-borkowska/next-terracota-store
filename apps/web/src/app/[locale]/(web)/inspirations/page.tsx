import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/shared/lib/types";
import PageHeader from "@/shared/ui/molecules/PageHeader/PageHeader";
import { MasonryGrid } from "@/shared/ui/molecules/MasonryGrid";
import ProductsByIdsGrid from "@/widgets/ProductGrid/ProductsByIdsGrid";
import { Container } from "@/shared/ui/layout/Container";
import { CampaignDetailDTO } from "@/entities/campaign/types";

export const revalidate = 60; // tweak as you like (0 during heavy dev)

export default async function InspirationsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "inspirations" });

  // Build absolute base URL for server-side fetches
  const h = await headers();
  const base = `${h.get("x-forwarded-proto") ?? "http"}://${
    h.get("x-forwarded-host") ?? h.get("host")
  }`;

  // Fetch a single campaign by id (cmp_001). Change if you want "first campaign" instead.
  const res = await fetch(`${base}/api/campaigns/cmp_001?lang=${locale}`, {
    next: { revalidate },
  });

  if (res.status === 404) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <PageHeader title={t("title")} description={t("description")} />
        <p className="text-sm text-gray-600">
          {t("empty", { default: "No campaigns yet." })}
        </p>
      </main>
    );
  }
  if (!res.ok) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <PageHeader title={t("title")} description={t("description")} />
        <p className="text-sm text-red-600">
          {t("error", { default: "Failed to load inspirations." })}
        </p>
      </main>
    );
  }

  const campaign = (await res.json()) as CampaignDetailDTO;
  const { title, description, images, products, story } = campaign;

  return (
    <main>
      <Container>
        <PageHeader title={title} description={description ?? ""} />
      </Container>

      {/* Masonry gallery (use <img> for variable-height tiles) */}
      <div className="relative max-h-[1800px] overflow-hidden">
        <MasonryGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {images.map((src, i) => (
            <MasonryGrid.Item key={`${src}/${i}`}>
              <img
                src={src}
                alt={`Inspiration ${i + 1}`}
                className="block h-auto w-full object-cover"
                loading={i < 4 ? "eager" : "lazy"}
              />
            </MasonryGrid.Item>
          ))}
        </MasonryGrid>
      </div>

      {/* Long story text block */}
      {story && (
        <section className="bg-brand py-20">
          <p className="mx-auto max-w-[1000px] text-center leading-8 text-light">
            {story}
          </p>
        </section>
      )}

      {/* Campaign products (server component fetching by IDs) */}
      {products?.length > 0 && (
        <Container>
          <ProductsByIdsGrid ids={products} title={t("campaignProducts")} />
        </Container>
      )}
    </main>
  );
}
