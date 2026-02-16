const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a skill title'],
        trim: true,
        maxlength: [50, 'Title can not be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: [
            'Tech',
            'Language',
            'Music',
            'Art',
            'Fitness',
            'Cooking',
            'Other'
        ]
    },
    level: {
        type: String,
        required: [true, 'Please select a level'],
        enum: ['Beginner', 'Intermediate', 'Expert']
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    availability: {
        type: String,
        required: [true, 'Please add availability']
    },
    embedding: {
        type: [Number],
        select: false
    }
}, {
    timestamps: true
});

// Index for search performance
skillSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Skill', skillSchema);
