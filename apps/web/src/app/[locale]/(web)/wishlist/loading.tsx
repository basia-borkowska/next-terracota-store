import { Container } from "@/shared/ui/layout/Container";
import { ProductGridSkeleton } from "@/widgets/ProductGrid/ProductGrid.skeleton";

export default function Loading() {
  return (
    <Container>
      <ProductGridSkeleton />
    </Container>
  );
}
