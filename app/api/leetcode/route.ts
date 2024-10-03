// pages/api/leetcode.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
// new build

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { leetCodeUserName }: { leetCodeUserName: string } = await req.json();

    // Check if user data already exists in the database
    const existingProfile = await prisma.leetcodeProfile.findUnique({
      where: { username: leetCodeUserName },
    });

    if (existingProfile) {
      // If data exists, return it

      return NextResponse.json({
        profile: { ...existingProfile },
        status: 200,
      });
    }

    // Otherwise, fetch data from the external API
    const leetcodeProfileResponse = await fetch(
      `https://alfa-leetcode-api.onrender.com/${leetCodeUserName}`
    );
    const leetcodeProfile = await leetcodeProfileResponse.json();

    const leetcodeStatsResponse = await fetch(
      `https://alfa-leetcode-api.onrender.com/userprofile/${leetCodeUserName}`
    );
    const leetcodeStats = await leetcodeStatsResponse.json();

    // Save the fetched data into your database
    const newProfile = await prisma.leetcodeProfile.create({
      data: {
        username: leetcodeProfile.username,
        name: leetcodeProfile.name,
        avatar: leetcodeProfile.avatar,
        ranking: leetcodeProfile.ranking,
        reputation: leetcodeProfile.reputation,
        gitHub: leetcodeProfile.gitHub,
        linkedIn: leetcodeProfile.linkedIN,
        twitter: leetcodeProfile.twitter,
        website: leetcodeProfile.website,
        country: leetcodeProfile.country,
        company: leetcodeProfile.company,
        school: leetcodeProfile.school,
        skillTags: leetcodeProfile.skillTags,
        about: leetcodeProfile.about,
        totalSolved: leetcodeStats.totalSolved,
        totalQuestions: leetcodeStats.totalQuestions,
        easySolved: leetcodeStats.easySolved,
        mediumSolved: leetcodeStats.mediumSolved,
        hardSolved: leetcodeStats.hardSolved,
        recentSubmissions: leetcodeStats.recentSubmissions,
      },
    });

    return NextResponse.json({ profile: { ...newProfile }, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
