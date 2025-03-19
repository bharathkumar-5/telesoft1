import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css"
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import SkeletonLoader from "../components/SkeletonLoader";
import { showToast } from "../components/Toast";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://telesoftt-1.onrender.com/api/books");
        setBooks(res.data);
      } catch (err) {
        showToast("Error fetching books", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterGenre ? book.genre === filterGenre : true) &&
      (filterYear ? book.year.toString() === filterYear : true)
    );
  });

  return (
    <div className="dashboard-container">
      <h1>Book List</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Magical Realism">Magical Realism</option>
          <option value="Adventure">Adventure</option>
          <option value="Satire">Satire</option>
          <option value="Realist Fiction">Realist Fiction</option>
          <option value="Historical Fiction">Historical Fiction</option>
          <option value="Gothic Fiction">Gothic Fiction</option>
          <option value="Philosophical Fiction">Philosophical Fiction</option>
          <option value="Epic Poetry">Epic Poetry</option>
          <option value="Romance">Romance</option>
          <option value="Dystopian Fiction">Dystopian Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Classic Literature">Classic Literature</option>
          <option value="Coming-of-Age Fiction">Coming-of-Age Fiction</option>
          
        </select>
        <input
          type="number"
          placeholder="Filter by year"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        />
      </div>
      <div className="books-grid">
        {loading
          ? Array(6)
              .fill()
              .map((_, index) => <SkeletonLoader key={index} />)
          : filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
      </div>
    </div>
  );
};

export default Dashboard;