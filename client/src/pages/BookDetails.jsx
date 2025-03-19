import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/BookDetails.css"
import { showToast } from "../components/Toast";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`https://telesoftt-1.onrender.com/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        showToast(err,"Error fetching book details", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-details-container">
      <h1>{book.title}</h1>
      <img src={book.coverImage} alt={book.title} className="book-cover" />
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