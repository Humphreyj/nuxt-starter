-- CreateTable
CREATE TABLE "GameRating" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "userId" TEXT NOT NULL,
    "isRecommended" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReview" (
    "id" TEXT NOT NULL,
    "gameRatingId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "hoursPlayed" DOUBLE PRECISION,
    "purchaseType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameRating_userId_id_key" ON "GameRating"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "UserReview_gameRatingId_key" ON "UserReview"("gameRatingId");

-- AddForeignKey
ALTER TABLE "GameRating" ADD CONSTRAINT "GameRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReview" ADD CONSTRAINT "UserReview_gameRatingId_fkey" FOREIGN KEY ("gameRatingId") REFERENCES "GameRating"("id") ON DELETE CASCADE ON UPDATE CASCADE;
