import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Repeat, Users, Star } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="flex-grow flex items-center justify-center py-20 bg-gradient-to-br from-indigo-50 to-white">
                <div className="text-center max-w-3xl px-4">
                    <h1 className="text-5xl font-extrabold text-indigo-900 mb-6 leading-tight">
                        Exchange Skills, <span className="text-indigo-600">Master New Passions</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10">
                        Join a community of learners and teachers. Trade your expertise for someone else's. No money involved, just pure knowledge sharing.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register" className="flex items-center bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl">
                            Get Started <ArrowRight className="ml-2" size={20} />
                        </Link>
                        <Link to="/skills" className="px-8 py-3 rounded-full text-lg font-semibold text-indigo-600 border-2 border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50 transition">
                            Browse Skills
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Info */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 rounded-xl hover:shadow-md transition">
                        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                            <Repeat size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Fair Exchange</h3>
                        <p className="text-gray-600">Give an hour, get an hour. Our system ensures equitable skill swapping for everyone.</p>
                    </div>
                    <div className="text-center p-6 rounded-xl hover:shadow-md transition">
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                            <Users size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                        <p className="text-gray-600">Connect with genuine people passionate about teaching and learning.</p>
                    </div>
                    <div className="text-center p-6 rounded-xl hover:shadow-md transition">
                        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                            <Star size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Rated & Reviewed</h3>
                        <p className="text-gray-600">Build trust through our transparent review and rating system.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
