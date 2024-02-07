/*
  Warnings:

  - You are about to drop the column `answer` on the `answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "answer" DROP COLUMN "answer",
ADD COLUMN     "answerBool" BOOLEAN,
ADD COLUMN     "answerNum" INTEGER,
ADD COLUMN     "answerStr" TEXT;
