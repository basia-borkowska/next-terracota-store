"use client";

import Image from "next/image";
import type { ProductSummaryDTO } from "@shared/lib/api/products";
import { cn } from "@shared/lib/cn";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/shared/ui/atoms/Card";
import DiscountBadge from "@/shared/ui/atoms/DiscountBadge";
import NewInBadge from "@/shared/ui/atoms/NewInBadge";
import Price from "@/shared/ui/molecules/Price";

type Props = {
  product: ProductSummaryDTO;
  className?: string;
  showDiscountBadge?: boolean;
  showNewBadge?: boolean;
};

export default function ProductCard({
  product,
  className,
  showNewBadge = true,
  showDiscountBadge = true,
}: Props) {
  const [hovered, setHovered] = useState(false);

  const { discountedPrice, isNew, title, images, currency, price, id } =
    product;

  const mainImage = images[0];
  const hoverImage = images.length > 1 ? images[1] : null;

  //   useEffect(() => {
  //     if (hoverImage) {
  //       const img = new Image();
  //       img.src = hoverImage;
  //     }
  //   }, [hoverImage]);

  return (
    <Card
      key={id}
      className="relative group/card cursor-pointer"
      //   onClick={() => navigate(pathnames.product.replace(':id', id))}
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
        {/* <WishListButton productId={id} /> */}
      </div>

      {/* <Image
        src={hovered && hoverImage ? hoverImage : mainImage}
        alt={title}
        className="w-full h-[350px]"
      /> */}
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <Price
          currency={currency}
          price={price}
          discountedPrice={discountedPrice}
        />
      </CardContent>
    </Card>
  );
}
