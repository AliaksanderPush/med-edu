/*
  Warnings:

  - You are about to drop the column `incomFeedBacs` on the `userinfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userinfo" DROP COLUMN "incomFeedBacs",
ADD COLUMN     "incomeFeedBacks" INTEGER;
