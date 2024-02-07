-- AddForeignKey
ALTER TABLE "ManagerSlot" ADD CONSTRAINT "ManagerSlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
