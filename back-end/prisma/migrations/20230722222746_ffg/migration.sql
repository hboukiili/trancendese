/*
  Warnings:

  - The `Role` column on the `Membership` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Membership" ALTER COLUMN "isBanned" SET DEFAULT false,
ALTER COLUMN "isMuted" SET DEFAULT false,
DROP COLUMN "Role",
ADD COLUMN     "Role" TEXT NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "Role";
