/*
  Warnings:

  - You are about to drop the column `answer1` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `answer2` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `answer3` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `answer4` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `answer6` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `answer7` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `answer8` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `answer9` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `question1` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `question2` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `question3` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `question4` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `question5` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `question7` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `question8` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `question9` on the `feedbacks` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "QuestionFieldType" AS ENUM ('BOOLEAN', 'NUMBER', 'STRING');

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "answer1",
DROP COLUMN "answer2",
DROP COLUMN "answer3",
DROP COLUMN "answer4",
DROP COLUMN "answer6",
DROP COLUMN "answer7",
DROP COLUMN "answer8",
DROP COLUMN "answer9",
DROP COLUMN "question1",
DROP COLUMN "question2",
DROP COLUMN "question3",
DROP COLUMN "question4",
DROP COLUMN "question5",
DROP COLUMN "question7",
DROP COLUMN "question8",
DROP COLUMN "question9";

-- CreateTable
CREATE TABLE "answer" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "feedBackId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quastion" (
    "id" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "type" "QuestionFieldType" NOT NULL DEFAULT 'STRING',
    "question" TEXT NOT NULL,

    CONSTRAINT "quastion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quastion_answerId_key" ON "quastion"("answerId");

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_feedBackId_fkey" FOREIGN KEY ("feedBackId") REFERENCES "feedbacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quastion" ADD CONSTRAINT "quastion_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
