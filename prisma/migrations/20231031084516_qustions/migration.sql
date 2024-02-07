/*
  Warnings:

  - You are about to drop the column `type` on the `answer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "quastion" DROP CONSTRAINT "quastion_answerId_fkey";

-- AlterTable
ALTER TABLE "answer" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "quastion" ADD COLUMN     "type" "QuestionFieldType" NOT NULL DEFAULT 'STRING';

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "quastion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
