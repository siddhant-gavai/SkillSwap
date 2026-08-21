import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { createSkill } from '../services/skills';

const AddSkill = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Tech',
        level: 'Beginner',
        availability: '',
        description: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSkill(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || err.apiMessage || 'Failed to create skill');
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md transition-colors duration-300">
                <h1 className="text-2xl font-bold mb-6 dark:text-white">List a New Skill</h1>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input
                            label="Skill Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            maxLength="50"
                            placeholder="e.g., Advanced React Patterns"
                            error={formData.title.length >= 50 ? 'Title cannot exceed 50 characters' : ''}
                        />
                        <div className="flex justify-between items-center -mt-3 mb-4">
                            {formData.title.length >= 40 && (
                                <span className={`text-xs ${formData.title.length >= 50 ? 'text-red-500 font-medium' : 'text-yellow-600 dark:text-yellow-500'}`}>
                                    {formData.title.length >= 50 ? 'Maximum title length reached' : 'Approaching character limit'}
                                </span>
                            )}
                            <p className={`text-xs ml-auto ${
                                formData.title.length >= 50 
                                    ? 'text-red-500 font-bold animate-pulse' 
                                    : formData.title.length >= 40 
                                    ? 'text-yellow-600 dark:text-yellow-500 font-semibold' 
                                    : 'text-gray-400'
                            }`}>
                                {formData.title.length}/50
                            </p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 dark:text-white"
                        >
                            <option value="Tech">Tech</option>
                            <option value="Language">Language</option>
                            <option value="Music">Music</option>
                            <option value="Art">Art</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 dark:text-white"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            maxLength="500"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 dark:text-white transition-colors duration-200 ${
                                formData.description.length >= 500
                                    ? 'border-red-500 focus:ring-red-500'
                                    : formData.description.length >= 400
                                    ? 'border-yellow-500 focus:ring-yellow-500'
                                    : 'border-gray-300 dark:border-slate-600'
                            }`}
                            required
                        ></textarea>
                        <div className="flex justify-between items-center mt-1">
                            {formData.description.length >= 400 && (
                                <span className={`text-xs ${formData.description.length >= 500 ? 'text-red-500 font-medium' : 'text-yellow-600 dark:text-yellow-500'}`}>
                                    {formData.description.length >= 500 ? 'Maximum description length reached' : 'Approaching character limit'}
                                </span>
                            )}
                            <p className={`text-xs ml-auto ${
                                formData.description.length >= 500 
                                    ? 'text-red-500 font-bold animate-pulse' 
                                    : formData.description.length >= 400 
                                    ? 'text-yellow-600 dark:text-yellow-500 font-semibold' 
                                    : 'text-gray-400'
                            }`}>
                                {formData.description.length}/500
                            </p>
                        </div>
                    </div>

                    <Input
                        label="Availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Weekends, Evenings"
                    />

                    <div className="flex justify-end space-x-3 mt-6">
                        <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Publish Skill
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddSkill;
