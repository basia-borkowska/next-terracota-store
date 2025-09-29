import { useTranslations } from "next-intl";
import { Badge } from "./Badge";

const NewInBadge = ({ className }: { className?: string }) => {
  const t = useTranslations();
  return (
    <Badge variant="green" className={className}>
      {t("atoms.newInBadge.title")}
    </Badge>
  );
};

export default NewInBadge;
