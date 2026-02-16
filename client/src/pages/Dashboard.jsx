import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import GlowingEffect from '../components/ui/GlowingEffect';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const [mySkills, setMySkills] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [skillsRes, sentRes, receivedRes] = await Promise.all([
                    api.get('/skills/my'),
                    api.get('/requests/sent'),
                    api.get('/requests/received')
                ]);
                setMySkills(skillsRes.data.data);
                setSentRequests(sentRes.data.data);
                setReceivedRequests(receivedRes.data.data);
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

    if (loading) {
        return <Layout><div className="text-center py-10">Loading...</div></Layout>;
    }

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {user?.name}!</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your skills and exchange requests here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* My Skills Section */}
                <div className="relative bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                    <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={2}
                    />
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold dark:text-gray-100">My Skills Offered</h2>
                            <Link to="/skills/new">
                                <Button variant="primary" className="text-sm">Add Skill</Button>
                            </Link>
                        </div>
                        {mySkills.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400">You haven't listed any skills yet.</p>
                        ) : (
                            <ul className="space-y-3">
                                {mySkills.map(skill => (
                                    <li key={skill._id} className="border-b dark:border-slate-700 pb-2 last:border-0 last:pb-0">
                                        <h3 className="font-medium text-lg dark:text-gray-200">{skill.title}</h3>
                                        <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">{skill.category}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Requests Overview */}
                <div className="space-y-8">
                    {/* Received Requests */}
                    <div className="relative bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                        <GlowingEffect
                            spread={40}
                            glow={true}
                            disabled={false}
                            proximity={64}
                            inactiveZone={0.01}
                            borderWidth={2}
                        />
                        <div className="relative z-10">
                            <h2 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Requests Received</h2>
                            {receivedRequests.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400">No requests received yet.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {receivedRequests.map(req => (
                                        <li key={req._id} className="border dark:border-slate-700 p-3 rounded-md bg-gray-50 dark:bg-slate-700/50">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium dark:text-gray-200">{req.skillId?.title}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">From: {req.requesterId?.name}</p>
                                                    <p className="text-sm italic mt-1 dark:text-gray-300">"{req.message}"</p>
                                                </div>
                                                <div className="text-sm font-bold uppercase" style={{ color: req.status === 'PENDING' ? 'orange' : req.status === 'ACCEPTED' ? 'green' : 'red' }}>
                                                    {req.status}
                                                </div>
                                            </div>
                                            {req.status === 'PENDING' && (
                                                <div className="mt-2">
                                                    <Button onClick={() => handleAcceptRequest(req._id)} variant="primary" className="text-xs py-1 px-2">
                                                        Accept
                                                    </Button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Sent Requests */}
                    <div className="relative bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                        <GlowingEffect
                            spread={40}
                            glow={true}
                            disabled={false}
                            proximity={64}
                            inactiveZone={0.01}
                            borderWidth={2}
                        />
                        <div className="relative z-10">
                            <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Requests Sent</h2>
                            {sentRequests.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400">You haven't sent any requests.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {sentRequests.map(req => (
                                        <li key={req._id} className="border dark:border-slate-700 p-3 rounded-md bg-gray-50 dark:bg-slate-700/50">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium dark:text-gray-200">{req.skillId?.title}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">To: {req.skillId?.ownerId?.name}</p>
                                                </div>
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${req.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                                                    req.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {req.status}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
