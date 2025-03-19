import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import axios from "axios";
import { showToast } from "../components/Toast";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("https://telesoftt-1.onrender.com/api/auth/register", { username, password, role });
      showToast("Registration successful", "success");
      navigate("/login");
    } catch (err) {
      showToast(err,"Registration failed", "error");
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-input"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleRegister} className="submit-btn">
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;