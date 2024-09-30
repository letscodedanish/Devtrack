"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <header className="flex items-center justify-around p-4 border-b border-gray-800">
      <div className="flex items-center space-x-4">
        <Link href="/">
            <h1 className="text-2xl font-bold">Codolio</h1>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button className="text-md"
          variant="ghost">Dashboard</Button>
        </Link>
        <Link href="/dashboard/event-tracker">
          <Button className="text-md" variant="ghost">Event Tracker</Button>
        </Link>
        <Link href="/dashboard/sheets">
          <Button className="text-md" variant="ghost">DSA Sheets</Button>
        </Link>
        <Button className="size-10" variant="ghost" size="icon">
          <Moon className="h-5 w-5" />
        </Button>
        <Link href="/login">
          <Button className="text-md"
          >Login</Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
