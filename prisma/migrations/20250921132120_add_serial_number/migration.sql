/*
  Warnings:

  - A unique constraint covering the columns `[serial_number]` on the table `records` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serial_number` to the `records` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `vintage` on the `records` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."records" ADD COLUMN     "serial_number" TEXT NOT NULL,
DROP COLUMN "vintage",
ADD COLUMN     "vintage" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "records_serial_number_key" ON "public"."records"("serial_number");
