-- CreateTable
CREATE TABLE "LeetCodeProfile" (
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

    CONSTRAINT "LeetCodeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GfgProfile" (
    "id" SERIAL NOT NULL,
    "handle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "school" TEXT,
    "company" TEXT,
    "solvedProblems" INTEGER NOT NULL,
    "codingScore" INTEGER NOT NULL,

    CONSTRAINT "GfgProfile_pkey" PRIMARY KEY ("id")
);
