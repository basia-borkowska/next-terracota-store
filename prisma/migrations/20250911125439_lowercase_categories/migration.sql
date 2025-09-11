/*
  Warnings:

  - The values [TABLE,CHAIR,BED,SOFA,CARPET,LAMP] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Category_new" AS ENUM ('table', 'chair', 'bed', 'sofa', 'carpet', 'lamp');
ALTER TABLE "public"."Product" ALTER COLUMN "category" TYPE "public"."Category_new" USING ("category"::text::"public"."Category_new");
ALTER TYPE "public"."Category" RENAME TO "Category_old";
ALTER TYPE "public"."Category_new" RENAME TO "Category";
DROP TYPE "public"."Category_old";
COMMIT;
