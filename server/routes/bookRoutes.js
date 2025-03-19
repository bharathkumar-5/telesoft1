const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const { getBooks, addBook, getBookDetails, updateBook, deleteBook } = require("../controllers/bookController");
const upload = require("../utils/upload");

const router = express.Router();

// Public routes
router.get("/", getBooks);
router.get("/:id", getBookDetails);

// Protected routes (admin only)
router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.fields([
    { name: "coverImage", maxCount: 1 }, // Handle cover image
    { name: "pdfFile", maxCount: 1 }, // Handle PDF file
  ]),
  addBook
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  upload.fields([
    { name: "coverImage", maxCount: 1 }, // Handle cover image
    { name: "pdfFile", maxCount: 1 }, // Handle PDF file
  ]),
  updateBook
);

router.delete("/:id", authenticate, authorize("admin"), deleteBook);

module.exports = router;