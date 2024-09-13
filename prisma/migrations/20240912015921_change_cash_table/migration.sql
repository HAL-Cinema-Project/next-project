/*
  Warnings:

  - A unique constraint covering the columns `[ticket_id]` on the table `Cash` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schedule_id` to the `Cash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_type` to the `Cash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Cash` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cash" DROP CONSTRAINT "Cash_ticket_id_fkey";

-- AlterTable
ALTER TABLE "Cash" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "schedule_id" INTEGER NOT NULL,
ADD COLUMN     "ticket_type" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cash_ticket_id_key" ON "Cash"("ticket_id");

-- AddForeignKey
ALTER TABLE "Cash" ADD CONSTRAINT "Cash_ticket_type_fkey" FOREIGN KEY ("ticket_type") REFERENCES "Ticket"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cash" ADD CONSTRAINT "Cash_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("schedule_id") ON DELETE RESTRICT ON UPDATE CASCADE;
