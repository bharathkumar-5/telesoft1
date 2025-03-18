import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const Dashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("https://telesoftt-1.onrender.com/api/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Book List</h1>
      <div className="books-grid">
        {books.map((book) => (
          <Link key={book._id} to={`/book/${book._id}`} className="book-link">
            <div className="book-card">
              <h2 className="book-title">{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Year:</strong> {book.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;