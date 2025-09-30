import { apiGet } from "../http";
import { ProductSummaryDTO } from "@/entities/product/types";
import { ListResponse, Locale } from "../types";

export type CampaignSummaryDTO = {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
};
export type CampaignDTO = CampaignSummaryDTO & { story: string };

export async function getCampaigns(page = 1, size = 12, lang: Locale = "en") {
  const q = new URLSearchParams({
    page: String(page),
    size: String(size),
    lang,
  });
  return apiGet<ListResponse<CampaignSummaryDTO>>(`/campaigns?${q.toString()}`);
}

export async function getCampaignById(id: string, lang: Locale = "en") {
  return apiGet<CampaignDTO>(`/campaigns/${id}?lang=${lang}`);
}

export async function getCampaignProducts(
  id: string,
  size = 30,
  lang: Locale = "en"
) {
  const q = new URLSearchParams({ size: String(size), lang });
  return apiGet<{
    items: ProductSummaryDTO[];
    size: number;
    campaignId: string;
  }>(`/campaigns/${id}/products?${q.toString()}`);
}
