import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import AuthContext from '../context/AuthContext';
import SkillCard from '../components/SkillCard';
import { User, Star, MapPin, Calendar } from 'lucide-react';

const Profile = () => {
    const { id } = useParams();
    const { user: currentUser } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const [userRes, skillsRes] = await Promise.all([
                    axios.get(`/auth/users/${id}`), // Need to implement this route in backend or use a public profile route
                    axios.get(`/skills?ownerId=${id}`)
                ]);
                setProfile(userRes.data);
                setSkills(skillsRes.data);
            } catch (error) {
                console.error("Error fetching profile", error);
            } finally {
                setLoading(false);
            }
        };
        // Wait, I don't have a public profile route '/auth/users/:id' yet.
        // I have '/auth/me' but that's for logged in user.
        // I need to add a public user fetch endpoint.
        // For now I'll skip fetching profile if it's not me, or I'll add the route.
        // Actually, let's add the route.

        if (id) fetchProfile();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!profile) return <div>User not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-4xl font-bold">
                    {profile.name.charAt(0)}
                </div>
                <div className="flex-grow text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                    <p className="text-gray-600 mt-2 max-w-lg">{profile.bio || "No bio yet."}</p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Star className="text-yellow-400" size={18} />
                            <span className="font-semibold text-gray-900">{profile.rating.toFixed(1)}</span> ({profile.reviewsCount} reviews)
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Skills Offered</h2>
                {skills.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skills.map(skill => (
                            <SkillCard key={skill._id} skill={{ ...skill, ownerId: profile }} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No skills listed yet.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
