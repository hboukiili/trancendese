/*
  Warnings:

  - The primary key for the `Membership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `GroupId` on the `Membership` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_pkey",
DROP COLUMN "GroupId",
ADD COLUMN     "MembershipId" SERIAL NOT NULL,
ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("MembershipId");
