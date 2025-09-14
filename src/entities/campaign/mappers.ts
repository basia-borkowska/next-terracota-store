import type { Locale } from "@/shared/lib/types";
import type {
  CampaignDomain,
  CampaignSummaryDTO,
  CampaignDetailDTO,
} from "./types";

export function toCampaignSummary(
  c: CampaignDomain,
  lang: Locale
): CampaignSummaryDTO {
  return {
    id: c.id,
    title: lang === "pl" ? c.title_pl : c.title_en,
    description: lang === "pl" ? c.description_pl : c.description_en,
    cover: c.images?.[0],
  };
}

export function toCampaignDetail(
  c: CampaignDomain,
  campaignProducts: string[],
  lang: Locale
): CampaignDetailDTO {
  return {
    id: c.id,
    title: lang === "pl" ? c.title_pl : c.title_en,
    description: lang === "pl" ? c.description_pl : c.description_en,
    story: lang === "pl" ? c.story_pl ?? undefined : c.story_en ?? undefined,
    images: c.images ?? [],
    products: campaignProducts ?? [],
  };
}
