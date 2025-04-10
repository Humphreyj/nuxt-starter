/*
  Warnings:

  - A unique constraint covering the columns `[userId,gameId]` on the table `GameRating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameId` to the `GameRating` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "GameRating_userId_id_key";

-- AlterTable
ALTER TABLE "GameRating" ADD COLUMN     "gameId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GameRating_userId_gameId_key" ON "GameRating"("userId", "gameId");
