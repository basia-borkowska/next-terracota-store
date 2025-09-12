import { Container } from "@/shared/ui/layout/Container";
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
    <Container>
      <ProductGrid items={items} />
      {/* Later we add a client "Load more" for infinite scroll */}
    </Container>
  );
}
