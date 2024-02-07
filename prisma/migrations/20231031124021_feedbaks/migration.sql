/*
  Warnings:

  - You are about to drop the column `email` on the `feedbacks` table. All the data in the column will be lost.
  - Added the required column `userId` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "feedbacks_email_key";

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "email",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
