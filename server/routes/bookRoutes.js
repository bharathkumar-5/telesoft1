const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { getBooks, addBook, getBookDetails, updateBook, deleteBook } = require('../controllers/bookController');
const upload = require('../utils/upload');

const router = express.Router();

// Public routes
router.get('/', getBooks); // Get all books
router.get('/:id', getBookDetails); // Get book details by ID

// Protected routes (admin only)
router.post(
  '/',
  authenticate,
  authorize('admin'),
  upload.fields([
    { name: 'coverImage', maxCount: 1 }, // For cover image
    { name: 'pdfFile', maxCount: 1 }, // For PDF file
  ]),
  addBook
); // Add a new book

router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  upload.fields([
    { name: 'coverImage', maxCount: 1 }, // For cover image
    { name: 'pdfFile', maxCount: 1 }, // For PDF file
  ]),
  updateBook
); // Update a book

router.delete('/:id', authenticate, authorize('admin'), deleteBook); // Delete a book

module.exports = router;