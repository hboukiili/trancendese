/*
  Warnings:

  - You are about to drop the column `Player2IsWinner` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `player1IsWinner` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "Player2IsWinner",
DROP COLUMN "player1IsWinner",
ADD COLUMN     "WinnerId" TEXT NOT NULL DEFAULT 'Draw';

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_WinnerId_fkey" FOREIGN KEY ("WinnerId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
