import type { Locale } from "@/shared/lib/types";
import type {
  CampaignDetailDTO,
  CampaignSummaryDTO,
} from "@/entities/campaign/types";

export async function fetchCampaigns(lang: Locale, page = 1, limit = 24) {
  const sp = new URLSearchParams({
    lang,
    page: String(page),
    limit: String(limit),
  });
  const res = await fetch(`/api/campaigns?${sp}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load campaigns");
  return (await res.json()) as {
    items: CampaignSummaryDTO[];
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}

export async function fetchCampaignById(id: string, lang: Locale) {
  const sp = new URLSearchParams({ lang });
  const res = await fetch(`/api/campaigns/${encodeURIComponent(id)}?${sp}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as CampaignDetailDTO;
}
