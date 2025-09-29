"use client";

import { Badge } from "./Badge";
import { useTranslations } from "next-intl";

const DiscountBadge = ({ className }: { className?: string }) => {
  const t = useTranslations();
  return (
    <Badge variant="blue" className={className}>
      {t("atoms.discountBadge.title")}
    </Badge>
  );
};

export default DiscountBadge;
