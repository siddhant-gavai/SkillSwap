import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import GlowingEffect from '../components/ui/GlowingEffect';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const SkillList = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const { data } = await api.get('/skills');
                setSkills(data.data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    if (loading) return <Layout><div className="text-center py-10">Loading...</div></Layout>;

    return (
        <Layout>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Skills</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Find the perfect skill to learn today.</p>
                </div>
                {/* Search/Filter could go here */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map(skill => (
                    <div key={skill._id} className="relative bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col">
                        <GlowingEffect
                            spread={40}
                            glow={true}
                            disabled={false}
                            proximity={64}
                            inactiveZone={0.01}
                            borderWidth={2}
                        />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-semibold tracking-wide uppercase">
                                        {skill.category}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs">{skill.level}</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skill.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{skill.description}</p>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center mr-2 text-gray-600 dark:text-gray-300 font-bold">
                                        {skill.ownerId?.name?.charAt(0) || 'U'}
                                    </div>
                                    <span>{skill.ownerId?.name}</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-slate-700/50 px-6 py-4 border-t dark:border-slate-700">
                                <Link to={`/skills/${skill._id}`}>
                                    <Button variant="secondary" className="w-full text-sm">View Details</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {skills.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No skills found.</p>
                </div>
            )}
        </Layout>
    );
};

export default SkillList;
