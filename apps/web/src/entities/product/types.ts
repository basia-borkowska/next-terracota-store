// Domain (close to DB)
export type ProductId = string;

export type ProductDomain = {
  id: ProductId;
  title_en: string;
  title_pl: string;
  description_en: string;
  description_pl: string;
  images: string[];
  price: number;
  discountedPrice: number | null;
  currency: string;
  isNew: boolean;
  category: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

// DTOs (what UI consumes)
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
  images: string[]; // add images here
};

export type ProductDTO = ProductSummaryDTO & {
  description: string;
};
