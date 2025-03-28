const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String }, 
    coverImage: { type: String }, 
    pdfFile: { type: String },
});

module.exports = mongoose.model("Book", bookSchema);