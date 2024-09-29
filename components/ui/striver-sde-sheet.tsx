'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Star, MessageSquare, Youtube } from "lucide-react"

export function StriverSdeSheet() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Codolio</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Question Tracker</Button>
          <Button variant="ghost">Event Tracker</Button>
          <Button variant="ghost">Profile Tracker</Button>
          <Button variant="outline">Login</Button>
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-4xl font-bold mb-4">Striver SDE Sheet</h2>
        <p className="text-gray-400 mb-6">
          SDE Sheet contains very handily crafted and picked top coding interview questions from different topics of Data
          Structures & Algorithms. These questions are one of the most asked coding interview questions in coding
          interviews of companies like Google, Amazon, Microsoft, Facebook, Swiggy, Flipkart, etc, and cover almost all of
          the concepts related to Data Structure & Algorithms.
        </p>
        <Button className="mb-8">Follow</Button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Solved Questions" value="0" total="191" />
          <StatCard title="Unsolved Questions" value="191" />
          <StatCard title="Total Questions" value="191" />
          <Card className="bg-gray-900 p-4">
            <div className="text-6xl font-bold">0</div>
            <div className="text-xl mt-2">191</div>
          </Card>
        </div>

        <div className="space-y-4">
          <TopicSection title="Arrays" count="0 / 6" />
          <ProblemList />
          <TopicSection title="Arrays Part-II" count="0 / 6" />
          <TopicSection title="Arrays Part-III" count="0 / 6" />
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, value, total }: { title: string; value: string; total?: string }) {
  return (
    <Card className="bg-gray-900 p-4">
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="text-3xl font-bold">{value}</div>
        {total && <div className="text-sm text-gray-400 mt-1">of {total}</div>}
      </CardContent>
    </Card>
  )
}

function TopicSection({ title, count }: { title: string; count: string }) {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="flex items-center space-x-2">
        <span>{count}</span>
        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  )
}

function ProblemList() {
  const problems = [
    { name: "Set Matrix Zeros", difficulty: "Medium", topics: ["Arrays", "HashMap and Set"] },
    { name: "Pascal's Triangle", difficulty: "Easy", topics: ["Arrays", "Dynamic Programming"] },
    { name: "Next Permutation", difficulty: "Medium", topics: ["Arrays", "Two Pointers"] },
    { name: "Kadane's Algorithm", difficulty: "Medium", topics: ["Arrays", "Dynamic Programming"] },
    { name: "Sort an array of 0's, 1's and 2's", difficulty: "Medium", topics: ["Arrays", "Two Pointers", "+1"] },
    { name: "Stock Buy and Sell", difficulty: "Easy", topics: ["Arrays", "Dynamic Programming"] },
  ]

  return (
    <div className="space-y-2">
      {problems.map((problem, index) => (
        <div key={index} className="flex items-center justify-between bg-gray-900 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 rounded-full border-2 border-gray-700" />
            <div>
              <h4 className="font-medium">{problem.name}</h4>
              <div className="flex space-x-2 text-sm">
                {problem.topics.map((topic, i) => (
                  <span key={i} className="bg-gray-800 px-2 py-1 rounded">{topic}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`px-2 py-1 rounded ${problem.difficulty === 'Easy' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
              {problem.difficulty}
            </span>
            <Youtube className="h-5 w-5 text-red-500" />
            <Star className="h-5 w-5 text-gray-400" />
            <MessageSquare className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  )
}