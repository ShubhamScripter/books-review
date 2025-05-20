const express = require('express');
const router = express.Router();
const { createBook, getBooks, getBookById,searchBooks } = require('../controllers/bookController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createBook);
router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);


module.exports = router;
