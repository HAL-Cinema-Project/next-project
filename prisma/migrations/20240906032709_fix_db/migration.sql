/*
  Warnings:

  - Changed the type of `seat_id` on the `Schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "seat_id",
ADD COLUMN     "seat_id" INTEGER NOT NULL;
