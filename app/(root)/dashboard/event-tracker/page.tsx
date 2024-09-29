"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaCode } from 'react-icons/fa';
import { SiCodeforces, SiGeeksforgeeks, SiLeetcode } from "react-icons/si";
import { LucideExternalLink } from 'lucide-react';

const localizer = momentLocalizer(moment);

interface ContestEvent extends Event {
    platform: string;
    name: string;
    startDate: Date;
    endDate: Date;
    phase: string;
    duration: number;
    durationSeconds: number;
    relativeTimeSeconds: number;
    url: string;
}

const ContestCalendar: React.FC = () => {
    const [events, setEvents] = useState<ContestEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<ContestEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState<string>('');

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await fetch('/sheets/striversheet.json');
                console.log('Fetched contest data:', response);

                const contests = response;
                
                if (Array.isArray(contests)) {
                    const data = contests.map((contest: Contest) => ({
                        title: `${contest.contestName} (${contest.platform})`,
                        start: new Date(contest.contestStartDate),
                        end: new Date(contest.contestEndDate),
                        allDay: false,
                        platform: contest.platform,
                        name: contest.contestName,
                        startDate: new Date(contest.contestStartDate),
                        endDate: new Date(contest.contestEndDate),
                        phase: contest.contestType,
                        duration: contest.contestDuration / 60,
                        durationSeconds: contest.contestDuration,
                        relativeTimeSeconds: 0,
                        url: contest.contestUrl || ''
                    }));
                    setEvents(data);
                } else {
                    console.error('Response data is not an array:', contests);
                }
                
                interface Contest {
                    contestName: string;
                    platform: string;
                    contestStartDate: string;
                    contestEndDate: string;
                    contestType: string;
                    contestDuration: number;
                    contestUrl?: string;
                }
            } catch (error) {
                console.error('Error fetching contests:', error);
            }
        };

        fetchContests();
    }, []);

    const handleEventClick = (event: ContestEvent, e: React.SyntheticEvent) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        setModalPosition({ top: rect.top + window.scrollY + 20, left: rect.left + window.scrollX });
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const formatGoogleCalendarDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        const hours = (`0${date.getHours()}`).slice(-2);
        const minutes = (`0${date.getMinutes()}`).slice(-2);
        const seconds = (`0${date.getSeconds()}`).slice(-2);
        return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    };

    const handleAddToCalendar = () => {
        if (selectedEvent) {
            const startDate = formatGoogleCalendarDate(selectedEvent.startDate);
            const endDate = formatGoogleCalendarDate(selectedEvent.endDate);
            const eventTitle = encodeURIComponent(selectedEvent.name);

            const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}`;

            window.open(url, '_blank');
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlatform(e.target.value);
    };

    const filteredEvents = events.filter((event) =>
        (selectedPlatform === '' || event.platform === selectedPlatform) &&
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getPlatformIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'leetcode':
                return <span><SiLeetcode className='text-[20px]'/></span>;
            case 'codeforces':
                return <span><SiCodeforces className='text-[20px]' /></span>;
            case 'geeksforgeeks':
                return <span><SiGeeksforgeeks className='text-[20px]' /></span>;
            default:
                return <span><FaCode className='text-[20px]' /></span>;
        }
    };

    type EventProps = {
        event: ContestEvent;
    };

    const CustomEvent: React.FC<EventProps> = ({ event }) => {
        return (
            <span className="flex items-center p-[3px] gap-[4px]">
                {getPlatformIcon(event.platform)}
                <span>{event.title}</span>
            </span>
        );
    };

    return (
        <div className="bg-gray-50 h-screen w-screen flex flex-col">
            <div className='m-16'>
                <div className="flex w-full items-center mb-10 justify-between gap-4">
                    <input
                        type="text"
                        placeholder="Search contests"
                        className="text-[20px] px-4 w-[950px] py-3 border border-gray-300 rounded-md rounded-l-lg focus:outline-none"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select 
                        value={selectedPlatform}
                        onChange={handlePlatformChange}
                        className="w-full text-gray-400 px-4 py-3 text-[25px] border rounded-md border-gray-300 rounded-r-lg focus:outline-none"
                    >
                        <option value="">All Platforms</option>
                        <option value="leetcode">LeetCode</option>
                        <option value="codeforces">Codeforces</option>
                        <option value="geeksforgeeks">GeeksforGeeks</option>
                        <option value="atcoder">AtCoder</option>
                        <option value="codechef">CodeChef</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="col-span-1 lg:col-span-1">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Upcoming Contests</h2>
                        <p className="text-sm font-mono text-slate-700 mb-4">Dont miss scheduled events</p>
                        <div className="space-y-4 overflow-scroll scroll-smooth overflow-x-hidden h-[650px]">
                            {filteredEvents.map((event) => (
                                <div key={event.startDate.toString()} className="bg-white p-4 rounded-lg shadow border border-gray-400">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className='flex'>
                                                {getPlatformIcon(event.platform)}
                                                <div className='-mt-1 flex'>
                                                    <h3 className="ml-2 text-lg font-semibold">{event.name.length > 30 ? event.name.slice(0, 30) + '...' : event.name}</h3>
                                                    <a href={event.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-black">
                                                        <LucideExternalLink />
                                                    </a>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-[20px] mt-2">{event.startDate.toLocaleString()}</p>
                                            <button
                                                onClick={handleAddToCalendar}
                                                className="mt-2 text-[18px] underline text-blue-600 rounded"
                                            >
                                                Add to Google Calendar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                        <Calendar
                            localizer={localizer}
                            events={filteredEvents}
                            startAccessor="start"
                            endAccessor="start"
                            style={{ height: 700 }}
                            onSelectEvent={handleEventClick}
                            views={{
                                day: true,
                                week: true,
                                month: true,
                            }}
                            components={{
                                event: CustomEvent
                            }}
                        />
                    </div>
                </div>

                {isModalOpen && selectedEvent && (
                    <div
                        className="fixed z-10 p-8 bg-white border rounded shadow-lg"
                        style={{ top: modalPosition.top, left: modalPosition.left }}
                    >
                        <h2 className="text-xl font-bold mb-2">{selectedEvent.name}</h2>
                        <p>{selectedEvent.startDate.toLocaleString()} - {selectedEvent.endDate.toLocaleString()}</p>
                        <button onClick={closeModal} className="mt-4 text-red-600">
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestCalendar;
