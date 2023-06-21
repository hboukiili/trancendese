/*
  Warnings:

  - Changed the type of `Type` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "notificationType" AS ENUM ('friendship_request', 'Accepted_request', 'game_invitation', 'Achievement', 'GroupInvitation');

-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "blockedByReceiver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "blockedBySender" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "Accepted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "Type",
ADD COLUMN     "Type" "notificationType" NOT NULL;
