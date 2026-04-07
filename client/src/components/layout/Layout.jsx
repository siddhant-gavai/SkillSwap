import React from 'react';
import Navbar from './Navbar';

import { BackgroundPaths } from '../ui/BackgroundPaths';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#0E0E0E] text-white">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
