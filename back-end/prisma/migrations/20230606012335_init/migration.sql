/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `FA_On` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FullName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `badge` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "FA_On" BOOLEAN NOT NULL,
ADD COLUMN     "FAsecret" TEXT,
ADD COLUMN     "FullName" TEXT NOT NULL,
ADD COLUMN     "UserId" INTEGER NOT NULL,
ADD COLUMN     "XP" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "badge" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "draw" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "loss" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "win" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("UserId");

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Room" (
    "RoomId" SERIAL NOT NULL,
    "RoomNAme" TEXT NOT NULL,
    "CreationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ischannel" BOOLEAN NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("RoomId")
);

-- CreateTable
CREATE TABLE "Message" (
    "MessageId" SERIAL NOT NULL,
    "RoomId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Content" TEXT NOT NULL,
    "SendTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("MessageId")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "FriendshipId" SERIAL NOT NULL,
    "SenderId" INTEGER NOT NULL,
    "ReceiverId" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "CreationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("FriendshipId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "NotificationId" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Title" TEXT NOT NULL,
    "CreationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("NotificationId")
);

-- CreateTable
CREATE TABLE "Membership" (
    "GroupId" SERIAL NOT NULL,
    "RoomId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Role" TEXT NOT NULL,
    "isBanned" BOOLEAN NOT NULL,
    "isMuted" BOOLEAN NOT NULL,
    "CreationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("GroupId")
);

-- CreateTable
CREATE TABLE "Game" (
    "GameId" SERIAL NOT NULL,
    "PlayerId1" INTEGER NOT NULL,
    "PlayerId2" INTEGER NOT NULL,
    "Mode" TEXT NOT NULL,
    "Result" INTEGER NOT NULL,
    "isDraw" BOOLEAN NOT NULL,
    "PlayerXP1" INTEGER NOT NULL,
    "PlayerXP2" INTEGER NOT NULL,
    "Rounds" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("GameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "Room"("RoomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_ReceiverId_fkey" FOREIGN KEY ("ReceiverId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "Room"("RoomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_PlayerId1_fkey" FOREIGN KEY ("PlayerId1") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_PlayerId2_fkey" FOREIGN KEY ("PlayerId2") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
