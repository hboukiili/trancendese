/*
  Warnings:

  - You are about to drop the column `PlayerXP1` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `PlayerXP2` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `Result` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `RefreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "PlayerXP1",
DROP COLUMN "PlayerXP2",
DROP COLUMN "Result",
ADD COLUMN     "WinnerXP" INTEGER,
ADD COLUMN     "looserXP" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "RefreshToken",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
