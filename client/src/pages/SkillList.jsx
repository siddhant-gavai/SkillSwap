import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { Trash2 } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';


const SkillList = () => {
    const { user } = useAuth();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingSkillId, setDeletingSkillId] = useState(null);
    const [actionMessage, setActionMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const debouncedSearch = useDebounce(searchTerm, 400);

    const handleDeleteSkill = async (skillId) => {
        if (!window.confirm("Are you sure you want to delete this skill?")) return;
        
        setDeletingSkillId(skillId);
        try {
            await api.delete(`/skills/${skillId}`);
            setSkills(skills.filter(s => s._id !== skillId));
            setActionMessage({ type: 'success', text: 'Skill deleted successfully' });
            setTimeout(() => setActionMessage(null), 3000);
        } catch (error) {
            console.error('Error deleting skill:', error);
            setActionMessage({ type: 'error', text: 'Failed to delete skill' });
            setTimeout(() => setActionMessage(null), 3000);
        } finally {
            setDeletingSkillId(null);
        }
    };

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const { data } = await api.get('/skills', {
                    params: { 
                        search: debouncedSearch,
                        category: selectedCategory === 'All' ? undefined : selectedCategory
                    }
                });
                setSkills(data.data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, [debouncedSearch, selectedCategory]);

    if (loading) {
        return (
            <Layout>
                <div className="mb-10 animate-pulse">
                    <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mb-3"></div>
                    <div className="h-5 w-72 bg-slate-200 dark:bg-slate-800 rounded-lg mb-8"></div>
                    <div className="h-12 max-w-2xl bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white dark:bg-[#13131A] rounded-xl border border-gray-200 dark:border-[#2A2A2A] p-6 shadow-sm animate-pulse space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                                <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                            </div>
                            <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 dark:border-[#2A2A2A] pt-4 mt-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                </div>
                                <div className="h-9 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mb-10">
                <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-3">Explore Skills</h1>
                <p className="text-gray-500 dark:text-[#A0A0A0] text-lg mb-8">Find the perfect skill to begin today</p>
                
                <div className="relative max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 dark:text-[#6A6A6A]">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search skills..." 
                        className="w-full bg-white dark:bg-[#15151A] text-gray-800 dark:text-white border border-gray-200 dark:border-[#2A2A2A] rounded-2xl py-4 pl-12 pr-10 focus:outline-none focus:border-[#38bdf8] transition-colors shadow-sm"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:text-[#6A6A6A] dark:hover:text-slate-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                    {['All', 'Tech', 'Language', 'Music', 'Art', 'Fitness', 'Cooking', 'Other'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                                selectedCategory === cat
                                    ? 'bg-[#38bdf8] border-[#38bdf8] text-white dark:text-[#0E0E0E]'
                                    : 'bg-transparent border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#A0A0A0] hover:border-gray-400 dark:hover:border-[#4A4A4A]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {actionMessage && (
                <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
                    actionMessage.type === 'success' 
                        ? 'bg-green-100 border border-green-400 text-green-700' 
                        : 'bg-red-100 border border-red-400 text-red-700'
                }`}>
                    {actionMessage.text}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map(skill => {
                    const isTech = skill.category?.toLowerCase() === 'tech';
                    const badgeClass = isTech 
                        ? 'bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/30'
                        : 'bg-[#9D72FF]/10 text-[#9D72FF] border-[#9D72FF]/30';

                    return (
                        <div key={skill._id} className="bg-white dark:bg-[#13131A] rounded-xl border border-gray-200 dark:border-[#2A2A2A] overflow-hidden flex flex-col hover:shadow-md dark:hover:shadow-none hover:border-gray-300 dark:hover:border-[#3A3A3A] transition-all p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`border text-[10px] uppercase font-bold px-3 py-1 rounded-full ${badgeClass}`}>
                                    {skill.category}
                                </span>
                                <div className="flex gap-2 items-center">
                                    <span className="text-gray-500 dark:text-[#A0A0A0] text-xs font-medium">{skill.level || 'Any level'}</span>
                                    {user && (skill.ownerId?._id === user._id || user.role === 'admin') && (
                                        <button
                                            onClick={() => handleDeleteSkill(skill._id)}
                                            disabled={deletingSkillId === skill._id}
                                            className="text-red-500 hover:text-red-400 ml-2 disabled:opacity-50"
                                            title="Delete Skill"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{skill.title}</h2>
                            <p className="text-gray-500 dark:text-[#A0A0A0] text-sm mb-8 line-clamp-3 flex-1">{skill.description}</p>
                            
                            <div className="mt-auto flex items-center justify-between border-t border-gray-200 dark:border-[#2A2A2A] pt-5">
                                <div className="flex items-center text-sm">
                                    <div className="w-8 h-8 rounded-full bg-[#38bdf8] flex items-center justify-center mr-3 text-white dark:text-[#0E0E0E] font-bold">
                                        {skill.ownerId?.name?.charAt(0) || 'U'}
                                    </div>
                                    <span className="font-medium text-gray-700 dark:text-[#D0D0D0]">{skill.ownerId?.name || 'Unknown'}</span>
                                </div>
                                <Link to={`/skills/${skill._id}`}>
                                    <Button variant="primary" className="w-full sm:w-auto text-sm">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {skills.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500 dark:text-[#A0A0A0] text-lg">No skills found.</p>
                </div>
            )}
        </Layout>
    );
};

export default SkillList; // Export the component
