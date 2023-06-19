/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_ReceiverId_fkey";

-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_SenderId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_PlayerId1_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_PlayerId2_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_UserId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_UserId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_UserId_fkey";

-- AlterTable
ALTER TABLE "Friendship" ALTER COLUMN "SenderId" SET DATA TYPE TEXT,
ALTER COLUMN "ReceiverId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "PlayerId1" SET DATA TYPE TEXT,
ALTER COLUMN "PlayerId2" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Membership" ALTER COLUMN "UserId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "UserId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "UserId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "UserId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("UserId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_ReceiverId_fkey" FOREIGN KEY ("ReceiverId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_PlayerId1_fkey" FOREIGN KEY ("PlayerId1") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_PlayerId2_fkey" FOREIGN KEY ("PlayerId2") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
