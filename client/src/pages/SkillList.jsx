import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import GlowingEffect from '../components/ui/GlowingEffect';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { Trash2 } from 'lucide-react';


const SkillList = () => {
    const { user } = useAuth();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingSkillId, setDeletingSkillId] = useState(null);
    const [actionMessage, setActionMessage] = useState(null);

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
            <div className="mb-10">
                <h1 className="text-5xl font-extrabold text-white mb-3">Explore Skills</h1>
                <p className="text-[#A0A0A0] text-lg mb-8">Find the perfect skill to begin today</p>
                
                <div className="relative max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6A6A6A]">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search skills..." 
                        className="w-full bg-[#15151A] text-white border border-[#2A2A2A] rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#38bdf8] transition-colors shadow-sm"
                    />
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
                        <div key={skill._id} className="bg-[#13131A] rounded-2xl border border-[#2A2A2A] overflow-hidden flex flex-col hover:border-[#3A3A3A] transition-colors p-6">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`border text-[10px] uppercase font-bold px-3 py-1 rounded-full ${badgeClass}`}>
                                    {skill.category}
                                </span>
                                <div className="flex gap-2 items-center">
                                    <span className="text-[#A0A0A0] text-xs font-medium">{skill.level || 'Any level'}</span>
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
                            <h2 className="text-2xl font-bold text-white mb-2">{skill.title}</h2>
                            <p className="text-[#A0A0A0] text-sm mb-8 line-clamp-3 flex-1">{skill.description}</p>
                            
                            <div className="mt-auto flex items-center justify-between border-t border-[#2A2A2A] pt-5">
                                <div className="flex items-center text-sm">
                                    <div className="w-8 h-8 rounded-full bg-[#38bdf8] flex items-center justify-center mr-3 text-[#0E0E0E] font-bold">
                                        {skill.ownerId?.name?.charAt(0) || 'U'}
                                    </div>
                                    <span className="font-medium text-[#D0D0D0]">{skill.ownerId?.name || 'Unknown'}</span>
                                </div>
                                <Link to={`/skills/${skill._id}`}>
                                    <button className="bg-[#38bdf8] text-[#0E0E0E] px-4 py-2 flex items-center justify-center rounded-full font-bold text-sm hover:bg-[#0284c7] transition-colors">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {skills.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-[#A0A0A0] text-lg">No skills found.</p>
                </div>
            )}
        </Layout>
    );
};

export default SkillList; // Export the component
