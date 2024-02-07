/*
  Warnings:

  - You are about to drop the column `answerId` on the `quastion` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "quastion_answerId_key";

-- AlterTable
ALTER TABLE "quastion" DROP COLUMN "answerId";
