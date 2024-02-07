-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "slots" DROP CONSTRAINT "slots_sessionId_fkey";

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
