/*
  Warnings:

  - You are about to drop the `badges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "badges" DROP CONSTRAINT "badges_UserId_fkey";

-- DropTable
DROP TABLE "badges";

-- CreateTable
CREATE TABLE "achievement" (
    "badgesId" SERIAL NOT NULL,
    "UserId" TEXT NOT NULL,
    "First_Blood" BOOLEAN NOT NULL DEFAULT false,
    "Shutout" BOOLEAN NOT NULL DEFAULT false,
    "Unstoppable" BOOLEAN NOT NULL DEFAULT false,
    "Invincible" BOOLEAN NOT NULL DEFAULT false,
    "Legend" BOOLEAN NOT NULL DEFAULT false,
    "Lets_Play" BOOLEAN NOT NULL DEFAULT false,
    "Rookie" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("badgesId")
);

-- CreateIndex
CREATE UNIQUE INDEX "achievement_UserId_key" ON "achievement"("UserId");

-- AddForeignKey
ALTER TABLE "achievement" ADD CONSTRAINT "achievement_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
