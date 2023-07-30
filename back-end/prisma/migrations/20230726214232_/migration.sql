/*
  Warnings:

  - You are about to drop the column `First_Blood` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `Invincible` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `Legend` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `Lets_Play` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `Rookie` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `Shutout` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `Unstoppable` on the `achievement` table. All the data in the column will be lost.
  - Added the required column `Type` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "Type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "achievement" DROP COLUMN "First_Blood",
DROP COLUMN "Invincible",
DROP COLUMN "Legend",
DROP COLUMN "Lets_Play",
DROP COLUMN "Rookie",
DROP COLUMN "Shutout",
DROP COLUMN "Unstoppable",
ADD COLUMN     "Batal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Hawking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Helmchen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "PongPlayer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Worldcup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "extrovert" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kasparov" BOOLEAN NOT NULL DEFAULT false;
