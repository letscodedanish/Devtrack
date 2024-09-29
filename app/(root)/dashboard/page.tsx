import Sidebar from '@/components/sidebar';
import React from 'react';

const DashboardPage: React.FC = () => {
    return (
        <div className='flex '>
            <Sidebar isSidebarOpen={false} isDarkMode={false} />
            <h1>Dashboard</h1>
        </div>
    );
};

export default DashboardPage;