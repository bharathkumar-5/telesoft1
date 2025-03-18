import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post("https://telesoftt-1.onrender.com/api/books", { title, author, genre, year }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/dashboard");
    } catch (error) {
      alert("Error adding book");
    }
  };

  return (
    <div className="add-book-container">
      <h1 className="page-title">Add New Book</h1>
      <div className="form-container">
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} className="form-input" />
        <input type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} className="form-input" />
        <input type="text" placeholder="Genre" onChange={(e) => setGenre(e.target.value)} className="form-input" />
        <input type="number" placeholder="Year" onChange={(e) => setYear(e.target.value)} className="form-input" />
        <button onClick={handleSubmit} className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default AddBook;