const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    try {
        const { id: bookId } = req.params;
        console.log("user is:",req.user.userId);
        const existing = await Review.findOne({ book: bookId, user: req.user.userId });
        if (existing) return res.status(400).json({ message: 'Review already exists' });
        const review = new Review({
            book: bookId,
            user: req.user.userId,
            ...req.body
        });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        console.log("update review called");
        
        const review = await Review.findOne({ _id: req.params.id, user: req.user.userId });
        if (!review) return res.status(404).json({ message: 'Review not found' });

        review.set(req.body);
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
