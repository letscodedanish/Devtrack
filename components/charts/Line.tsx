"use client"

import * as React from "react"
import { useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis, Dot } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Progress } from "../ui/progress"

export const description = "An interactive line chart"


interface ContestData {
    contestParticipation: {
        contest: {
            startTime: number;
    };
    rating: number;
}[];
}

const transformContestData = (data: ContestData) => {
    return data.contestParticipation.map((contest) => ({
        date: new Date(contest.contest.startTime * 1000).toLocaleDateString("en-US"),
        rating: contest.rating,
    }))
}

const findMinMaxPoints = (data: { date: string; rating: number }[]) => {
    if (data.length === 0) return { min: null, max: null }
    let min = data[0]
    let max = data[0]
    data.forEach((point) => {
        if (point.rating < min.rating) min = point
        if (point.rating > max.rating) max = point
    })
    return { min, max }
}

export function LineCharts({userName}: {userName: string}) {
    
    
    const fetchContestData = async () => {
      const response = await fetch(`https://alfa-leetcode-api.onrender.com/${userName}/contest`)
      const data = await response.json();
      setContest(data);
      return data;
    }

    React.useEffect(() => {
        fetchContestData().then((data) => {
            const transformedData = transformContestData(data)
            setContestData(transformedData)
            console.log(contestData);
        })
    }, [userName])
  const [contestData, setContestData] = React.useState<{ date: string; rating: number }[]>([])
  const [contest, setContest] = useState<ContestData | null>(null);

  React.useEffect(() => {
    fetchContestData().then((data) => {
      const transformedData = transformContestData(data)
      setContestData(transformedData)
    })
  }, [])

  const { min, max } = findMinMaxPoints(contestData)

  const CustomDot = (props: { cx: number; cy: number; value: number }) => {
    const { cx, cy, value } = props
    if ((min && value === min.rating) || (max && value === max.rating)) {
      return (
        <Dot
          cx={cx}
          cy={cy}
          r={5}
          fill={value === min.rating ? "red" : "green"}
          stroke="none"
        />
      )
    }
    return null
  }

  return (


    <Card className="">
      <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                <StatCard title="Total Questions" value={contest?.contestParticipation.length || "0"} />
                  <StatCard title="Total Active Days" value="308" />
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Submissions</h4>
                  {/* <div className="grid grid-cols-7 gap-1">
                    {[...Array(35)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-4 rounded ${
                          i % 7 === 0 ? "bg-green-500" : "bg-gray-700"
                        }`}
                      />
                    ))}
                  </div> */}

  
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Contests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">16</div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between">
                          <span>Codechef</span>
                          <span>6</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Codeforces</span>
                          <span>10</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">
                        {" "}
                        {"16"}{" "}
                      </div>
                      {/* <div className="text-sm text-gray-400">
                        14 Sept 2020
                        <br />
                        September Challenge 2020 Division 2
                        <br />
                        Rank: #583
                      </div> */}
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Problems Solved
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <ProgressCard title="Fundamentals" value={127} max={200} />
                    <ProgressCard title="DSA" value={675} max={1000} />
                    <ProgressCard
                      title="CS Fundamentals"
                      value={48}
                      max={100}
                    />
                    <ProgressCard
                      title="Competitive Programming"
                      value={70}
                      max={100}
                    />
                  </div>
                </div>
              </CardContent>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Line Chart - Contest Ratings</CardTitle>
          <CardDescription>
            Showing contest ratings over time
          </CardDescription>
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
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
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
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
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
                    })
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
    </Card>
  )
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