'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Building, Mail, Link, Phone, Briefcase, Calendar, Moon } from "lucide-react"

export function CodolioDashboard() {
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg" alt="Siddharth Singh" />
                    <AvatarFallback>SS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">Siddharth Singh</h3>
                    <Button variant="ghost" size="sm" className="mt-2">
                      Edit Profile
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <InfoItem icon={MapPin} text="India" />
                  <InfoItem icon={Building} text="DTU" />
                  <InfoItem icon={Mail} text="siddharthsingh123@gmail.com" />
                  <InfoItem icon={Link} text="@siddharthsingh" />
                  <InfoItem icon={Phone} text="N/A" />
                  <InfoItem icon={Briefcase} text="N/A" />
                  <InfoItem icon={Calendar} text="N/A" />
                </div>
                <Button variant="outline" className="w-full mt-6">
                  Get your Codolio Card
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2 bg-gray-900">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <StatCard title="Total Questions" value="920" />
                  <StatCard title="Total Active Days" value="308" />
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Submissions</h4>
                  <div className="grid grid-cols-7 gap-1">
                    {[...Array(35)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-4 rounded ${
                          i % 7 === 0 ? "bg-green-500" : "bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
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
                      <div className="text-4xl font-bold">1718</div>
                      <div className="text-sm text-gray-400">
                        14 Sept 2020
                        <br />
                        September Challenge 2020 Division 2
                        <br />
                        Rank: #583
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Problems Solved</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <ProgressCard title="Fundamentals" value={127} max={200} />
                    <ProgressCard title="DSA" value={675} max={1000} />
                    <ProgressCard title="CS Fundamentals" value={48} max={100} />
                    <ProgressCard title="Competitive Programming" value={70} max={100} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-gray-900">
            <CardHeader>
              <CardTitle>Codolio Card</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" alt="Siddharth Singh" />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-semibold">Siddharth Singh</h3>
                  <p className="text-gray-400">@siddharthsingh</p>
                  <p className="text-sm text-gray-400">Last updated on 28-07-2024</p>
                </div>
              </div>
              <div className="flex space-x-8">
                <div>
                  <div className="text-3xl font-bold">920</div>
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
  )
}

function InfoItem({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="h-5 w-5 text-gray-400" />
      <span>{text}</span>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

function ProgressCard({ title, value, max }: { title: string; value: number; max: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{title}</span>
        <span>{value}</span>
      </div>
      <Progress value={(value / max) * 100} className="h-2" />
    </div>
  )
}