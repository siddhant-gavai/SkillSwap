import React from 'react'; // Home page component
import { Link } from 'react-router-dom';
import { ArrowRight, Repeat, Users, Star } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const Home = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-800 dark:bg-[#0E0E0E] dark:text-white transition-colors duration-300 flex flex-col">
            <Navbar />
            <div className="flex flex-col flex-grow">
                {/* Hero Section */}
                <section className="flex-grow flex items-center justify-center py-20 bg-gradient-to-br from-indigo-50 to-white dark:from-[#111827] dark:to-[#030712] transition-colors duration-300">
                    <div className="text-center max-w-3xl px-4">
                        <h1 className="text-5xl font-extrabold text-indigo-900 dark:text-indigo-100 mb-6 leading-tight">
                            Exchange Skills, <span className="text-indigo-600 dark:text-indigo-400">Master New Passions</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                            Join a community of learners and teachers. Trade your expertise for someone else's. No money involved, just pure knowledge sharing.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/register" className="flex items-center bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl">
                                Get Started <ArrowRight className="ml-2" size={20} />
                            </Link>
                            <Link to="/skills" className="px-8 py-3 rounded-full text-lg font-semibold text-indigo-600 dark:text-indigo-400 border-2 border-indigo-200 dark:border-indigo-850 hover:border-indigo-600 dark:hover:border-indigo-550 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition">
                                Browse Skills
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Info */}
                <section className="py-16 bg-white dark:bg-[#13131A] border-t border-gray-100 dark:border-[#2A2A2A] transition-colors duration-300">
                    <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-xl hover:shadow-md dark:hover:shadow-slate-900/40 transition">
                            <div className="bg-indigo-100 dark:bg-indigo-950/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                                <Repeat size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Fair Exchange</h3>
                            <p className="text-gray-600 dark:text-gray-400">Give an hour, get an hour. Our system ensures equitable skill swapping for everyone.</p>
                        </div>
                        <div className="text-center p-6 rounded-xl hover:shadow-md dark:hover:shadow-slate-900/40 transition">
                            <div className="bg-purple-100 dark:bg-purple-950/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Community Driven</h3>
                            <p className="text-gray-600 dark:text-gray-400">Connect with genuine people passionate about teaching and learning.</p>
                        </div>
                        <div className="text-center p-6 rounded-xl hover:shadow-md dark:hover:shadow-slate-900/40 transition">
                            <div className="bg-orange-100 dark:bg-orange-950/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-400">
                                <Star size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Rated & Reviewed</h3>
                            <p className="text-gray-600 dark:text-gray-400">Build trust through our transparent review and rating system.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
