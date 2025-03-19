const Book = require("../models/Book");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get book details by ID
exports.getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author, genre, year, description } = req.body;

  try {
    console.log("Request files:", req.files); // Log uploaded files

    // Upload cover image to Cloudinary
    let coverImageUrl = "";
    if (req.files?.coverImage) {
      console.log("Uploading cover image...");
      const result = await cloudinary.uploader.upload(req.files.coverImage[0].path);
      coverImageUrl = result.secure_url;
      fs.unlinkSync(req.files.coverImage[0].path); // Delete the temporary file
      console.log("Cover image uploaded:", coverImageUrl);
    }

    // Upload PDF file to Cloudinary
    let pdfFileUrl = "";
    if (req.files?.pdfFile) {
      console.log("Uploading PDF file...");
      const result = await cloudinary.uploader.upload(req.files.pdfFile[0].path, {
        resource_type: "raw", // Specify that this is a raw file (PDF)
      });
      pdfFileUrl = result.secure_url;
      fs.unlinkSync(req.files.pdfFile[0].path); // Delete the temporary file
      console.log("PDF file uploaded:", pdfFileUrl);
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
    console.log("Book saved to database:", newBook);
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Error in addBook:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { title, author, genre, year, description } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Upload new cover image to Cloudinary if provided
    let coverImageUrl = book.coverImage;
    if (req.files?.coverImage) {
      const result = await cloudinary.uploader.upload(req.files.coverImage[0].path);
      coverImageUrl = result.secure_url;
      fs.unlinkSync(req.files.coverImage[0].path); // Delete the temporary file
    }

    // Upload new PDF file to Cloudinary if provided
    let pdfFileUrl = book.pdfFile;
    if (req.files?.pdfFile) {
      const result = await cloudinary.uploader.upload(req.files.pdfFile[0].path, {
        resource_type: "raw", // Specify that this is a raw file (PDF)
      });
      pdfFileUrl = result.secure_url;
      fs.unlinkSync(req.files.pdfFile[0].path); // Delete the temporary file
    }

    // Update book details
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.year = year || book.year;
    book.description = description || book.description;
    book.coverImage = coverImageUrl;
    book.pdfFile = pdfFileUrl;

    await book.save();
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Delete the book using deleteOne() or findByIdAndDelete()
    await Book.deleteOne({ _id: req.params.id }); // Method 1: Using deleteOne()
    // await Book.findByIdAndDelete(req.params.id); // Method 2: Using findByIdAndDelete()

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};