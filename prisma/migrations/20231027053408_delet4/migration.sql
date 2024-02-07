/*
  Warnings:

  - You are about to drop the column `sessionId` on the `IncompleteFeedbacks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "IncompleteFeedbacks" DROP CONSTRAINT "IncompleteFeedbacks_sessionId_fkey";

-- DropIndex
DROP INDEX "IncompleteFeedbacks_sessionId_key";

-- AlterTable
ALTER TABLE "IncompleteFeedbacks" DROP COLUMN "sessionId";
