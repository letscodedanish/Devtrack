import { prisma } from "../../../lib/prisma"; // adjust the path if needed
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type');
    if (contentType !== 'application/json') {
      return NextResponse.json({ message: 'Invalid content type', status: 400 });
    }

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

    // Fetch data from the external API
    let leetcodeProfile, leetcodeStats;
    try {
      const leetcodeProfileResponse = await fetch(
        `https://alfa-leetcode-api.onrender.com/${leetCodeUserName}`
      );
      leetcodeProfile = await leetcodeProfileResponse.json();

      const leetcodeStatsResponse = await fetch(
        `https://alfa-leetcode-api.onrender.com/userprofile/${leetCodeUserName}`
      );
      leetcodeStats = await leetcodeStatsResponse.json();
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
      return NextResponse.json({ message: "Failed to fetch LeetCode data", status: 500 });
    }

    // Save the fetched data into the database
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
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
