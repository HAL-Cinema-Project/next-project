-- CreateTable
CREATE TABLE "_ScheduleToSeat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleToSeat_AB_unique" ON "_ScheduleToSeat"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleToSeat_B_index" ON "_ScheduleToSeat"("B");

-- AddForeignKey
ALTER TABLE "_ScheduleToSeat" ADD CONSTRAINT "_ScheduleToSeat_A_fkey" FOREIGN KEY ("A") REFERENCES "Schedule"("schedule_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToSeat" ADD CONSTRAINT "_ScheduleToSeat_B_fkey" FOREIGN KEY ("B") REFERENCES "Seat"("seat_id") ON DELETE CASCADE ON UPDATE CASCADE;
