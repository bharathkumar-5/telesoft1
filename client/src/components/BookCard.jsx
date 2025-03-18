import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const BookCard = ({ book }) => (
  <div className="book-card">
    <h2>{book.title}</h2>
    <p>Author: {book.author}</p>
    <p>Genre: {book.genre}</p>
    <p>Year: {book.year}</p>
    <Link to={`/book/${book._id}`} className="view-details">View Details</Link>
  </div>
);

export default BookCard;