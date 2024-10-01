"use client";

import * as React from "react";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, Dot } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "../ui/progress";

export const description = "An interactive line chart";

interface ContestData {
  contestParticipation: {
    contest: {
      startTime: number;
    };
    rating: number;
  }[];
  contestRating?: number;
  contestGlobalRanking?: number;
  contestAttend?: number; // Include contestAttend
}

const transformContestData = (data: ContestData) => {
  return data.contestParticipation.map((contest) => ({
    date: new Date(contest.contest.startTime * 1000).toLocaleDateString("en-US"),
    rating: contest.rating,
  }));
};

const findMinMaxPoints = (data: { date: string; rating: number }[]) => {
  if (data.length === 0) return { min: null, max: null };
  let min = data[0];
  let max = data[0];
  data.forEach((point) => {
    if (point.rating < min.rating) min = point;
    if (point.rating > max.rating) max = point;
  });
  return { min, max };
};

export function LineCharts({ userName }: { userName: string }) {
  const fetchContestData = async () => {
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/${userName}/contest`);
    const data = await response.json();
    setContest(data);
    return data;
  };

  const [contestData, setContestData] = React.useState<{ date: string; rating: number }[]>([]);
  const [contest, setContest] = useState<ContestData | null>(null);

  React.useEffect(() => {
    fetchContestData().then((data) => {
      const transformedData = transformContestData(data);
      setContestData(transformedData);
    });
  }, [userName]);

  const { min, max } = findMinMaxPoints(contestData);

  const CustomDot = (props: { cx: number; cy: number; value: number }) => {
    const { cx, cy, value } = props;
    if ((min && value === min.rating) || (max && value === max.rating)) {
      return (
        <Dot
          cx={cx}
          cy={cy}
          r={5}
          fill={value === min.rating ? "red" : "green"}
          stroke="none"
        />
      );
    }
    return null;
  };

  return (
    <div>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
          <Card className="">
            <div>
              <CardTitle className="text-md">Total Contests</CardTitle>
            </div>
            <div>
              <div className="text-xl font-bold">{contest?.contestAttend || "0"}</div>
            </div>
          </Card>
          <Card>
            <div>
              <CardTitle className="text-md">Rating</CardTitle>
            </div>
            <div>
              <div className="text-2xl font-bold">{contest?.contestRating}</div>
              <div className="mt-2 ">
                <div className="flex items-center justify-between">
                  <span>Contest Global Ranking</span>
                  <span>{contest?.contestGlobalRanking}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Problems Solved</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProgressCard title="Fundamentals" value={127} max={200} />
            <ProgressCard title="DSA" value={675} max={1000} />
            <ProgressCard title="CS Fundamentals" value={48} max={100} />
            <ProgressCard title="Competitive Programming" value={70} max={100} />
          </div>
        </div>
      </CardContent>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Line Chart - Contest Ratings</CardTitle>
          <CardDescription>Showing contest ratings over time</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={{
            rating: {
              label: "Rating",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="aspect-auto h-[250px] md:h-[300px] w-full"
        >
          <LineChart
            data={contestData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="rating"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="rating"
              type="monotone"
              stroke={`var(--color-rating)`}
              strokeWidth={2}
              dot={(props) => <CustomDot {...props} />}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}

function ProgressCard({
  title,
  value,
  max,
}: {
  title: string;
  value: number;
  max: number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{title}</span>
        <span>{value}</span>
      </div>
      <Progress value={(value / max) * 100} className="h-2" />
    </div>
  );
}
