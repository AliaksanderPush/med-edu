-- DropForeignKey
ALTER TABLE "IncompleteFeedbacks" DROP CONSTRAINT "IncompleteFeedbacks_userId_fkey";

-- AddForeignKey
ALTER TABLE "IncompleteFeedbacks" ADD CONSTRAINT "IncompleteFeedbacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
