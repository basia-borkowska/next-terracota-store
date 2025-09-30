import { getTranslations } from "next-intl/server";
import type { Locale } from "@/shared/lib/types";
import PageHeader from "@/shared/ui/molecules/PageHeader/PageHeader";
import { MasonryGrid } from "@/shared/ui/molecules/MasonryGrid";
import { Container } from "@/shared/ui/layout/Container";
import {
  getCampaignById,
  getCampaignProducts,
} from "@/shared/lib/api/campaigns";
import ProductGrid from "@/widgets/ProductGrid/ProductGrid";

export default async function InspirationsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "inspirations" });

  // Fetch a single campaign by id (cmp_001).
  const campaign = await getCampaignById("cmp_001", locale);

  if (!campaign) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <PageHeader title={t("title")} description={t("description")} />
        <p className="text-sm text-gray-600">
          {t("empty", { default: "No campaigns yet." })}
        </p>
      </main>
    );
  }

  const products = await getCampaignProducts(campaign.id, 30, locale);
  const { title, description, images, story } = campaign;

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
      {products.items?.length > 0 && (
        <Container className="my-10">
          <h2 className="text-lg font-semibold">{title}</h2>
          <ProductGrid items={products.items} />
        </Container>
      )}
    </main>
  );
}
