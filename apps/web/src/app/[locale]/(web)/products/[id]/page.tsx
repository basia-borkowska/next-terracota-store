import { getProductById } from "@/shared/lib/api/products";
import { Locale } from "@/shared/lib/types";
import { Container } from "@/shared/ui/layout/Container";
import NewProductsCarousel from "@/widgets/carousels/NewProductsCarousel/NewProductsCarousel";
import SimilarProductsCarousel from "@/widgets/carousels/SimilarProductsCarousel/SimilarProductsCarousel";
import { Gallery } from "@/widgets/Gallery/Gallery";
import ProductDetails from "@/widgets/ProductDetails/ProductDetails";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 0;

type Params = Promise<{ locale: Locale; id: string }>;

export default async function ProductPage({ params }: { params: Params }) {
  const { locale, id } = await params;
  const product = await getProductById(id, locale);
  if (!product) notFound();

  return (
    <div className="flex flex-col gap-12">
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-2">
          <Gallery images={product.images} />
        </div>

        <aside className="md:col-span-1 md:sticky md:top-navbar-height self-start py-6 md:py-12 md:px-12">
          <ProductDetails product={product} />
        </aside>
      </div>

      <Container className="flex flex-col gap-12">
        <SimilarProductsCarousel productId={product.id} />
        <NewProductsCarousel />
      </Container>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const product = await getProductById(id, locale);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.title} – Terracota`,
    description: product.description?.slice(0, 160),
  };
}
