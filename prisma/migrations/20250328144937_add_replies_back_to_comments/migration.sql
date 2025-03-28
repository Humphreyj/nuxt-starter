-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "replies" JSONB NOT NULL DEFAULT '[]';
