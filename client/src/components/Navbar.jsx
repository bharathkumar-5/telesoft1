import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
        {isLoggedIn && localStorage.getItem("role") === "admin" && (
          <Link to="/add-book">Add Book</Link>
        )}
      </div>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      ) : (
        <Link to="/login" className="login-btn">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;