import React, { useState, useRef, useEffect } from 'react'; // Import React hooks
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
        <nav className="bg-white dark:bg-[#0E0E0E] sticky top-0 z-50 border-b border-gray-200 dark:border-[#2A2A2A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="bg-[#38bdf8] p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-[#0E0E0E] w-5 h-5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                SkillSwap
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        <Link to="/skills" className="text-slate-600 dark:text-[#A0A0A0] hover:text-slate-900 dark:hover:text-white font-medium transition-colors text-sm">
                            Browse Skills
                        </Link>
                        
                        <ThemeToggle />

                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-slate-600 dark:text-[#A0A0A0] hover:text-slate-900 dark:hover:text-white font-medium transition-colors text-sm">
                                    My Skills
                                </Link>
                                <div className="relative pl-4 border-l border-gray-200 dark:border-slate-700" ref={dropdownRef}>
                                    <button 
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center space-x-2 focus:outline-none"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                                            {user.name}
                                        </span>
                                    </button>

                                    <div className={`absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 py-2 z-50 ${dropdownOpen ? 'block' : 'hidden'}`}>
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 mb-1">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.name}</p>
                                        </div>
                                        
                                        <Link 
                                            to={`/profile/${user._id}`}
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
                                            to="/skills/new" 
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            Post a Skill
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
                                    <Button variant="outline" className="text-sm">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" className="text-sm">Get Started</Button>
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
