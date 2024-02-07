/*
  Warnings:

  - You are about to drop the column `type` on the `quastion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "answer" ADD COLUMN     "type" "QuestionFieldType" NOT NULL DEFAULT 'STRING';

-- AlterTable
ALTER TABLE "quastion" DROP COLUMN "type";
