/*
  Warnings:

  - You are about to drop the column `sessionId` on the `IncompleteFeedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `autorId` on the `sessions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "IncompleteFeedbacks" DROP CONSTRAINT "IncompleteFeedbacks_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_autorId_fkey";

-- DropIndex
DROP INDEX "IncompleteFeedbacks_sessionId_key";

-- DropIndex
DROP INDEX "sessions_autorId_key";

-- AlterTable
ALTER TABLE "IncompleteFeedbacks" DROP COLUMN "sessionId";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "autorId";
