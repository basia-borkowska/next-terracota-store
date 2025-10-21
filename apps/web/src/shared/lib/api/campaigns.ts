import { apiGet } from "../http";
import type {
  CampaignDTO,
  CampaignSummaryDTO,
  ProductSummaryDTO,
  Paginated,
  Locale,
} from "@terracota/types";

export async function getCampaigns(page = 1, size = 12, lang: Locale = "en") {
  const q = new URLSearchParams({
    page: String(page),
    size: String(size),
    lang,
  });
  return apiGet<Paginated<CampaignSummaryDTO>>(`/campaigns?${q.toString()}`);
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
