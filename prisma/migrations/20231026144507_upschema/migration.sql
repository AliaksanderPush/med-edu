/*
  Warnings:

  - You are about to drop the column `date` on the `sessions` table. All the data in the column will be lost.
  - The `status` column on the `slots` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `description` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SlotStatus" AS ENUM ('ACCEPTED', 'NOTACCEPTED');

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "date",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "slots" DROP COLUMN "status",
ADD COLUMN     "status" "SlotStatus" NOT NULL DEFAULT 'ACCEPTED';
