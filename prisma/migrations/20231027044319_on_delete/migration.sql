-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_autorId_fkey";

-- DropForeignKey
ALTER TABLE "slots" DROP CONSTRAINT "slots_sessionId_fkey";

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
