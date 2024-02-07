/*
  Warnings:

  - You are about to drop the column `sessionId` on the `feedbacks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_sessionId_fkey";

-- DropIndex
DROP INDEX "feedbacks_sessionId_key";

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "sessionId";
