/*
  Warnings:

  - Added the required column `inquiry_comp` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "inquiry_comp" BOOLEAN NOT NULL;
