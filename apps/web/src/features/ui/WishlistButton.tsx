"use client";

import { Heart } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useWishlist } from "../wishlist/model/useWishlist";
import { Button } from "@/shared/ui/atoms/Button";

type Props = {
  productId: string;
  className?: string;
  ariaLabel?: string;
  variant?: "unstyled" | "secondary";
};

export default function WishlistButton({
  productId,
  className,
  ariaLabel = "Toggle wishlist",
  variant = "unstyled",
}: Props) {
  const { has, toggle, isReady } = useWishlist();
  const active = has(productId);

  //   TODO handle icon buttons better as a separate component
  return (
    <Button
      variant={variant}
      size="icon"
      className={cn("cursor-pointer", className)}
      disabled={!isReady}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.preventDefault();
        toggle(productId);
      }}
    >
      <Heart className={cn({ "fill-current ": active })} />
    </Button>
  );
}
