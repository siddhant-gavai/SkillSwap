import React from 'react';
import { Link } from 'react-router-dom';
import { Star, User } from 'lucide-react';

const SkillCard = ({ skill }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">{skill.category}</span>
                    <span className="text-xs text-gray-500">{skill.level}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{skill.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{skill.description}</p>

                <div className="flex items-center mt-auto pt-4 border-t border-gray-50">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-3">
                        {skill.ownerId?.avatar ? (
                            <img src={skill.ownerId.avatar} alt={skill.ownerId.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <User size={16} />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{skill.ownerId?.name || 'Unknown User'}</p>
                        <div className="flex items-center text-xs text-yellow-500">
                            <Star size={12} fill="currentColor" className="mr-1" />
                            <span>{skill.ownerId?.rating?.toFixed(1) || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Link to={`/skills/${skill._id}`} className="block bg-gray-50 hover:bg-indigo-50 text-indigo-600 text-center py-3 font-medium text-sm transition border-t border-gray-100">
                View Details
            </Link>
        </div>
    );
};

export default SkillCard;
