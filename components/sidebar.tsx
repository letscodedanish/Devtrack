import React from 'react';
import { Button } from "@/components/ui/button"; // Adjust the import based on your project structure
import Link from 'next/link';

interface SidebarProps {
    isSidebarOpen: boolean;
    isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, isDarkMode }) => {
    return (
        <div >
            <aside className={`${isSidebarOpen ? 'block' : 'hidden'} w-64 border-r lg:block ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <nav className="p-4 space-y-2">
                <Link href="/dashboard/sheets">
                <Button variant="ghost" className="w-full justify-start">Explore Sheets</Button>
                </Link>
                <Link href="/dashboard/event-tracker">
                <Button variant="ghost" className="w-full justify-start">Open Calendar</Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start">My Sheets</Button>
                <Button variant="ghost" className="w-full justify-start">Notes</Button>
                <Button variant="ghost" className="w-full justify-start">Analysis</Button>
            </nav>
        </aside>
        </div>
    );
};

export default Sidebar;