import React from 'react';
import Navbar from './Navbar';

import { BackgroundPaths } from '../ui/BackgroundPaths';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-800 dark:bg-[#0E0E0E] dark:text-white transition-colors duration-300">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
