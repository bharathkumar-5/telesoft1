import React from "react";
import "../styles/BookCard.css"
import { Link } from "react-router-dom";

const BookCard = ({ book }) => (
  <div className="book-card">
    <img src={book.coverImage} alt={book.title} className="book-cover" />
    <h3>{book.title}</h3>
    <p>Author: {book.author}</p>
    <p>Genre: {book.genre}</p>
    <p>Year: {book.year}</p>
    <Link to={`/book/${book._id}`} className="view-details">
      View Details
    </Link>
  </div>
);

export default BookCard;