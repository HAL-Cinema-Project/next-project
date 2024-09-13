/*
  Warnings:

  - You are about to drop the `_ScheduleToSeat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ScheduleToSeat" DROP CONSTRAINT "_ScheduleToSeat_A_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleToSeat" DROP CONSTRAINT "_ScheduleToSeat_B_fkey";

-- DropTable
DROP TABLE "_ScheduleToSeat";
