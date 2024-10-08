"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  MapPin,
  Building,
  Link,
  Briefcase,
  Calendar,
  User,
} from "lucide-react";
import { LineCharts } from "./charts/Line";
import { BarComponent } from "./charts/Bar";
import { LeetcodeProfileType } from "@/utils/DatabaseModelType";
import axios from "axios";

export function CodolioDashboard() {
  const [leetCodeUserName, setLeetcodeUsername] = useState("");
  const [leetcodeData, setLeetcodeData] = useState<LeetcodeProfileType | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const fetchLeetcodeData = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/leetcode", { leetCodeUserName });
      setLeetcodeData(response.data.profile);
    } catch (error) {
      console.error("Error fetching Leetcode data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white w-full">
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="md:flex gap-10">
            <div>
              <h2 className="text-5xl font-bold mb-4">
                Track, analyze & share
              </h2>
              <p className="text-xl text-gray-400 mb-6">
                Codolio helps you navigate and track your coding journey to
                success
              </p>
              <Button size="lg" className="mb-12">
                Login / Signup →
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-10 mb-6">
              <div className="mb-4 lg:ml-auto flex flex-col lg:mt-[10px]">
                <label className="block text-lg font-medium">
                  LeetCode Username
                </label>
                <input
                  type="text"
                  value={leetCodeUserName}
                  onChange={(e) => setLeetcodeUsername(e.target.value)}
                  className="p-2 mt-2 border rounded-md text-white"
                  placeholder="Enter Your Leetcode username"
                />
                <Button
                  disabled={loading}
                  onClick={fetchLeetcodeData}
                  className="mt-3"
                >
                  {loading ? "Loading..." : "Save LeetCode Data"}
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* First column with avatar and profile info */}
                <div className="flex flex-col gap-10">
                  <div className="col-span-1 bg-gray-900 rounded shadow-lg border border-gray-700 animate-pulse">
                    <div className="p-4">
                      <div className="flex flex-col items-center lg:flex-row lg:space-x-4 mb-6">
                        <div className="relative rounded-full bg-gray-700 h-28 w-28 flex items-center justify-center border border-gray-600">
                          {/* Spinner inside the block */}
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-300"></div>
                        </div>
                        <div className="ml-4">
                          <div className="h-8 w-32 bg-gray-700 rounded mb-2 border border-gray-600"></div>
                          <div className="h-8 w-24 bg-gray-700 rounded border border-gray-600"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-6 w-full bg-gray-700 rounded border border-gray-600"></div>
                        <div className="h-6 w-full bg-gray-700 rounded border border-gray-600"></div>
                        <div className="h-6 w-full bg-gray-700 rounded border border-gray-600"></div>
                        <div className="h-6 w-full bg-gray-700 rounded border border-gray-600"></div>
                      </div>
                      <div className="mt-6 h-10 w-full bg-gray-700 rounded border border-gray-600"></div>
                    </div>
                  </div>

                  {/* Second Block */}
                  <div className="bg-gray-700 h-40 rounded shadow-lg border border-gray-600 animate-pulse flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-300"></div>
                  </div>
                </div>

                {/* Second column with stats and chart */}
                <div className="col-span-1 lg:col-span-2 bg-gray-900 rounded shadow-lg border border-gray-700 animate-pulse">
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="h-16 w-full bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-300"></div>
                      </div>
                      <div className="h-16 w-full bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-300"></div>
                      </div>
                    </div>
                    <div className="h-48 w-full bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-300"></div>
                    </div>
                  </div>
                </div>

                {/* Codolio card block */}
                <div className="col-span-3 bg-gray-900 mt-6 rounded shadow-lg border border-gray-700 animate-pulse">
                  <div className="p-4">
                    <div className="h-8 w-32 bg-gray-700 rounded mb-4 border border-gray-600"></div>
                    <div className="flex flex-col lg:flex-row lg:justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="relative rounded-full bg-gray-700 h-24 w-24 flex items-center justify-center border border-gray-600">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-300"></div>
                        </div>
                        <div>
                          <div className="h-6 w-32 bg-gray-700 rounded mb-2 border border-gray-600"></div>
                          <div className="h-6 w-32 bg-gray-700 rounded mb-2 border border-gray-600"></div>
                          <div className="h-6 w-32 bg-gray-700 rounded border border-gray-600"></div>
                        </div>
                      </div>
                      <div className="flex space-x-8 mt-6 lg:mt-0">
                        <div className="h-8 w-16 bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-300"></div>
                        </div>
                        <div className="h-8 w-16 bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="flex flex-col gap-10">
                  <Card className="col-span-1 bg-gray-900">
                    <div className="p-4">
                      <div className="flex flex-col items-center space-x-0 lg:flex-row lg:space-x-4 mb-6">
                        {leetcodeData?.avatar ? (
                          <Image
                            className="rounded-[100%]"
                            src={leetcodeData.avatar}
                            alt="LeetCode Avatar"
                            width={120}
                            height={120}
                          />
                        ) : (
                          <User
                            className="border rounded-[100%] p-3"
                            height={120}
                            width={120}
                          />
                        )}
                        <div>
                          <h3 className="text-2xl ml-4 font-mono font-semibold">
                            {leetcodeData?.name ?? "Danish Khan"}
                          </h3>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="mt-2 ml-2"
                          >
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
                        <InfoItem
                          icon={Link}
                          text={`@${leetcodeData?.username || "jhon doe"}`}
                        />
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
                    </div>
                  </Card>

                  <div>
                    <BarComponent userName={leetcodeData?.username as string} />
                  </div>
                </div>

                <Card className="col-span-1 lg:col-span-2 bg-gray-900">
                  <div className="p-2">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <StatCard
                        title="Total Questions"
                        value={leetcodeData?.totalSolved || "0"}
                      />
                      <StatCard title="Total Active Days" value="308" />
                    </div>
                  </div>
                  <div className="">
                    <LineCharts userName={leetcodeData?.username as string} />
                  </div>
                </Card>
              </div>

              <Card className="mt-6 bg-gray-900">
                <div>
                  <CardTitle>Codolio Card</CardTitle>
                </div>
                <CardContent className="flex flex-col items-center lg:flex-row lg:justify-between">
                  <div className="flex items-center space-x-4">
                    {leetcodeData?.avatar ? (
                      <Image
                        className="rounded-[100%]"
                        src={leetcodeData.avatar}
                        alt="LeetCode Avatar"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <User
                        className="border rounded-[100%] p-3"
                        height={100}
                        width={100}
                      />
                    )}
                    <div>
                      <h3 className="text-2xl font-semibold">
                        {leetcodeData?.name}
                      </h3>
                      <InfoItem
                        icon={Link}
                        text={`@${leetcodeData?.username || "jhon doe"}`}
                      />
                      <InfoItem
                        icon={MapPin}
                        text={leetcodeData?.country || "Country"}
                      />
                      <p className="text-sm text-gray-400">
                        Last updated on 28-07-2024
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-8 mt-6 lg:mt-0">
                    <div>
                      <div className="text-3xl font-bold">
                        {leetcodeData?.totalSolved || "99"}
                      </div>
                      <div className="text-sm text-gray-400">
                        Questions Solved
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">308</div>
                      <div className="text-sm text-gray-400">Active Days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
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
      <Icon className="h-5 w-5 text-gray-400 sm:h-6 sm:w-6" />
      <span className="text-sm sm:text-base">{text}</span>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <div>
        <div className="font-semibold text-sm sm:text-2xl">{title}</div>
      </div>
      <div>
        <div className="text-sm sm:text-3xl font-bold">{value}</div>
      </div>
    </Card>
  );
}
