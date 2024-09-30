"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { useEffect } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

interface BarComponentProps {

    userName: string;
  
  }

interface UserProfileData {
  totalSubmissions: { count: number }[];
}

const transformUserProfileData = (data: UserProfileData) => {
  return [
    { category: "Easy", questions: data.totalSubmissions[1].count, fill: "var(--color-easy)" },
    { category: "Medium", questions: data.totalSubmissions[2].count, fill: "var(--color-medium)" },
    { category: "Hard", questions: data.totalSubmissions[3].count, fill: "var(--color-hard)" },
  ]
}

const chartConfig = {
  questions: {
    label: "Questions",
  },
  easy: {
    label: "Easy",
    color: "hsl(var(--chart-1))",
  },
  medium: {
    label: "Medium",
    color: "hsl(var(--chart-2))",
  },
  hard: {
    label: "Hard",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function BarComponent({userName}: BarComponentProps) {
  interface ChartData {
    category: string;
    questions: number;
    fill: string;
  }
  
  const [chartData, setChartData] = React.useState<ChartData[]>([])
  const fetchUserProfileData = async () => {
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/userprofile/${userName}`)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    fetchUserProfileData().then((data) => {
      const transformedData = transformUserProfileData(data)
      setChartData(transformedData)
    })
  }, [])

  const totalQuestions = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.questions, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>LeetCode Questions Breakdown</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="questions"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalQuestions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Questions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col justify-center space-y-4">
            {chartData.map((data) => (
              <div key={data.category} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4"
                  style={{ backgroundColor: data.fill }}
                ></div>
                <div className="text-lg font-medium">{data.category}: {data.questions}</div>
              </div>
            ))}
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total questions solved
        </div>
      </CardFooter>
    </Card>
  )
}
