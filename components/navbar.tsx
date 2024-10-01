"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Menu } from "lucide-react"; // Added Menu icon for mobile
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="border-b border-gray-800">
      <div className="flex items-center justify-between p-4 lg:justify-around">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h1 className="text-2xl font-bold">Codolio</h1>
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu} // Toggle menu visibility on click
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Links Section (visible on large screens) */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/dashboard">
            <Button className="text-md" variant="ghost">
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/event-tracker">
            <Button className="text-md" variant="ghost">
              Event Tracker
            </Button>
          </Link>
          <Link href="/dashboard/sheets">
            <Button className="text-md" variant="ghost">
              DSA Sheets
            </Button>
          </Link>
          <Button className="size-10" variant="ghost" size="icon">
            <Moon className="h-5 w-5" />
          </Button>
          <Link href="/login">
            <Button className="text-md">Login</Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Links (visible only when the menu is open) */}
      {isOpen && (
        <div className="flex flex-col lg:hidden space-y-2 p-4 border-t border-gray-800">
          <Link href="/dashboard">
            <Button className="w-full text-left" variant="ghost">
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/event-tracker">
            <Button className="w-full text-left" variant="ghost">
              Event Tracker
            </Button>
          </Link>
          <Link href="/dashboard/sheets">
            <Button className="w-full text-left" variant="ghost">
              DSA Sheets
            </Button>
          </Link>
          <Button className="w-full text-left" variant="ghost" size="icon">
            <Moon className="h-5 w-5" />
          </Button>
          <Link href="/login">
            <Button className="w-full">Login</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
