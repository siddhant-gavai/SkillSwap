import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import api from '../services/api';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Share2, Check } from 'lucide-react';

const SkillDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(null);
    const [shareCopied, setShareCopied] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
    };

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const { data } = await api.get(`/skills/${id}`);
                setSkill(data.data);
            } catch (error) {
                console.error('Error fetching skill:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkill();
    }, [id]);

    const handleRequest = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await api.post('/requests', {
                skillId: id,
                message
            });
            setRequestStatus('success');
            setMessage('');
        } catch (error) {
            console.error('Error sending request:', error);
            setRequestStatus('error');
        }
    };

    if (loading) return <Layout><div className="text-center py-10">Loading...</div></Layout>;
    if (!skill) return <Layout><div className="text-center py-10">Skill not found</div></Layout>;

    const isOwner = user && user._id === skill.ownerId?._id;

    return (
        <Layout>
            <div className="max-w-3xl mx-auto mb-4 flex justify-between items-center px-2">
                <button 
                    onClick={() => navigate('/skills')}
                    className="flex items-center text-slate-600 dark:text-[#A0A0A0] hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-semibold focus:outline-none"
                >
                    <ArrowLeft size={16} className="mr-1.5" /> Back to browse
                </button>
                <button
                    onClick={handleShare}
                    className="flex items-center text-xs text-slate-600 dark:text-[#A0A0A0] hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-800 transition-colors focus:outline-none shadow-sm hover:shadow"
                >
                    {shareCopied ? (
                        <>
                            <Check size={14} className="mr-1 text-emerald-500" />
                            <span className="text-emerald-500 font-medium">Link Copied!</span>
                        </>
                    ) : (
                        <>
                            <Share2 size={14} className="mr-1" />
                            <span>Share Skill</span>
                        </>
                    )}
                </button>
            </div>
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
                <div className="bg-blue-600 px-6 py-4">
                    <div className="flex justify-between items-center text-white">
                        <span className="bg-blue-800 text-xs px-2 py-1 rounded-full">{skill.category}</span>
                        <span className="text-sm font-medium">{skill.level} Level</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mt-2">{skill.title}</h1>
                </div>

                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center mr-4 text-gray-600 dark:text-gray-300 font-bold text-xl">
                            {skill.ownerId?.name?.charAt(0)}
                        </div>
                        <div>
                            <p className="text-gray-900 dark:text-white font-semibold text-lg">{skill.ownerId?.name}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Instructor</p>
                        </div>
                    </div>

                    <div className="prose max-w-none mb-8">
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">About this skill</h3>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{skill.description}</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg mb-8">
                        <h3 className="font-semibold mb-1 dark:text-white">Availability</h3>
                        <p className="text-gray-700 dark:text-gray-300">{skill.availability}</p>
                    </div>

                    {!isOwner && (
                        <div className="border-t dark:border-slate-700 pt-6">
                            <h3 className="text-xl font-bold mb-4 dark:text-white">Request a Session</h3>
                            {requestStatus === 'success' ? (
                                <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                                    Request sent successfully! Check your dashboard for updates.
                                </div>
                            ) : (
                                <form onSubmit={handleRequest}>
                                    <textarea
                                        className={`w-full border rounded-lg p-3 focus:ring-2 focus:outline-none bg-white dark:bg-slate-900 dark:text-white ${
                                            message.length >= 500
                                                ? 'border-red-500 focus:ring-red-500'
                                                : message.length >= 400
                                                ? 'border-yellow-500 focus:ring-yellow-500'
                                                : 'border-slate-350 dark:border-slate-600 focus:ring-blue-500'
                                        }`}
                                        rows="3"
                                        placeholder="Hi, I'm interested in learning this... (minimum 10 characters)"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        maxLength="500"
                                        required
                                    ></textarea>
                                    <div className="flex justify-between items-center mb-4 mt-1">
                                        {message.length > 0 && message.length < 10 && (
                                            <span className="text-xs text-red-500">Must be at least 10 characters</span>
                                        )}
                                        {message.length >= 400 && (
                                            <span className={`text-xs ${message.length >= 500 ? 'text-red-500 font-medium' : 'text-yellow-600 dark:text-yellow-500'}`}>
                                                {message.length >= 500 ? 'Maximum length reached' : 'Approaching character limit'}
                                            </span>
                                        )}
                                        <p className={`text-xs ml-auto ${
                                            message.length >= 500 
                                                ? 'text-red-500 font-bold' 
                                                : message.length >= 400 
                                                ? 'text-yellow-600 dark:text-yellow-500 font-semibold' 
                                                : 'text-gray-400'
                                        }`}>
                                            {message.length}/500
                                        </p>
                                    </div>
                                    <Button type="submit" variant="primary" className="w-full" disabled={message.trim().length < 10}>
                                        Send Request
                                    </Button>
                                    {requestStatus === 'error' && (
                                        <p className="text-red-500 mt-2 text-sm">Failed to send request. Make sure message is at least 10 chars.</p>
                                    )}
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SkillDetail;
