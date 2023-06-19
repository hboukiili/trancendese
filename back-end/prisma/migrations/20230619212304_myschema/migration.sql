/*
  Warnings:

  - You are about to drop the column `RefreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "RefreshToken",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
