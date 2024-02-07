/*
  Warnings:

  - A unique constraint covering the columns `[autorId]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `autorId` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "autorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_autorId_key" ON "sessions"("autorId");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
