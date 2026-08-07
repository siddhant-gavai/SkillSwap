import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';
import { useAuth } from '../context/AuthContext';
import SkillCard from '../components/SkillCard';
import Layout from '../components/layout/Layout';
import { Star, Calendar, Edit2, Check, X } from 'lucide-react';

const Profile = () => {
    const { id } = useParams();
    const { user: currentUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    // Edit states
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState('');
    const [skillsOfferedInput, setSkillsOfferedInput] = useState('');
    const [skillsWantedInput, setSkillsWantedInput] = useState('');
    const [updating, setUpdating] = useState(false);

    const isCurrentUser = currentUser && currentUser._id === id;

    const fetchProfile = async () => {
        try {
            const [userRes, skillsRes] = await Promise.all([
                axios.get(`/auth/users/${id}`),
                axios.get(`/skills?ownerId=${id}`)
            ]);
            const userProfile = userRes.data.data;
            setProfile(userProfile);
            setSkills(skillsRes.data.data);

            // Set editing inputs
            setBio(userProfile.bio || '');
            setSkillsOfferedInput((userProfile.skillsOffered || []).join(', '));
            setSkillsWantedInput((userProfile.skillsWanted || []).join(', '));
        } catch (error) {
            console.error("Error fetching profile", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProfile();
        }
    }, [id]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const offeredArray = skillsOfferedInput
                .split(',')
                .map(s => s.trim())
                .filter(s => s !== '');
            const wantedArray = skillsWantedInput
                .split(',')
                .map(s => s.trim())
                .filter(s => s !== '');

            const { data } = await axios.put('/auth/profile', {
                bio,
                skillsOffered: offeredArray,
                skillsWanted: wantedArray
            });

            if (data.success) {
                setProfile(prev => ({
                    ...prev,
                    bio: data.data.bio,
                    skillsOffered: data.data.skillsOffered,
                    skillsWanted: data.data.skillsWanted
                }));
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating profile", error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto animate-pulse">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8 border border-gray-100 dark:border-slate-700">
                        <div className="w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        <div className="flex-grow space-y-4 text-center md:text-left">
                            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg mx-auto md:mx-0"></div>
                            <div className="h-4 w-96 bg-slate-200 dark:bg-slate-700 rounded-lg mx-auto md:mx-0"></div>
                            <div className="flex justify-center md:justify-start gap-6 pt-4">
                                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!profile) {
        return (
            <Layout>
                <div className="text-center py-12 dark:text-white">User not found</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 mb-8 flex flex-col md:flex-row items-start gap-8 transition-colors duration-300">
                    <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-200 text-4xl font-bold self-center md:self-auto">
                        {profile.name.charAt(0)}
                    </div>
                    <div className="flex-grow w-full">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 justify-center md:justify-start">
                                    {profile.name}
                                    {profile.isVerified && (
                                        <span className="inline-flex items-center justify-center bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 p-1 rounded-full" title="Verified User">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </span>
                                    )}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">{profile.email}</p>
                            </div>
                            {isCurrentUser && !isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-550 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    <Edit2 size={16} /> Edit Profile
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Bio</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className={`w-full border rounded-lg p-3 focus:ring-2 focus:outline-none bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white ${
                                            bio.length >= 500 
                                                ? 'border-red-500 focus:ring-red-500' 
                                                : bio.length >= 400 
                                                ? 'border-yellow-500 focus:ring-yellow-500' 
                                                : 'border-gray-300 dark:border-slate-700 focus:ring-indigo-500'
                                        }`}
                                        rows="3"
                                        maxLength="500"
                                        placeholder="Tell other users about yourself..."
                                    />
                                    <div className="flex justify-between items-center mt-1">
                                        {bio.length >= 400 && (
                                            <span className={`text-xs ${bio.length >= 500 ? 'text-red-500 font-medium' : 'text-yellow-600 dark:text-yellow-500'}`}>
                                                {bio.length >= 500 ? 'Maximum length reached' : 'Approaching character limit'}
                                            </span>
                                        )}
                                        <p className={`text-xs ml-auto ${
                                            bio.length >= 500 
                                                ? 'text-red-500 font-bold animate-pulse' 
                                                : bio.length >= 400 
                                                ? 'text-yellow-600 dark:text-yellow-500 font-semibold' 
                                                : 'text-gray-400'
                                        }`}>
                                            {bio.length}/500
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Skills You Offer (comma separated)</label>
                                    <input
                                        type="text"
                                        value={skillsOfferedInput}
                                        onChange={(e) => setSkillsOfferedInput(e.target.value)}
                                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                                        placeholder="JavaScript, UI Design, Cooking"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Skills You Want to Learn (comma separated)</label>
                                    <input
                                        type="text"
                                        value={skillsWantedInput}
                                        onChange={(e) => setSkillsWantedInput(e.target.value)}
                                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                                        placeholder="Python, Public Speaking, Guitar"
                                    />
                                </div>
                                <div className="flex gap-4 justify-end pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setBio(profile.bio || '');
                                            setSkillsOfferedInput((profile.skillsOffered || []).join(', '));
                                            setSkillsWantedInput((profile.skillsWanted || []).join(', '));
                                        }}
                                        className="flex items-center gap-1 px-4 py-2 border border-gray-300 dark:border-slate-650 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors"
                                    >
                                        <X size={16} /> Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={updating}
                                        className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                    >
                                        <Check size={16} /> {updating ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="mt-6">
                                <p className="text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">{profile.bio || "No bio yet."}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    {profile.skillsOffered && profile.skillsOffered.length > 0 && (
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Offers</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.skillsOffered.map((skill, index) => (
                                                    <span key={index} className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-300 text-xs px-3 py-1 rounded-full font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {profile.skillsWanted && profile.skillsWanted.length > 0 && (
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Wants to Learn</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.skillsWanted.map((skill, index) => (
                                                    <span key={index} className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-605 dark:text-emerald-305 text-xs px-3 py-1 rounded-full font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Star className="text-yellow-400 fill-yellow-400" size={18} />
                                        <span className="font-semibold text-gray-900 dark:text-white">{(profile.rating || 0).toFixed(1)}</span> ({profile.reviewsCount || 0} reviews)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={18} />
                                        <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6 dark:text-white">Skills Offered</h2>
                    {skills.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {skills.map(skill => (
                                <SkillCard key={skill._id} skill={{ ...skill, ownerId: profile }} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No skills listed yet.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;

export default Profile;
