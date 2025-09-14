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
  id: ProductId;
  title: string;
  description: string;
  category: string;
  price: number;
  discountedPrice: number | null;
  currency: string;
  isNew: boolean;
  images: string[]; // first 1–2 for lists
};

export type ProductDTO = {
  id: ProductId;
  title: string;
  description: string;
  images: string[]; // full set for details
  price: number;
  discountedPrice: number | null;
  currency: string;
  isNew: boolean;
  category: string;
};
