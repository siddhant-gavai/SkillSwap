const Skill = require('../models/Skill');
const User = require('../models/User');
const { ApiResponse, asyncHandler } = require('../utils/apiResponse');

// @desc    Get AI recommendations
// @route   POST /api/ai/recommend
// @access  Private
exports.getRecommendations = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    
    if (!user) {
        return res.status(404).json(new ApiResponse(404, [], "User not found"));
    }

    const { skillsWanted } = user;

    let query = {
        ownerId: { $ne: req.user.id }
    };

    // If the user has specific skills wanted, filter skills by matching category or title/description
    if (skillsWanted && skillsWanted.length > 0) {
        const regexQueries = skillsWanted.map(skill => new RegExp(skill.trim(), 'i'));
        query.$or = [
            { category: { $in: regexQueries } },
            { title: { $in: regexQueries } },
            { description: { $in: regexQueries } }
        ];
    }

    // Limit to 5 recommendations
    const recommendations = await Skill.find(query)
        .populate('ownerId', 'name email avatar rating')
        .limit(5);

    // If no matching recommendations found, get most popular/recent skills (excluding user's own skills)
    if (recommendations.length === 0) {
        const fallbacks = await Skill.find({ ownerId: { $ne: req.user.id } })
            .populate('ownerId', 'name email avatar rating')
            .sort({ createdAt: -1 })
            .limit(5);
        return res.status(200).json(new ApiResponse(200, fallbacks, "Recent skills recommended"));
    }

    res.status(200).json(new ApiResponse(200, recommendations, "AI recommendations fetched successfully"));
});
