import { CodolioInterface } from '@/components/codolio-interface';
import Sidebar from '@/components/sidebar';
import React from 'react';

const ExploreSheets: React.FC = () => {
    return (
        <div className='flex '>
            <Sidebar isSidebarOpen={false} isDarkMode={false} />
            <CodolioInterface />
        </div>
    );
};

export default ExploreSheets;