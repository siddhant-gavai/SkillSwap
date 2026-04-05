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
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Skills</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Find the perfect skill to learn today.</p>
                </div>
                {/* Search/Filter could go here */}
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
                {skills.map(skill => (
                    <div key={skill._id} className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col group border border-white/20 dark:border-slate-700/30">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <GlowingEffect
                            spread={60}
                            glow={true}
                            disabled={false}
                            proximity={100}
                            inactiveZone={0.01}
                            borderWidth={3}

                        />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/30">
                                        {skill.category}
                                    </span>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-slate-500 dark:text-slate-400 text-xs font-medium tracking-wide border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-md">{skill.level}</span>
                                        {user && skill.ownerId?._id === user._id && (
                                            <button
                                                onClick={() => handleDeleteSkill(skill._id)}
                                                disabled={deletingSkillId === skill._id}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 p-1 rounded transition-colors disabled:opacity-50"
                                                title="Delete Skill"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-heading leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{skill.title}</h2>
                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-3 leading-relaxed">{skill.description}</p>
                                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-auto">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center mr-3 ring-2 ring-white dark:ring-slate-800 shadow-md">
                                        <span className="font-bold text-slate-700 dark:text-slate-200">{skill.ownerId?.name?.charAt(0) || 'U'}</span>
                                    </div>
                                    <span className="font-medium">{skill.ownerId?.name}</span>
                                </div>
                            </div>
                            <div className="bg-white/50 dark:bg-slate-900/30 px-6 py-4 border-t border-white/20 dark:border-slate-700/50 backdrop-blur-sm">
                                <Link to={`/skills/${skill._id}`} className="block">
                                    <Button variant="secondary" className="w-full text-sm font-bold tracking-wide py-3 hover:bg-white dark:hover:bg-slate-700 transition-colors">
                                        View Details
                                    </Button>
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

export default SkillList; // Export the component
