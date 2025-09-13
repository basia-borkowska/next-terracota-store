import Skeleton from "@/shared/ui/atoms/Skeleton";
import { Container } from "@/shared/ui/layout/Container";
import { GallerySkeleton } from "@/widgets/Gallery/Gallery.skeleton";
import { ProductDetailsSkeleton } from "@/widgets/ProductDetails/ProductDetails.skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-12">
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-2">
          <GallerySkeleton />
        </div>

        <aside className="md:col-span-1 md:sticky md:top-navbar self-start py-6 md:py-12 md:px-12">
          <ProductDetailsSkeleton />
        </aside>
      </div>

      <Container className="flex flex-col gap-12">
        <Skeleton className="h-96 w-full" />
        {/* <SimilarProductsCarousel productId={product.id} /> */}
        {/* <NewProductsCarousel /> */}
      </Container>
    </div>
  );
}
