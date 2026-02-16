import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-slate-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                            </div>
                            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 font-heading tracking-tight group-hover:opacity-90 transition-opacity">
                                SkillSwap
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        <ThemeToggle />

                        <Link to="/skills" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                            Browse Skills
                        </Link>

                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                                    Dashboard
                                </Link>
                                <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-slate-700">
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user.name}</span>
                                    <Button variant="secondary" onClick={logout} className="text-xs px-4 py-2">
                                        Logout
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login">
                                    <Button variant="secondary" className="px-5">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" className="px-6 shadow-lg shadow-blue-500/20">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
