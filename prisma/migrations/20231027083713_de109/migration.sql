-- DropForeignKey
ALTER TABLE "userinfo" DROP CONSTRAINT "userinfo_userId_fkey";

-- AddForeignKey
ALTER TABLE "userinfo" ADD CONSTRAINT "userinfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
