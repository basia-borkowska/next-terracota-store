import { fetchProductsList } from "@shared/lib/api/products";
import ProductGrid from "@widgets/ProductGrid/ProductGrid";

export const revalidate = 10; // ISR for this page

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const locale = params.locale as "en" | "pl";
  const { items } = await fetchProductsList(
    {
      page: 1,
      limit: 24,
      lang: locale,
    },
    base
  );

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="bg-amber-500">test</div>
      <div className="max-w-[700px]">
        <ProductGrid items={items} />
      </div>
      {/* Later we add a client "Load more" for infinite scroll */}
    </main>
  );
}
