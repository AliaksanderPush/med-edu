/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `IncompleteFeedbacks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionId]` on the table `feedbacks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `IncompleteFeedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IncompleteFeedbacks" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "IncompleteFeedbacks_sessionId_key" ON "IncompleteFeedbacks"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_sessionId_key" ON "feedbacks"("sessionId");

-- AddForeignKey
ALTER TABLE "IncompleteFeedbacks" ADD CONSTRAINT "IncompleteFeedbacks_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
