-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('TABLE', 'CHAIR', 'BED', 'SOFA', 'CARPET', 'LAMP');

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_pl" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_pl" TEXT NOT NULL,
    "images" TEXT[],
    "category" "public"."Category" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "discountedPrice" DECIMAL(10,2),
    "currency" TEXT NOT NULL DEFAULT 'PLN',
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Campaign" (
    "id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_pl" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_pl" TEXT NOT NULL,
    "story_en" TEXT NOT NULL,
    "story_pl" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CampaignProduct" (
    "campaignId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CampaignProduct_pkey" PRIMARY KEY ("campaignId","productId")
);

-- CreateIndex
CREATE INDEX "CampaignProduct_campaignId_position_idx" ON "public"."CampaignProduct"("campaignId", "position");

-- AddForeignKey
ALTER TABLE "public"."CampaignProduct" ADD CONSTRAINT "CampaignProduct_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CampaignProduct" ADD CONSTRAINT "CampaignProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
