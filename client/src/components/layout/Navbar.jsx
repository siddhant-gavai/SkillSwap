import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white dark:bg-slate-900 shadow-md border-b dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            SkillSwap
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                        <Link to="/skills" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                            Browse Skills
                        </Link>

                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
                                    Dashboard
                                </Link>
                                <div className="flex items-center space-x-3 ml-4">
                                    <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{user.name}</span>
                                    <Button variant="secondary" onClick={logout} className="text-xs px-3 py-1">
                                        Logout
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="secondary" className="text-xs px-3 py-1">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" className="text-xs px-3 py-1">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
