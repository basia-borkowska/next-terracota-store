"use client";

import { ProductSummaryDTO } from "@/entities/product/types";
import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/shared/ui/atoms/Card";
import DiscountBadge from "@/shared/ui/atoms/DiscountBadge";
import NewInBadge from "@/shared/ui/atoms/NewInBadge";
import Price from "@/shared/ui/molecules/Price";
import { ImageWithFallback } from "@/shared/ui/molecules/ImageWithFallback";
import Link from "next/link";
import { pathnames, withLocale } from "@/shared/lib/pathnames";
import { useLocale } from "next-intl";
import WishlistButton from "@/features/ui/WishlistButton";

type Props = {
  product: ProductSummaryDTO;
  showDiscountBadge?: boolean;
  showNewBadge?: boolean;
};

export default function ProductCard({
  product,
  showNewBadge = true,
  showDiscountBadge = true,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const locale = useLocale();

  const { discountedPrice, isNew, title, images, currency, price, id } =
    product;

  const mainImage = images[0];
  const hoverImage = images.length > 1 ? images[1] : null;

  return (
    <Link href={withLocale(locale, pathnames.product(id))}>
      <Card
        key={id}
        className="relative group/card cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute top-2 left-2 w-fit flex flex-col gap-2 z-10">
          {discountedPrice && showDiscountBadge && (
            <DiscountBadge className="w-fit" />
          )}
          {isNew && showNewBadge && <NewInBadge className="w-fit" />}
        </div>
        <div className="absolute top-1 right-1 z-10">
          <WishlistButton productId={id} />
        </div>

        <ImageWithFallback
          src={hovered && hoverImage ? hoverImage : mainImage}
          alt={title}
          width={286}
          height={380}
        />
        <CardTitle>{title}</CardTitle>
        <CardContent>
          <Price
            currency={currency}
            price={price}
            discountedPrice={discountedPrice}
          />
        </CardContent>
      </Card>
    </Link>
  );
}
