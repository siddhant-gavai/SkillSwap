const User = require('../models/User');
const Skill = require('../models/Skill');

exports.generateEmbeddings = async (text) => {
    // Call to OpenAI or other model - placeholder
    return [];
};

/**
 * Get customized recommendations based on overlaps in category, title, and description.
 * Calculates match score locally to simulate content-based AI filtering.
 */
exports.getRecommendations = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) return [];

        const { skillsWanted = [] } = user;
        if (skillsWanted.length === 0) {
            // Return latest skills if no preferences set
            return await Skill.find({ ownerId: { $ne: userId } })
                .populate('ownerId', 'name email avatar rating')
                .sort({ createdAt: -1 })
                .limit(5);
        }

        // Get all other users' skills
        const candidateSkills = await Skill.find({ ownerId: { $ne: userId } })
            .populate('ownerId', 'name email avatar rating');

        // Score candidates based on intersection with skillsWanted
        const scoredSkills = candidateSkills.map(skill => {
            let score = 0;
            const targetText = `${skill.title} ${skill.description} ${skill.category}`.toLowerCase();
            
            skillsWanted.forEach(wanted => {
                const term = wanted.toLowerCase().trim();
                if (!term) return;
                
                // Exact word match has higher weight, partial match has lower weight
                const regexExact = new RegExp(`\\b${term}\\b`, 'i');
                if (regexExact.test(targetText)) {
                    score += 3;
                } else if (targetText.includes(term)) {
                    score += 1;
                }
            });

            return { skill, score };
        });

        // Filter candidates with score > 0, sort by score descending, and limit to 5
        const recommendations = scoredSkills
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(item => item.skill)
            .slice(0, 5);

        // Fallback to recent skills if no matches
        if (recommendations.length === 0) {
            return await Skill.find({ ownerId: { $ne: userId } })
                .populate('ownerId', 'name email avatar rating')
                .sort({ createdAt: -1 })
                .limit(5);
        }

        return recommendations;
    } catch (error) {
        console.error('Error calculating local recommendations:', error);
        return [];
    }
};
