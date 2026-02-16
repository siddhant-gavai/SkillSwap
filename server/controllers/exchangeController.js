const ExchangeRequest = require('../models/ExchangeRequest');
const Skill = require('../models/Skill');

exports.createRequest = async (req, res) => {
    try {
        const { skillId, message } = req.body;

        const skill = await Skill.findById(skillId);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        if (skill.ownerId.toString() === req.user.id) {
            return res.status(400).json({ message: 'Cannot request your own skill' });
        }

        const request = await ExchangeRequest.create({
            requesterId: req.user.id,
            skillId,
            message
        });

        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMyRequests = async (req, res) => {
    try {
        const requests = await ExchangeRequest.find({ requesterId: req.user.id })
            .populate('skillId')
            .populate({
                path: 'skillId',
                populate: { path: 'ownerId', select: 'name email' }
            });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRequestsForMe = async (req, res) => {
    try {
        // Find skills owned by user
        const skills = await Skill.find({ ownerId: req.user.id });
        const skillIds = skills.map(skill => skill._id);

        const requests = await ExchangeRequest.find({ skillId: { $in: skillIds } })
            .populate('requesterId', 'name email')
            .populate('skillId');

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await ExchangeRequest.findById(req.params.id)
            .populate('skillId');

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Check if user is owner of skill (for accept/reject) or requester (for complete? maybe both)
        // Only owner can accept/reject.
        // Completed can be set by either? Or owner? Let's say owner for now.

        // If I am the owner of the skill
        if (request.skillId.ownerId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        request.status = status;
        await request.save();

        res.status(200).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
