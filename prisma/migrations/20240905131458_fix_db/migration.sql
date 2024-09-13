/*
  Warnings:

  - You are about to drop the column `price` on the `Price` table. All the data in the column will be lost.
  - The primary key for the `UserSchedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `price_sum` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_id` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `seat_id` on the `Schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Price" DROP COLUMN "price",
ADD COLUMN     "price_sum" INTEGER NOT NULL,
ADD COLUMN     "ticket_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "seat_id",
ADD COLUMN     "seat_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserSchedule" DROP CONSTRAINT "UserSchedule_pkey",
ADD CONSTRAINT "UserSchedule_pkey" PRIMARY KEY ("user_schedule_id");

-- CreateTable
CREATE TABLE "Ticket" (
    "ticket_id" SERIAL NOT NULL,
    "ticket_price" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;
