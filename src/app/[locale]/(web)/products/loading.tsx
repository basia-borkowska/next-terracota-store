import { ProductGridSkeleton } from "@/widgets/ProductGrid/ProductGrid.skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <ProductGridSkeleton count={12} />
    </main>
  );
}
