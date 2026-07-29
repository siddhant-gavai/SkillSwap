import React, { useEffect, useState } from 'react'; // Import React and hooks
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import ScheduleSessionModal from '../components/modals/ScheduleSessionModal';
import { Calendar, Clock, Video, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [mySkills, setMySkills] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [deletingSkillId, setDeletingSkillId] = useState(null);
    const [actionMessage, setActionMessage] = useState(null);

    const handleDeleteSkill = async (skillId) => {
        if (!window.confirm("Are you sure you want to delete this skill?")) return;

        setDeletingSkillId(skillId);
        try {
            await api.delete(`/skills/${skillId}`);
            setMySkills(mySkills.filter(skill => skill._id !== skillId));
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
        const fetchData = async () => {
            try {
                const [skillsRes, sentRes, receivedRes, recRes] = await Promise.all([
                    api.get('/skills/my'),
                    api.get('/requests/sent'),
                    api.get('/requests/received'),
                    api.post('/ai/recommend')
                ]);
                setMySkills(skillsRes.data.data);
                setSentRequests(sentRes.data.data);
                setReceivedRequests(receivedRes.data.data);
                setRecommendations(recRes.data.data || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAcceptRequest = async (id) => {
        try {
            await api.put(`/requests/${id}`, { status: 'ACCEPTED' });
            // Refresh data
            const res = await api.get('/requests/received');
            setReceivedRequests(res.data.data);
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const openScheduleModal = (request) => {
        setSelectedRequest(request);
        setIsScheduleModalOpen(true);
    };

    const handleScheduleSubmit = async (requestId, scheduleData) => {
        await api.put(`/requests/${requestId}/schedule`, scheduleData);
        // Refresh data to show upcoming session
        const [sentRes, receivedRes] = await Promise.all([
            api.get('/requests/sent'),
            api.get('/requests/received')
        ]);
        setSentRequests(sentRes.data.data);
        setReceivedRequests(receivedRes.data.data);
    };

    const upcomingSessions = [
        ...sentRequests,
        ...receivedRequests
    ].filter(req => req.isScheduled && req.status !== 'CANCELLED' && req.status !== 'COMPLETED')
        .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));

    if (loading) {
        return (
            <Layout>
                <div className="mb-8 animate-pulse">
                    <div className="h-9 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mb-2"></div>
                    <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
                    <div className="bg-white dark:bg-[#13131A] p-8 rounded-xl border border-gray-200 dark:border-[#2A2A2A] h-[400px] space-y-4">
                        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6"></div>
                        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                    </div>
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-[#13131A] p-8 rounded-xl border border-gray-200 dark:border-[#2A2A2A] h-[200px] space-y-4">
                            <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6"></div>
                            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        </div>
                        <div className="bg-white dark:bg-[#13131A] p-8 rounded-xl border border-gray-200 dark:border-[#2A2A2A] h-[200px] space-y-4">
                            <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6"></div>
                            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome, {user?.name}!</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your skills and exchange requests here.</p>
            </div>

            {/* Upcoming Sessions Section */}
            {upcomingSessions.length > 0 && (
                <div className="mb-10 relative bg-white dark:bg-[#13131A] p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-[#2A2A2A] overflow-hidden group transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 flex items-center font-heading">
                            <Calendar className="mr-3" size={28} /> Upcoming Sessions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcomingSessions.map(session => (
                                <div key={session._id} className="bg-white dark:bg-[#15151A] p-5 rounded-xl border border-gray-200 dark:border-[#2A2A2A] shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-slate-100 mb-2 font-heading">{session.skillId.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-slate-300 mb-3 font-medium">
                                        with {session.requesterId._id === user._id ? session.skillId.ownerId.name : session.requesterId.name}
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center text-slate-700 dark:text-slate-300">
                                            <Calendar size={16} className="mr-2 text-purple-500" />
                                            <span className="font-semibold">{new Date(session.scheduledDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center text-slate-700 dark:text-slate-300">
                                            <Clock size={16} className="mr-2 text-blue-500" />
                                            {session.scheduledTime} <span className="text-xs text-slate-500 ml-1">({session.duration} min)</span>
                                        </div>
                                        {session.meetingLink && (
                                            <div className="flex items-center mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                                                <Video size={16} className="mr-2 text-green-500" />
                                                <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline truncate transition-colors">
                                                    Join Meeting
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* My Skills Section */}
                <div className="relative bg-white dark:bg-[#13131A] p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-[#2A2A2A] transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-end mb-6">
                            <h2 className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100 border-l-4 border-blue-500 pl-3">My Skills Offered</h2>
                            <Link to="/skills/new">
                                <Button variant="primary" className="text-sm">New Skill</Button>
                            </Link>
                        </div>
                        
                        {actionMessage && (
                            <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
                                actionMessage.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'
                            }`}>
                                {actionMessage.text}
                            </div>
                        )}

                        {mySkills.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-slate-500 dark:text-slate-400 mb-4">You haven't listed any skills yet.</p>
                                <Link to="/skills/new">
                                    <Button variant="outline" className="text-sm">Get Started</Button>
                                </Link>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {mySkills.map(skill => (
                                    <li key={skill._id} className="relative overflow-hidden bg-white dark:bg-slate-700/40 p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md transition-all flex justify-between items-center group/item">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800 dark:text-slate-100 font-heading group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">{skill.title}</h3>
                                            <span className="inline-block mt-1 text-xs font-bold uppercase tracking-wider bg-blue-100/80 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 px-2 py-0.5 rounded-md">{skill.category}</span>
                                        </div>
                                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity transform translate-x-2 group-hover/item:translate-x-0">
                                            <button
                                                onClick={() => handleDeleteSkill(skill._id)}
                                                disabled={deletingSkillId === skill._id}
                                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors disabled:opacity-50"
                                                title="Delete Skill"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Requests Overview */}
                <div className="space-y-8">
                    {/* Received Requests */}
                    <div className="relative bg-white dark:bg-[#13131A] p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-[#2A2A2A] transition-all duration-300">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold font-heading mb-6 border-l-4 border-green-500 pl-3 text-slate-800 dark:text-slate-100">Requests Received</h2>
                            {receivedRequests.length === 0 ? (
                                <p className="text-slate-500 dark:text-slate-400 italic">No incoming requests.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {receivedRequests.map(req => (
                                        <li key={req._id} className="bg-white dark:bg-slate-700/60 p-4 rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <p className="font-bold text-lg font-heading text-gray-800 dark:text-slate-100">{req.skillId?.title}</p>
                                                    <p className="text-sm text-gray-500 dark:text-slate-300">From: <span className="font-semibold">{req.requesterId?.name}</span></p>
                                                </div>
                                                <div className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${req.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                                                        req.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {req.status}
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-sm text-slate-600 dark:text-slate-300 italic border-l-2 border-slate-300 dark:border-slate-600 mb-4">
                                                "{req.message}"
                                            </div>
                                            <div className="flex space-x-3">
                                                {req.status === 'PENDING' && (
                                                    <Button onClick={() => handleAcceptRequest(req._id)} variant="success" className="text-xs py-2 px-4 w-full justify-center">
                                                        Accept Request
                                                    </Button>
                                                )}
                                                {req.status === 'ACCEPTED' && (
                                                    <Button onClick={() => openScheduleModal(req)} variant="secondary" className="text-xs py-2 px-4 w-full justify-center">
                                                        {req.isScheduled ? 'Reschedule Session' : 'Schedule Session'}
                                                    </Button>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Sent Requests */}
                    <div className="relative bg-white dark:bg-[#13131A] p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-[#2A2A2A] transition-all duration-300">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold font-heading mb-6 border-l-4 border-blue-500 pl-3 text-slate-800 dark:text-slate-100">Requests Sent</h2>
                            {sentRequests.length === 0 ? (
                                <p className="text-slate-500 dark:text-slate-400 italic">No outgoing requests.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {sentRequests.map(req => (
                                        <li key={req._id} className="bg-white dark:bg-slate-700/60 p-4 rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-bold text-lg font-heading text-gray-800 dark:text-slate-100">{req.skillId?.title}</p>
                                                    <p className="text-sm text-gray-500 dark:text-slate-300">To: <span className="font-semibold">{req.skillId?.ownerId?.name}</span></p>
                                                </div>
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${req.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                                                        req.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {req.status}
                                                </span>
                                            </div>
                                            {req.status === 'ACCEPTED' && (
                                                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-600">
                                                    <Button onClick={() => openScheduleModal(req)} variant="secondary" className="text-xs py-2 px-4 w-full justify-center">
                                                        {req.isScheduled ? 'Manage Session' : 'Schedule Session'}
                                                    </Button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* AI Recommendations Section */}
        {recommendations.length > 0 && (
            <div className="mt-12 bg-white dark:bg-[#13131A] p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-[#2A2A2A] transition-all">
                <h2 className="text-2xl font-bold font-heading mb-6 border-l-4 border-indigo-500 pl-3 text-slate-800 dark:text-slate-100">
                    Recommended for You (AI Matching)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map(skill => (
                        <Link 
                            to={`/skills/${skill._id}`} 
                            key={skill._id} 
                            className="block bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-gray-150 dark:border-slate-700/60 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-300 text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
                                    {skill.category}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {skill.level}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                                {skill.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 line-clamp-2">
                                {skill.description}
                            </p>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700/60 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-200">
                                        {skill.ownerId?.name?.charAt(0)}
                                    </div>
                                    <span className="text-gray-700 dark:text-slate-300 font-medium">
                                        {skill.ownerId?.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )}

            <ScheduleSessionModal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
                request={selectedRequest}
                onSchedule={handleScheduleSubmit}
            />
        </Layout>
    );
};

export default Dashboard;
