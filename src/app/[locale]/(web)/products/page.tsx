import { Container } from "@/shared/ui/layout/Container";
import ProductsInfinite from "./ProductsInfinite";

export default async function ProductsPage({
  params,
}: {
  params: { locale: "en" | "pl" };
}) {
  return (
    <Container>
      <ProductsInfinite lang={params.locale} limit={24} />
    </Container>
  );
}
