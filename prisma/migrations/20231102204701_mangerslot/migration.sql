/*
  Warnings:

  - You are about to drop the `ManagerSlots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ManagerSlotsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ManagerSlotsToUser" DROP CONSTRAINT "_ManagerSlotsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ManagerSlotsToUser" DROP CONSTRAINT "_ManagerSlotsToUser_B_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "invaitedstatus" "ManagerSlotStatus" NOT NULL DEFAULT 'NOTACCEPTED',
ADD COLUMN     "managerSlotId" TEXT;

-- DropTable
DROP TABLE "ManagerSlots";

-- DropTable
DROP TABLE "_ManagerSlotsToUser";

-- CreateTable
CREATE TABLE "ManagerSlot" (
    "id" TEXT NOT NULL,
    "limit" INTEGER NOT NULL DEFAULT 0,
    "count" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ManagerSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ManagerSlot_userId_key" ON "ManagerSlot"("userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_managerSlotId_fkey" FOREIGN KEY ("managerSlotId") REFERENCES "ManagerSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
