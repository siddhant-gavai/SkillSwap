import React from 'react';
import Navbar from './Navbar';

import { BackgroundPaths } from '../ui/BackgroundPaths';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
            <BackgroundPaths />
            <div className="relative z-10">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
