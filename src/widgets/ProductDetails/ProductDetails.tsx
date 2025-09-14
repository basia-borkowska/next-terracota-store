"use client";

import Price from "@/shared/ui/molecules/Price";
import { ProductDTO } from "@/shared/lib/api/products";
import { Button } from "@/shared/ui/atoms/Button";
import NewInBadge from "@/shared/ui/atoms/NewInBadge";
import DiscountBadge from "@/shared/ui/atoms/DiscountBadge";
import { useTranslations } from "next-intl";
import WishlistButton from "@/features/ui/WishlistButton";

type Props = {
  product: ProductDTO;
};

export default function ProductDetails({ product }: Props) {
  const t = useTranslations();

  const onAddToCart = () =>
    alert(`TODO this action will be moved to addToCard button `);

  const { id, discountedPrice, isNew, price, currency, description, title } =
    product;

  return (
    <div className="flex flex-col">
      <div className="flex gap-1 mb-2">
        {discountedPrice && <DiscountBadge className="w-fit" />}
        {isNew && <NewInBadge className="w-fit" />}
      </div>

      <h1 className="text-3xl font-medium mb-4">{title}</h1>
      <p className="mb-6 text-sm">{description}</p>

      <Price
        price={price}
        discountedPrice={discountedPrice}
        currency={currency}
      />

      <div className="mt-8 flex items-center gap-2">
        <Button className="flex-1" onClick={onAddToCart}>
          {t("widgets.productDetails.addToCart")}
        </Button>

        <WishlistButton productId={id} variant="secondary" />
      </div>
    </div>
  );
}
