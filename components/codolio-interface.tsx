'use client';

import * as React from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SheetData {
  title: string;
  link: string;
  description: string;
  completionPercentage: number;
}

export function CodolioInterface() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sheets: SheetData[] = [
    { title: "Striver SDE Sheet", link: "/dashboard/sheets/striver-sde", description: "Striver SDE sheet contains curated coding problems for software engineering preparation.", completionPercentage: 0 },
    { title: "Top Interview 150: Leetcode", link: "#", description: "Top 150 Interview questions from LeetCode for thorough interview preparation.", completionPercentage: 0 },
    { title: "Blind 75", link: "#", description: "Blind 75 is a concise list of essential coding interview questions.", completionPercentage: 0 },
    { title: "Neetcode 150", link: "#", description: "Neetcode's 150 most common coding interview questions.", completionPercentage: 0 }
  ];

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>

      <div className="flex flex-1">
        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8">
          <h2 className="text-3xl font-bold mb-2">Explore Coding Sheets</h2>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose from 37+ structured coding paths
          </p>

          {/* Search Input */}
          <div className="relative mb-6">
            <Input
              type="search"
              placeholder="Search any coding sheet"
              className={`pl-10 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
            />
            <SearchIcon className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>

          {/* Button Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Button variant="secondary">Popular</Button>
            <Button variant="ghost">Quick Revision</Button>
            <Button variant="ghost">Complete DSA</Button>
            <Button variant="ghost">Topic Specific</Button>
            <Button variant="ghost">Competitive</Button>
          </div>

          {/* Popular Sheets */}
          <h3 className="text-xl font-semibold mb-4">Popular Sheets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sheets.map((sheet) => (
              <Link href={sheet.link} key={sheet.title} passHref>
                <Card className={isDarkMode ? 'bg-gray-900 cursor-pointer' : 'bg-gray-100 cursor-pointer'}>
                  <CardHeader>
                    <CardTitle className="text-lg">{sheet.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {sheet.description}
                    </p>
                    <div className="mt-2 text-right text-sm font-semibold">{sheet.completionPercentage}%</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
