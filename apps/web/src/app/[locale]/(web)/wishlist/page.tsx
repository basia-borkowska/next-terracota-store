import { LocaleParams } from "@/shared/lib/types";
import WishlistPageClient from "./WishlistPageClient";

export default async function WishlistPage({
  params,
}: {
  params: LocaleParams;
}) {
  const { locale } = await params;

  return (
    <>
      <WishlistPageClient locale={locale} />
    </>
  );
}
