/*
  Warnings:

  - You are about to drop the column `gameId` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "gameId",
ADD COLUMN     "userData" JSONB NOT NULL DEFAULT '{}';
