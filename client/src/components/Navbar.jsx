import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl font-bold text-indigo-600">SkillSwap</Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/skills" className="text-gray-600 hover:text-indigo-600">Browse Skills</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>
                                <div className="relative group">
                                    <button className="flex items-center text-gray-600 hover:text-indigo-600 focus:outline-none">
                                        <span className="mr-2">{user.name}</span>
                                        <User size={20} />
                                    </button>
                                    <div className="absolute right-0 w-48 bg-white border rounded-md shadow-lg py-1 mt-2 hidden group-hover:block">
                                        <Link to={`/profile/${user._id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            <div className="flex items-center">
                                                <LogOut size={16} className="mr-2" /> Logout
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
                                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">Get Started</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
