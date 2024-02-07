-- CreateEnum
CREATE TYPE "ManagerSlotStatus" AS ENUM ('ACCEPTED', 'NOTACCEPTED', 'PENDING');

-- CreateTable
CREATE TABLE "ManagerSlots" (
    "id" TEXT NOT NULL,
    "limit" INTEGER NOT NULL DEFAULT 0,
    "count" INTEGER NOT NULL DEFAULT 0,
    "status" "ManagerSlotStatus" NOT NULL DEFAULT 'NOTACCEPTED',

    CONSTRAINT "ManagerSlots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ManagerSlotsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ManagerSlotsToUser_AB_unique" ON "_ManagerSlotsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ManagerSlotsToUser_B_index" ON "_ManagerSlotsToUser"("B");

-- AddForeignKey
ALTER TABLE "_ManagerSlotsToUser" ADD CONSTRAINT "_ManagerSlotsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ManagerSlots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManagerSlotsToUser" ADD CONSTRAINT "_ManagerSlotsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
