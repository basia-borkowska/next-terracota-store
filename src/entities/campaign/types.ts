export type CampaignId = string;

// Domain (close to DB)
export type CampaignDomain = {
  id: CampaignId;
  title_en: string;
  title_pl: string;
  description_en: string;
  description_pl: string;
  story_en?: string;
  story_pl?: string;
  images: string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

// DTOs for UI
export type CampaignSummaryDTO = {
  id: CampaignId;
  title: string;
  description: string;
  cover?: string;
};

export type CampaignDetailDTO = {
  id: CampaignId;
  title: string;
  description: string;
  story?: string;
  images: string[];
  products: string[];
};
