export type CampaignSummaryDTO = {
  id: string;
  title: string;
  description: string;
  cover?: string;
};

export type CampaignDetailDTO = {
  id: string;
  title: string;
  description: string;
  story?: string;
  images: string[];
  products: string[];
};
