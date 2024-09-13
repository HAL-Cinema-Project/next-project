/*
  Warnings:

  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_ticket_id_fkey";

-- AlterTable
ALTER TABLE "Price" ALTER COLUMN "ticket_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_pkey",
ALTER COLUMN "ticket_id" DROP DEFAULT,
ALTER COLUMN "ticket_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticket_id");
DROP SEQUENCE "Ticket_ticket_id_seq";

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;
