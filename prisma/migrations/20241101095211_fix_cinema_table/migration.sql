/*
  Warnings:

  - Added the required column `cinema_address` to the `Cinema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cinema_detail` to the `Cinema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cinema_email` to the `Cinema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cinema_image` to the `Cinema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cinema_tel` to the `Cinema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cinema" ADD COLUMN     "cinema_address" TEXT NOT NULL,
ADD COLUMN     "cinema_detail" TEXT NOT NULL,
ADD COLUMN     "cinema_email" TEXT NOT NULL,
ADD COLUMN     "cinema_image" TEXT NOT NULL,
ADD COLUMN     "cinema_tel" TEXT NOT NULL;
