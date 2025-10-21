import { z } from "zod";

export const CampaignSummaryDTO = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  createdAt: z.string(),
});

export const CampaignDTO = CampaignSummaryDTO.extend({
  story: z.string(),
});

export type CampaignSummaryDTO = z.infer<typeof CampaignSummaryDTO>;
export type CampaignDTO = z.infer<typeof CampaignDTO>;
