/*
  Warnings:

  - You are about to alter the column `currency` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "price" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "discountedPrice" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "currency" SET DATA TYPE VARCHAR(8);

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "public"."Product"("category");

-- CreateIndex
CREATE INDEX "Product_isNew_idx" ON "public"."Product"("isNew");

-- CreateIndex
CREATE INDEX "Product_discountedPrice_idx" ON "public"."Product"("discountedPrice");

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "public"."Product"("createdAt");
