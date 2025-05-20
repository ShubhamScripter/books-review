const Book = require('../models/Book');
const Review = require('../models/Review');

// exports.createBook = async (req, res) => {
//     try {
//         const book = new Book(req.body);
//         await book.save();
//         res.status(201).json(book);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getBooks = async (req, res) => {
//     try {
//         const { author, genre, page = 1, limit = 10 } = req.query;
//         const filter = {};
//         if (author) filter.author = new RegExp(author, 'i');
//         if (genre) filter.genre = new RegExp(genre, 'i');

//         const books = await Book.find(filter)
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit));
//         res.json(books);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getBookById = async (req, res) => {
//     try {
//         const book = await Book.findById(req.params.id);
//         if (!book) return res.status(404).json({ message: 'Book not found' });

//         const reviews = await Review.find({ book: book._id });
//         const avgRating =
//             reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);
//         res.json({ ...book._doc, avgRating, reviews });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.searchBooks = async (req, res) => {
//   try {
//     const { query } = req.query;
//     const regex = new RegExp(query, 'i'); // case-insensitive

//     const books = await Book.find({
//       $or: [{ title: regex }, { author: regex }]
//     });

//     res.status(200).json({ books });
//   } catch (err) {
//     res.status(500).json({ error: 'Search failed' });
//   }
// };



exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;

    if (!title || !author || !genre) {
      return res.status(400).json({ error: 'Title, author, and genre are required.' });
    }

    const book = new Book({ title, author, genre, description });
    await book.save();
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating book' });
  }
};

// ✅ Get all books with filters & pagination
exports.getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const total = await Book.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

// ✅ Get book by ID (with avg rating and reviews)
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ book: book._id });

    const avgRating =
      reviews.length > 0
        ? parseFloat(
            (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
          )
        : null;

    res.json({ book, avgRating, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get book details' });
  }
};

// ✅ Search books by title or author (case-insensitive, partial match)
exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Search query is required' });

    const regex = new RegExp(query, 'i');

    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }],
    });

    res.status(200).json({ total: books.length, books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
};
