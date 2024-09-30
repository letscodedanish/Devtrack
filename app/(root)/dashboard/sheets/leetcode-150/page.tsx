"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Star, MessageSquare, Youtube, CheckCircle, Circle } from "lucide-react";
import Sidebar from "@/components/sidebar";

export default function Leeetcode150() {
  const [sheetData, setSheetData] = useState<any>(null); // State to hold the sheet data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch data from the API (or the public directory)
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch('/sheets/leetcode.json');
        if (!response.ok) {
          throw new Error('Failed to fetch the sheet data');
        }
        const data = await response.json();
        setSheetData(data.data); // Set the sheet data
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSheetData();
  }, []); // Fetch the data once on component mount

  if (loading) {
    return <div className="p-6">Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="p-6">Error: {error}</div>; // Show error state
  }

  if (!sheetData) {
    return <div className="p-6">No data found</div>; // Show if no data is available
  }

  const { sheet, questions } = sheetData;

  // Group questions by topics
  const groupedQuestions = questions.reduce((acc: any, question: any) => {
    const topic = question.topic || "Miscellaneous";
    if (!acc[topic]) {
      acc[topic] = [];
    }
    acc[topic].push(question);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar isSidebarOpen={false} isDarkMode={false} />
      <main className="p-6">
        <h2 className="text-4xl font-bold mb-4">{sheet.name}</h2>
        <p className="text-gray-400 mb-6">{sheet.description}</p>
        <div className="space-y-4">
          {/* Iterate through each topic */}
          {Object.keys(groupedQuestions).map((topic, index) => (
            <TopicSection key={index} title={topic} questions={groupedQuestions[topic]} />
          ))}
        </div>
      </main>
    </div>
  );
}

function TopicSection({ title, questions }: { title: string; questions: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex items-center justify-between bg-gray-800 p-4 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex items-center space-x-2">
          <span>{questions.length} questions</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      {/* Display questions if the dropdown is open */}
      {isOpen && (
        <div className="space-y-2 mt-2">
          {questions.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}

function QuestionCard({ question }: { question: any }) {
  const [isSolved, setIsSolved] = useState(question.isSolved || false);

  const toggleSolved = () => {
    setIsSolved(!isSolved);
  };

  return (
    <div
      className={`flex items-center justify-between bg-gray-900 p-4 rounded-lg ${
        isSolved ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* Solved/Not Solved icon */}
        <div onClick={toggleSolved} className="cursor-pointer">
          {isSolved ? <CheckCircle className="text-green-400" /> : <Circle className="text-gray-400" />}
        </div>
        <div className="first-letter:uppercase">
          <a
            href={question.questionId.problemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium text-blue-400 hover:underline cursor-pointer  ${
              isSolved ? "line-through" : ""
            }`}
          >
            {question.questionId.slug}
          </a>
          <div className="flex space-x-2 text-sm">
            {question.questionId?.topics?.map((topic: string, i: number) => (
              <span key={i} className="bg-gray-800 px-2 py-1 rounded">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span
          className={`px-2 py-1 rounded ${
            question.questionId.difficulty === "Easy"
              ? "bg-green-900 text-green-300"
              : "bg-yellow-900 text-yellow-300"
          }`}
        >
          {question.questionId.difficulty}
        </span>
        <a href={question.resource} target="_blank" rel="noopener noreferrer">
          <Youtube className="h-5 w-5 text-red-500" />
        </a>
        <Star className="h-5 w-5 text-gray-400" />
        <MessageSquare className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
