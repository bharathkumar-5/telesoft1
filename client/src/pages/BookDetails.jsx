import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`https://telesoftt-1.onrender.com/api/books/${id}`).then((res) => setBook(res.data));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details-container">
      <h1 className="page-title">{book.title}</h1>
      <div className="book-info">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Year:</strong> {book.year}</p>
        <p><strong>Description:</strong> {book.description}</p>
      </div>
    </div>
  );
};

export default BookDetails;