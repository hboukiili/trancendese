/*
  Warnings:

  - You are about to drop the column `UserId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_UserId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "UserId",
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "badges" (
    "badgesId" SERIAL NOT NULL,
    "Bronze" BOOLEAN NOT NULL DEFAULT true,
    "Silver" BOOLEAN NOT NULL DEFAULT false,
    "Gold" BOOLEAN NOT NULL DEFAULT false,
    "Platinum" BOOLEAN NOT NULL DEFAULT false,
    "Diamond" BOOLEAN NOT NULL DEFAULT false,
    "Master" BOOLEAN NOT NULL DEFAULT false,
    "Grandmaster" BOOLEAN NOT NULL DEFAULT false,
    "Legend" BOOLEAN NOT NULL DEFAULT false,
    "Elite" BOOLEAN NOT NULL DEFAULT false,
    "Champion" BOOLEAN NOT NULL DEFAULT false,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("badgesId")
);

-- CreateIndex
CREATE UNIQUE INDEX "badges_UserId_key" ON "badges"("UserId");

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
