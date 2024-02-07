/*
  Warnings:

  - The values [PENDING] on the enum `UserStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[sessionId]` on the table `blacklist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionId]` on the table `whitelist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expirationDate` to the `blacklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `blacklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question1` to the `whitelist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question2` to the `whitelist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question3` to the `whitelist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question4` to the `whitelist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question5` to the `whitelist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question7` to the `whitelist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question8` to the `whitelist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question9` to the `whitelist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `whitelist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('AVAILABLE', 'COMPLETED');

-- AlterEnum
BEGIN;
CREATE TYPE "UserStatus_new" AS ENUM ('ACTIVE', 'BLOCKED');
ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "status" TYPE "UserStatus_new" USING ("status"::text::"UserStatus_new");
ALTER TYPE "UserStatus" RENAME TO "UserStatus_old";
ALTER TYPE "UserStatus_new" RENAME TO "UserStatus";
DROP TYPE "UserStatus_old";
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "blacklist" ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userinfo" ADD COLUMN     "feedBacks" INTEGER,
ADD COLUMN     "incomFeedBacs" INTEGER,
ADD COLUMN     "numOfStud" INTEGER,
ADD COLUMN     "university" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "whitelist" ADD COLUMN     "answer1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "answer2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "answer3" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "answer4" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "answer6" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "answer7" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "answer8" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "answer9" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "question1" TEXT NOT NULL,
ADD COLUMN     "question2" TEXT NOT NULL,
ADD COLUMN     "question3" TEXT NOT NULL,
ADD COLUMN     "question4" TEXT NOT NULL,
ADD COLUMN     "question5" TEXT NOT NULL,
ADD COLUMN     "question7" TEXT NOT NULL,
ADD COLUMN     "question8" TEXT NOT NULL,
ADD COLUMN     "question9" TEXT NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "departmen" TEXT NOT NULL,
    "doctorName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "status" "SessionStatus" NOT NULL DEFAULT 'AVAILABLE',
    "autorId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "limit" INTEGER NOT NULL DEFAULT 0,
    "count" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SlotToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_autorId_key" ON "Session"("autorId");

-- CreateIndex
CREATE UNIQUE INDEX "Slot_sessionId_key" ON "Slot"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "_SlotToUser_AB_unique" ON "_SlotToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SlotToUser_B_index" ON "_SlotToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "blacklist_sessionId_key" ON "blacklist"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "whitelist_sessionId_key" ON "whitelist"("sessionId");

-- AddForeignKey
ALTER TABLE "blacklist" ADD CONSTRAINT "blacklist_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelist" ADD CONSTRAINT "whitelist_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SlotToUser" ADD CONSTRAINT "_SlotToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Slot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SlotToUser" ADD CONSTRAINT "_SlotToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
