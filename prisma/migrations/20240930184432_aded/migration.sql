/*
  Warnings:

  - You are about to drop the `GfgProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeetCodeProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GfgProfile";

-- DropTable
DROP TABLE "LeetCodeProfile";

-- CreateTable
CREATE TABLE "LeetcodeProfile" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "ranking" INTEGER,
    "reputation" INTEGER,
    "gitHub" TEXT,
    "linkedIn" TEXT,
    "twitter" TEXT,
    "website" TEXT[],
    "country" TEXT,
    "company" TEXT,
    "school" TEXT,
    "skillTags" TEXT[],
    "about" TEXT,
    "totalSolved" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "easySolved" INTEGER NOT NULL,
    "mediumSolved" INTEGER NOT NULL,
    "hardSolved" INTEGER NOT NULL,
    "recentSubmissions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeetcodeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeetcodeProfile_username_key" ON "LeetcodeProfile"("username");
