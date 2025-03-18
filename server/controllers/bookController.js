const Book = require('../models/Book');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get book details by ID
exports.getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new book (with cover image and PDF file)
exports.addBook = async (req, res) => {
  const { title, author, genre, year, description } = req.body;

  try {
    // Upload cover image to Cloudinary
    let coverImageUrl = '';
    if (req.files.coverImage) {
      const result = await cloudinary.uploader.upload(req.files.coverImage[0].path);
      coverImageUrl = result.secure_url; // Get the secure URL of the uploaded image
      fs.unlinkSync(req.files.coverImage[0].path); // Delete the temporary file
    }

    // Upload PDF file to Cloudinary
    let pdfFileUrl = '';
    if (req.files.pdfFile) {
      const result = await cloudinary.uploader.upload(req.files.pdfFile[0].path, {
        resource_type: 'raw', // Specify that this is a raw file (PDF)
      });
      pdfFileUrl = result.secure_url; // Get the secure URL of the uploaded PDF
      fs.unlinkSync(req.files.pdfFile[0].path); // Delete the temporary file
    }

    // Create a new book
    const newBook = new Book({
      title,
      author,
      genre,
      year,
      description,
      coverImage: coverImageUrl,
      pdfFile: pdfFileUrl,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { title, author, genre, year, description } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Upload new cover image to Cloudinary if provided
    if (req.files.coverImage) {
      const result = await cloudinary.uploader.upload(req.files.coverImage[0].path);
      book.coverImage = result.secure_url; // Update the cover image URL
      fs.unlinkSync(req.files.coverImage[0].path); // Delete the temporary file
    }

    // Upload new PDF file to Cloudinary if provided
    if (req.files.pdfFile) {
      const result = await cloudinary.uploader.upload(req.files.pdfFile[0].path, {
        resource_type: 'raw', // Specify that this is a raw file (PDF)
      });
      book.pdfFile = result.secure_url; // Update the PDF file URL
      fs.unlinkSync(req.files.pdfFile[0].path); // Delete the temporary file
    }

    // Update book details
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.year = year || book.year;
    book.description = description || book.description;

    await book.save();
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Delete the cover image from Cloudinary if it exists
    if (book.coverImage) {
      const publicId = book.coverImage.split('/').pop().split('.')[0]; // Extract public ID from URL
      await cloudinary.uploader.destroy(publicId); // Delete the image from Cloudinary
    }

    // Delete the PDF file from Cloudinary if it exists
    if (book.pdfFile) {
      const publicId = book.pdfFile.split('/').pop(); // Extract public ID from URL
      await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' }); // Delete the PDF from Cloudinary
    }

    // Delete the book from the database
    await Book.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};