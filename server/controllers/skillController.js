const Skill = require('../models/Skill');
const { ApiResponse, ApiError, asyncHandler } = require('../utils/apiResponse');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = asyncHandler(async (req, res) => {
    const skills = await Skill.find().populate('ownerId', 'name email');
    res.status(200).json(new ApiResponse(200, skills, "Skills fetched successfully"));
});

// @desc    Get a single skill
// @route   GET /api/skills/:id
// @access  Public
exports.getSkill = asyncHandler(async (req, res) => {
    const skill = await Skill.findById(req.params.id).populate('ownerId', 'name email');

    if (!skill) {
        throw new ApiError(404, 'Skill not found');
    }

    res.status(200).json(new ApiResponse(200, skill, "Skill fetched successfully"));
});

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
exports.createSkill = asyncHandler(async (req, res) => {
    const { title, description, category, level, availability } = req.body;

    if (!title || !description || !category || !level || !availability) {
        throw new ApiError(400, 'Please add all required fields');
    }

    const skill = await Skill.create({
        title,
        description,
        category,
        level,
        availability,
        ownerId: req.user.id
    });

    res.status(201).json(new ApiResponse(201, skill, "Skill created successfully"));
});

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
exports.updateSkill = asyncHandler(async (req, res) => {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
        throw new ApiError(404, 'Skill not found');
    }

    // Check for user
    if (!req.user) {
        throw new ApiError(401, 'User not found');
    }

    // Make sure the logged in user matches the skill owner
    if (skill.ownerId.toString() !== req.user.id) {
        throw new ApiError(401, 'User not authorized');
    }

    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(new ApiResponse(200, updatedSkill, "Skill updated successfully"));
});

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
exports.deleteSkill = asyncHandler(async (req, res) => {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
        throw new ApiError(404, 'Skill not found');
    }

    // Check for user
    if (!req.user) {
        throw new ApiError(401, 'User not found');
    }

    // Make sure the logged in user matches the skill owner
    if (skill.ownerId.toString() !== req.user.id) {
        throw new ApiError(401, 'User not authorized');
    }

    await skill.deleteOne();

    res.status(200).json(new ApiResponse(200, { id: req.params.id }, "Skill deleted successfully"));
});

// @desc    Get user skills
// @route   GET /api/skills/my
// @access  Private
exports.getMySkills = asyncHandler(async (req, res) => {
    const skills = await Skill.find({ ownerId: req.user.id });
    res.status(200).json(new ApiResponse(200, skills, "User skills fetched successfully"));
});
