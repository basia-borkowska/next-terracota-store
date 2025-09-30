export type ProductSummaryDTO = {
  id: string;
  title: string;
  price: number;
  discountedPrice?: number | null;
  currency: string;
  isNew: boolean;
  onSale: boolean;
  createdAt: string;
  category: string;
  images: string[];
};

export type ProductDTO = ProductSummaryDTO & {
  description: string;
};
