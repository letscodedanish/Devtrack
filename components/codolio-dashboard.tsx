"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import {
  MapPin,
  Building,
  Mail,
  Link,
  Phone,
  Briefcase,
  Calendar,
  Moon,
  User,
} from "lucide-react";
import { LineCharts } from "./charts/Line";
import { BarComponent } from "./charts/Bar";

interface LeetCodeProfile {
  username: string;
  name: string;
  birthday: string;
  avatar: string;
  ranking: number;
  reputation: number;
  gitHub: string;
  twitter: string | null;
  linkedIN: string;
  website: string[];
  country: string;
  company: string;
  school: string;
  skillTags: string[];
  about: string;
}

interface Submission {
  difficulty: string;
  count: number;
  submissions: number;
}

interface SubmissionCalendar {
  [timestamp: string]: number;
}

interface RecentSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
  __typename: string;
}

interface MatchedUserStats {
  acSubmissionNum: Submission[];
  totalSubmissionNum: Submission[];
}

interface LeetCodeProfile2 {
  totalSolved: number;
  totalSubmissions: Submission[];
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  contributionPoint: number;
  reputation: number;
  submissionCalendar: SubmissionCalendar;
  recentSubmissions: RecentSubmission[];
  matchedUserStats: MatchedUserStats;
}

interface BarComponentProps {

  userName: string;

}

export function CodolioDashboard() {
  const [leetcodeUsername, setLeetcodeUsername] = React.useState("");

  const [leetcodeData, setLeetcodeData] = useState<LeetCodeProfile | null>(
    null
  );

  const [leetcodeData2, setLeetcodeData2] = useState<LeetCodeProfile2 | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const fetchLeetcodeData = async () => {
    setLoading(true);
    try {
      const response: Response = await fetch(
        `https://alfa-leetcode-api.onrender.com/${leetcodeUsername}`
      );
      const data: LeetCodeProfile = await response.json();

      const leetcodeSecondResponse: LeetCodeProfile2 = await (await fetch( `https://alfa-leetcode-api.onrender.com/userprofile/${leetcodeUsername}`)).json()

      setLeetcodeData(data);
      setLeetcodeData2(leetcodeSecondResponse);
    } catch (error) {
      console.error("Error fetching Leetcode data:", error);
    }finally {
      setLoading(false); // Stop loader when data is fetched
    }
  };

  // const fetchLeetcodeData = async () => {
  //   try {
  //     // First, attempt to get the data from the database (via Next.js API)
  //     const response = await fetch('/api/leetcode', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username: leetcodeUsername }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setLeetcodeData(data);
  //       setLeetcodeData2({
  //         totalSolved: data.totalSolved,
  //         totalQuestions: data.totalQuestions,
  //         easySolved: data.easySolved,
  //         mediumSolved: data.mediumSolved,
  //         hardSolved: data.hardSolved,
  //         recentSubmissions: data.recentSubmissions,
  //         totalSubmissions: data.totalSubmissions || [],
  //         totalEasy: data.totalEasy || 0,
  //         totalMedium: data.totalMedium || 0,
  //         totalHard: data.totalHard || 0,
  //         ranking: data.ranking || 0,
  //         contributionPoint: data.contributionPoint || 0,
  //         reputation: data.reputation || 0,
  //         submissionCalendar: data.submissionCalendar || {},
  //         matchedUserStats: data.matchedUserStats || { acSubmissionNum: [], totalSubmissionNum: [] },
  //       });
  //     } else {
  //       console.error("Error fetching data from the database");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching Leetcode data:", error);
  //   }
  // };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-4">Track, analyze & share</h2>
          <p className="text-xl text-gray-400 mb-6">
            Codolio helps you navigate and track your coding journey to success
          </p>
          <Button size="lg" className="mb-12">
            Login / Signup →
          </Button>

          <div className="flex gap-10 mb-6">
            <div className="mb-4 ml-auto -mt-[220px]">
              <label className="block text-md font-medium">
                LeetCode Username
              </label>
              <input
                type="text"
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
                className="w-full p-2 mt-2 border rounded text-white"
                placeholder="Enter Your Leetcode username"
              />
              <Button onClick={fetchLeetcodeData} className="mt-4">
                Save LeetCode Data
              </Button>
            </div>
            {/* <div>
              <label className="block text-sm font-medium">
                GeeksforGeeks Handle
              </label>
              <input
                type="text"
                value={gfgHandle}
                onChange={(e) => setGfgHandle(e.target.value)}
                className="w-full p-2 mt-2 border rounded bg-gray-800 text-white"
                placeholder="Enter GeeksforGeeks handle"
              />
              <Button onClick={fetchGfgData} className="mt-4">
                Save GFG Data
              </Button>
            </div> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-10">
            <Card className="col-span-1 bg-gray-900 h-[40%] ">
              {/* Leetcode data */}
              <CardContent className="p-6 mt-6">
                <div className="flex items-center space-x-4 mb-6">
                  {/* <Avatar className="w-16 h-16"> */}
                    {leetcodeData?.avatar ? (
                      <Image className="rounded-[100%]" src={leetcodeData.avatar} alt="LeetCode Avatar" width={100} height={100} />
                    ) : (
                      <User className="border rounded-[100%] p-3" height={100} width={100} />
                    )}
                  {/* </Avatar> */}
                  <div>
                    {/* name */}
                    <h3 className="text-xl font-semibold">
                      {leetcodeData?.name ?? "Danish Khan"}
                    </h3>
                    <Button variant="ghost" size="sm" className="mt-2">
                      Edit Profile
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <InfoItem
                    icon={MapPin}
                    text={leetcodeData?.country || "Country"}
                  />
                  <InfoItem
                    icon={Building}
                    text={leetcodeData?.school || "School"}
                  />
                  {/* <InfoItem icon={Mail} text={leetcodeData.||"siddharthsingh123@gmail.com"} /> */}
                  <InfoItem icon={Link} text={`@${leetcodeData?.username || "jhon doe"}` } />
                  {/* <InfoItem icon={Phone} text={leetcodeData.} /> */}
                  <InfoItem
                    icon={Briefcase}
                    text={leetcodeData?.gitHub || "Github"}
                  />

                  {leetcodeData?.twitter && (
                    <InfoItem
                      icon={Calendar}
                      text={leetcodeData?.twitter || "JhonDoe"}
                    />
                  )}
                </div>
                <Button variant="outline" className="w-full mt-6">
                  Get your Codolio Card
                </Button>
              </CardContent>
            </Card>

            <Card >
            <BarComponent
             userName={leetcodeData?.username as string} />
            </Card>
            </div>

            <Card className="col-span-1 lg:col-span-2 bg-gray-900">
            <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-2">
                <StatCard title="Total Questions" value={leetcodeData2?.totalSolved || "0"} />
                  <StatCard title="Total Active Days" value="308" />
                </div>
                
              </CardContent>
              <div className="p-4">
              <LineCharts userName={leetcodeData?.username as string} />
              </div>
            </Card>
          </div>

          <Card className="mt-6 bg-gray-900">
            <CardHeader>
              <CardTitle>Codolio Card</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {leetcodeData?.avatar ? (
                      <Image className="rounded-[100%]" src={leetcodeData.avatar} alt="LeetCode Avatar" width={100} height={100} />
                    ) : (
                      <User className="border rounded-[100%] p-3" height={100} width={100} />
                    )}
                <div>
                  <h3 className="text-2xl font-semibold">
                    {leetcodeData?.name}
                  </h3>
                  <InfoItem icon={Link} text={`@${leetcodeData?.username || "jhon doe"}` } />
                 <InfoItem
                    icon={MapPin}
                    text={leetcodeData?.country || "Country"}
                  />
                  <p className="text-sm text-gray-400">
                    Last updated on 28-07-2024
                  </p>
                </div>
              </div>
              <div className="flex space-x-8">
                <div>
                  <div className="text-3xl font-bold">{leetcodeData2?.totalSolved}</div>
                  <div className="text-sm text-gray-400">Questions Solved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">308</div>
                  <div className="text-sm text-gray-400">Active Days</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="h-5 w-5 text-gray-400" />
      <span>{text}</span>
    </div>
  );
}




function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

