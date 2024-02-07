/*
  Warnings:

  - You are about to drop the column `managerSlotId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_managerSlotId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "managerSlotId";

-- CreateTable
CREATE TABLE "SlotUsers" (
    "id" TEXT NOT NULL,
    "managerSlotId" TEXT,

    CONSTRAINT "SlotUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SlotUsersToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SlotUsers_managerSlotId_key" ON "SlotUsers"("managerSlotId");

-- CreateIndex
CREATE UNIQUE INDEX "_SlotUsersToUser_AB_unique" ON "_SlotUsersToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SlotUsersToUser_B_index" ON "_SlotUsersToUser"("B");

-- AddForeignKey
ALTER TABLE "SlotUsers" ADD CONSTRAINT "SlotUsers_managerSlotId_fkey" FOREIGN KEY ("managerSlotId") REFERENCES "ManagerSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SlotUsersToUser" ADD CONSTRAINT "_SlotUsersToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "SlotUsers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SlotUsersToUser" ADD CONSTRAINT "_SlotUsersToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
