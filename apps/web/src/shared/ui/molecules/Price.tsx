type Props = {
  price: number;
  currency: string;
  discountedPrice?: number | null;
};

const Price = ({ price, currency, discountedPrice }: Props) => {
  const formatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
  const hasDiscount =
    discountedPrice !== null &&
    discountedPrice !== undefined &&
    discountedPrice < price;

  return (
    <div className="flex gap-2">
      {hasDiscount && (
        <span className="text-gray-500 line-through font-normal">
          {formatter.format(price)}
        </span>
      )}
      <span className="font-bold text-dark">
        {formatter.format(hasDiscount ? discountedPrice! : price)}
      </span>
    </div>
  );
};

export default Price;
