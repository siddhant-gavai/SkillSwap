const Review = require('../models/Review');
const User = require('../models/User');

exports.createReview = async (req, res) => {
    try {
        const { receiverId, rating, comment } = req.body;

        if (receiverId === req.user.id) {
            return res.status(400).json({ message: 'Cannot review yourself' });
        }

        const review = await Review.create({
            reviewerId: req.user.id,
            receiverId,
            rating,
            comment
        });

        // Update user rating
        // Fetch all reviews for receiver
        const reviews = await Review.find({ receiverId });
        const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await User.findByIdAndUpdate(receiverId, {
            rating: avgRating,
            reviewsCount: reviews.length
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ receiverId: req.params.userId })
            .populate('reviewerId', 'name avatar');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
