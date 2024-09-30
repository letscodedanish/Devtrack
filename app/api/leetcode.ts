// pages/api/leetcode.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
  
    if (method === 'POST') {
      const { username } = req.body;
      console.log(username);
  
      try {
        // Check if user data already exists in the database
        const existingProfile = await prisma.leetcodeProfile.findUnique({
          where: { username },
        });
  
        if (existingProfile) {
          // If data exists, return it
          return res.status(200).json(existingProfile);
        }
  
        // Otherwise, fetch data from the external API
        const leetcodeProfileResponse = await fetch(
          `https://alfa-leetcode-api.onrender.com/${username}`
        );
        const leetcodeProfile = await leetcodeProfileResponse.json();
  
        const leetcodeStatsResponse = await fetch(
          `https://alfa-leetcode-api.onrender.com/userprofile/${username}`
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
  
        res.status(200).json(newProfile);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving LeetCode profile' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }