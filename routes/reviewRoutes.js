const express = require('express');
const router = express.Router();
const { updateReview, deleteReview,createReview } = require('../controllers/reviewController');
const auth = require('../middlewares/authMiddleware');
router.post('/:id', auth, createReview);
router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;
