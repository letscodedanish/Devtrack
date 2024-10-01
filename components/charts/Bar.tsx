"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

interface BarComponentProps {
  userName: string;
}

interface UserProfileData {
  totalSubmissions: { difficulty: string; count: number }[];
}

const transformUserProfileData = (data: UserProfileData) => {
  const easy = data.totalSubmissions.find((sub) => sub.difficulty === "Easy")?.count || 0;
  const medium = data.totalSubmissions.find((sub) => sub.difficulty === "Medium")?.count || 0;
  const hard = data.totalSubmissions.find((sub) => sub.difficulty === "Hard")?.count || 0;

  return [
    { category: "Easy", questions: easy, fill: "var(--color-easy)" },
    { category: "Medium", questions: medium, fill: "var(--color-medium)" },
    { category: "Hard", questions: hard, fill: "var(--color-hard)" },
  ];
};

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
} satisfies ChartConfig;

export function BarComponent({ userName }: BarComponentProps) {
  interface ChartData {
    category: string;
    questions: number;
    fill: string;
  }

  const [chartData, setChartData] = React.useState<ChartData[]>([]);

  const fetchUserProfileData = async () => {
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/userprofile/${userName}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchUserProfileData().then((data) => {
      const transformedData = transformUserProfileData(data);
      setChartData(transformedData);
    });
  }, [userName]); // Include userName as a dependency

  const totalQuestions = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.questions, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <div className="items-center pb-0">
        <CardTitle className="text-lg sm:text-xl">Overall Progress</CardTitle>
        <CardDescription className="text-sm sm:text-base">LeetCode Questions Breakdown</CardDescription>
      </div>
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] md:max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
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
                          className="fill-foreground text-3xl md:text-4xl font-bold"
                        >
                          {totalQuestions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm md:text-base"
                        >
                          Questions
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col justify-center space-y-4 p-5">
          {chartData.map((data) => (
            <div key={data.category} className="flex items-center space-x-2">
              <div
                className="w-4 h-4"
                style={{ backgroundColor: data.fill }}
              ></div>
              <div className="text-base sm:text-lg font-medium">
                {data.category}: {data.questions}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </Card>
  );
}
