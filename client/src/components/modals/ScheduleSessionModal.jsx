import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { X } from 'lucide-react';
import GlowingEffect from '../ui/GlowingEffect';

const ScheduleSessionModal = ({ isOpen, onClose, request, onSchedule }) => {
    const [formData, setFormData] = useState({
        scheduledDate: '',
        scheduledTime: '',
        duration: 60,
        meetingLink: '',
        sessionNote: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen || !request) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await onSchedule(request._id, formData);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to schedule session');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden transform transition-all">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                />

                <div className="relative z-10 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold dark:text-white">Schedule Session</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
                        Schedule a learning session for <strong className="text-blue-600 dark:text-blue-400">{request.skillId.title}</strong>
                    </p>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Date</label>
                                <Input
                                    type="date"
                                    name="scheduledDate"
                                    value={formData.scheduledDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all bg-slate-800 text-white border-slate-600 placeholder:text-slate-400 focus:ring-indigo-500 focus:border-indigo-500 caret-white [color-scheme:dark]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Time</label>
                                <Input
                                    type="time"
                                    name="scheduledTime"
                                    value={formData.scheduledTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all bg-slate-800 text-white border-slate-600 placeholder:text-slate-400 focus:ring-indigo-500 focus:border-indigo-500 caret-white [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Duration (minutes)</label>
                            <select
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full h-11 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all bg-slate-800 text-white border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 caret-white appearance-none"
                            >
                                <option value={15}>15 minutes</option>
                                <option value={30}>30 minutes</option>
                                <option value={45}>45 minutes</option>
                                <option value={60}>60 minutes</option>
                                <option value={90}>90 minutes</option>
                                <option value={120}>2 hours</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Meeting Link</label>
                            <Input
                                type="url"
                                name="meetingLink"
                                value={formData.meetingLink}
                                onChange={handleChange}
                                placeholder="Paste meeting link here..."
                                className="w-full h-11 mb-3 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all bg-slate-800 text-white border-slate-600 placeholder:text-slate-400 focus:ring-indigo-500 focus:border-indigo-500 caret-white"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => window.open('https://meet.google.com/new', '_blank')}
                                    className="w-full py-2.5 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600"
                                >
                                    Start Meeting Now
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => window.open('https://calendar.google.com/calendar/r/eventedit', '_blank')}
                                    className="w-full py-2.5 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600"
                                >
                                    Schedule in Calendar
                                </Button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Note (Optional)</label>
                            <textarea
                                name="sessionNote"
                                value={formData.sessionNote}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all bg-slate-800 text-white border-slate-600 placeholder:text-slate-400 focus:ring-indigo-500 focus:border-indigo-500 caret-white resize-none"
                                placeholder="Topics to cover..."
                            ></textarea>
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                                className="w-full py-3 text-base font-semibold shadow-lg hover:shadow-blue-500/25 transition-all"
                            >
                                {loading ? 'Scheduling Session...' : 'Confirm Schedule'}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onClose}
                                className="w-full py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border-none shadow-none"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ScheduleSessionModal;
