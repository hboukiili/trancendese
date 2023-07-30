/*
  Warnings:

  - You are about to drop the column `draw` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `loss` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `win` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "draw",
DROP COLUMN "loss",
DROP COLUMN "win",
ADD COLUMN     "isUploaded" BOOLEAN NOT NULL DEFAULT false;
