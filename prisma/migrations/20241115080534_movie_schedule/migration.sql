/*
  Warnings:

  - You are about to drop the column `movie_id` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `screen_id` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `time_id` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `movie_end_date` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_start_date` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_schedule_id` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_movie_id_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_screen_id_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_time_id_fkey";

-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "inquiry_category" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "movie_end_date" TEXT NOT NULL,
ADD COLUMN     "movie_start_date" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "movie_id",
DROP COLUMN "screen_id",
DROP COLUMN "time_id",
ADD COLUMN     "movie_schedule_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "MovieSchedule" (
    "movie_schedule_id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "screen_id" INTEGER NOT NULL,
    "cinema_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieSchedule_pkey" PRIMARY KEY ("movie_schedule_id")
);

-- AddForeignKey
ALTER TABLE "MovieSchedule" ADD CONSTRAINT "MovieSchedule_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSchedule" ADD CONSTRAINT "MovieSchedule_screen_id_fkey" FOREIGN KEY ("screen_id") REFERENCES "Screen"("screen_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieSchedule" ADD CONSTRAINT "MovieSchedule_cinema_id_fkey" FOREIGN KEY ("cinema_id") REFERENCES "Cinema"("cinema_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_movie_schedule_id_fkey" FOREIGN KEY ("movie_schedule_id") REFERENCES "MovieSchedule"("movie_schedule_id") ON DELETE RESTRICT ON UPDATE CASCADE;
