/*
  Warnings:

  - You are about to drop the column `price_id` on the `Cash` table. All the data in the column will be lost.
  - Added the required column `price_sum` to the `Cash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_id` to the `Cash` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cash" DROP CONSTRAINT "Cash_price_id_fkey";

-- AlterTable
ALTER TABLE "Cash" DROP COLUMN "price_id",
ADD COLUMN     "price_sum" INTEGER NOT NULL,
ADD COLUMN     "ticket_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Cash" ADD CONSTRAINT "Cash_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;
