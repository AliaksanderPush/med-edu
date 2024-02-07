-- DropForeignKey
ALTER TABLE "slots" DROP CONSTRAINT "slots_sessionId_fkey";

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
