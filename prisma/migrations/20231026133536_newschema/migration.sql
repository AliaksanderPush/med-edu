/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Slot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blacklist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `whitelist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_autorId_fkey";

-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "_SlotToUser" DROP CONSTRAINT "_SlotToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "blacklist" DROP CONSTRAINT "blacklist_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "blacklist" DROP CONSTRAINT "blacklist_userId_fkey";

-- DropForeignKey
ALTER TABLE "whitelist" DROP CONSTRAINT "whitelist_sessionId_fkey";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Slot";

-- DropTable
DROP TABLE "blacklist";

-- DropTable
DROP TABLE "whitelist";

-- CreateTable
CREATE TABLE "IncompleteFeedbacks" (
    "id" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "IncompleteFeedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "question1" TEXT NOT NULL,
    "answer1" INTEGER NOT NULL DEFAULT 0,
    "question2" TEXT NOT NULL,
    "answer2" INTEGER NOT NULL DEFAULT 0,
    "question3" TEXT NOT NULL,
    "answer3" INTEGER NOT NULL DEFAULT 0,
    "question4" TEXT NOT NULL,
    "answer4" INTEGER NOT NULL DEFAULT 0,
    "question5" TEXT NOT NULL,
    "answer6" INTEGER NOT NULL DEFAULT 0,
    "question7" TEXT NOT NULL,
    "answer7" INTEGER NOT NULL DEFAULT 0,
    "question8" TEXT NOT NULL,
    "answer8" INTEGER NOT NULL DEFAULT 0,
    "question9" TEXT NOT NULL,
    "answer9" INTEGER NOT NULL DEFAULT 0,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "departmen" TEXT NOT NULL,
    "doctorName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "status" "SessionStatus" NOT NULL DEFAULT 'AVAILABLE',
    "autorId" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slots" (
    "id" TEXT NOT NULL,
    "limit" INTEGER NOT NULL DEFAULT 0,
    "count" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "slots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IncompleteFeedbacks_sessionId_key" ON "IncompleteFeedbacks"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "IncompleteFeedbacks_userId_key" ON "IncompleteFeedbacks"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_email_key" ON "feedbacks"("email");

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_sessionId_key" ON "feedbacks"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_autorId_key" ON "sessions"("autorId");

-- CreateIndex
CREATE UNIQUE INDEX "slots_sessionId_key" ON "slots"("sessionId");

-- AddForeignKey
ALTER TABLE "IncompleteFeedbacks" ADD CONSTRAINT "IncompleteFeedbacks_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncompleteFeedbacks" ADD CONSTRAINT "IncompleteFeedbacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SlotToUser" ADD CONSTRAINT "_SlotToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
