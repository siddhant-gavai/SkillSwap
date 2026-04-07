import React from 'react';
import Navbar from './Navbar';

import { BackgroundPaths } from '../ui/BackgroundPaths';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
            {/* Drifting Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-[100px] animate-orb-1 pointer-events-none mix-blend-screen dark:mix-blend-lighten"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full blur-[100px] animate-orb-2 pointer-events-none mix-blend-screen dark:mix-blend-lighten"></div>
            <div className="absolute top-[40%] left-[60%] w-[25rem] h-[25rem] bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-[80px] animate-orb-1 pointer-events-none mix-blend-screen dark:mix-blend-lighten" style={{ animationDelay: '5s' }}></div>
            
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
