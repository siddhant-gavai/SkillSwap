import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click or Escape key
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') setDropdownOpen(false);
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [dropdownOpen]);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-slate-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="bg-gradient-to-tr from-indigo-500 to-pink-500 p-2 rounded-lg group-hover:scale-105 transition-transform duration-300 animate-float-slow shadow-lg shadow-indigo-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                            </div>
                            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 font-heading tracking-tight group-hover:opacity-90 transition-opacity">
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
                                <div className="relative pl-4 border-l border-gray-200 dark:border-slate-700" ref={dropdownRef}>
                                    <button 
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center space-x-2 focus:outline-none"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                                            {user.name}
                                        </span>
                                    </button>

                                    <div className={`absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 z-50 transform origin-top-right transition-all duration-200 ${dropdownOpen ? 'opacity-100 scale-100 visible pointer-events-auto' : 'opacity-0 scale-95 invisible pointer-events-none'}`}>
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 mb-1">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.name}</p>
                                        </div>
                                        
                                        <Link 
                                            to="/profile" 
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            View Profile
                                        </Link>
                                        <Link 
                                            to="/dashboard" 
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            My Skills
                                        </Link>
                                        <Link 
                                            to="/settings" 
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            Settings
                                        </Link>
                                        
                                        <div className="border-t border-gray-100 dark:border-slate-700 mt-1 pt-1">
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
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
