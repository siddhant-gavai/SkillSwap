const mongoose = require('mongoose');

const exchangeRequestSchema = new mongoose.Schema({
    requesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true
    },
    message: {
        type: String,
        required: [true, 'Please add a message'],
        maxlength: 500
    },
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    },
    date: {
        type: Date,
        default: Date.now
    },
    scheduledDate: {
        type: Date
    },
    scheduledTime: {
        type: String
    },
    duration: {
        type: Number, // in minutes
        min: 15,
        max: 180
    },
    meetingLink: {
        type: String,
        match: [
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            'Please provide a valid URL'
        ]
    },
    sessionNote: {
        type: String,
        maxlength: 200
    },
    isScheduled: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ExchangeRequest', exchangeRequestSchema);
