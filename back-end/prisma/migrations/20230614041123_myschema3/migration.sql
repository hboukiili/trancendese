/*
  Warnings:

  - You are about to drop the column `Status` on the `Friendship` table. All the data in the column will be lost.
  - The `Role` column on the `Membership` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `Accepted` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `Mode` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `Type` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isRead` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "MODE" AS ENUM ('classic', 'AI', 'Friends');

-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "Status",
ADD COLUMN     "Accepted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "Mode",
ADD COLUMN     "Mode" "MODE" NOT NULL;

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "Role",
ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "Type" TEXT NOT NULL,
ADD COLUMN     "isRead" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "level" INTEGER DEFAULT 0;
