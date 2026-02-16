const ExchangeRequest = require('../models/ExchangeRequest');
const Skill = require('../models/Skill'); // Ensure Skill model is imported for validation
const { ApiResponse, ApiError, asyncHandler } = require('../utils/apiResponse');

// @desc    Send exchange request
// @route   POST /api/requests
// @access  Private
exports.sendRequest = asyncHandler(async (req, res) => {
    const { skillId, message } = req.body;

    if (!skillId || !message) {
        throw new ApiError(400, 'Please provide skillId and message');
    }

    const skill = await Skill.findById(skillId);
    if (!skill) {
        throw new ApiError(404, 'Skill not found');
    }

    if (skill.ownerId.toString() === req.user.id) {
        throw new ApiError(400, 'Cannot request your own skill');
    }

    const request = await ExchangeRequest.create({
        requesterId: req.user.id,
        skillId,
        message
    });

    res.status(201).json(new ApiResponse(201, request, "Request sent successfully"));
});

// @desc    Get requests sent by user
// @route   GET /api/requests/sent
// @access  Private
exports.getSentRequests = asyncHandler(async (req, res) => {
    const requests = await ExchangeRequest.find({ requesterId: req.user.id })
        .populate('skillId', 'title category')
        .populate({
            path: 'skillId',
            populate: { path: 'ownerId', select: 'name' }
        });

    res.status(200).json(new ApiResponse(200, requests, "Sent requests fetched successfully"));
});

// @desc    Get requests received for user's skills
// @route   GET /api/requests/received
// @access  Private
exports.getReceivedRequests = asyncHandler(async (req, res) => {
    // Find requests where the skill belongs to the user
    // First find all skills owned by user
    const userSkills = await Skill.find({ ownerId: req.user.id }).select('_id');
    const skillIds = userSkills.map(skill => skill._id);

    const requests = await ExchangeRequest.find({ skillId: { $in: skillIds } })
        .populate('requesterId', 'name email')
        .populate('skillId', 'title');

    res.status(200).json(new ApiResponse(200, requests, "Received requests fetched successfully"));
});

// @desc    Update request status
// @route   PUT /api/requests/:id
// @access  Private
exports.updateRequestStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const request = await ExchangeRequest.findById(req.params.id).populate('skillId');

    if (!request) {
        throw new ApiError(404, 'Request not found');
    }

    // Verify ownership: Only the skill owner can accept/reject
    // But requester can cancel? For now, let's implement Accept/Reject by owner
    if (request.skillId.ownerId.toString() !== req.user.id) {
        throw new ApiError(401, 'Not authorized to update this request');
    }

    request.status = status;
    await request.save();

    res.status(200).json(new ApiResponse(200, request, "Request status updated successfully"));
});

// @desc    Schedule a learning session
// @route   PUT /api/requests/:id/schedule
// @access  Private
exports.scheduleSession = asyncHandler(async (req, res) => {
    const { scheduledDate, scheduledTime, duration, meetingLink, sessionNote } = req.body;
    let request = await ExchangeRequest.findById(req.params.id)
        .populate('skillId')
        .populate('requesterId', 'name email');

    if (!request) {
        throw new ApiError(404, 'Request not found');
    }

    if (request.status !== 'ACCEPTED') {
        throw new ApiError(400, 'Cannot schedule session for unaccepted request');
    }

    // Verify ownership: requester OR skill owner can schedule
    const isRequester = request.requesterId._id.toString() === req.user.id;
    const isOwner = request.skillId.ownerId.toString() === req.user.id;

    if (!isRequester && !isOwner) {
        throw new ApiError(401, 'Not authorized to schedule this session');
    }

    // Update request with schedule details
    request.scheduledDate = scheduledDate;
    request.scheduledTime = scheduledTime;
    request.duration = duration;
    request.meetingLink = meetingLink;
    request.sessionNote = sessionNote;
    request.isScheduled = true;

    await request.save();

    res.status(200).json(new ApiResponse(200, request, "Session scheduled successfully"));
});
