import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        {localStorage.getItem("role") === "admin" && (
          <Link to="/add-book">Add Book</Link>
        )}
      </div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </nav>
  );
};

export default Navbar;