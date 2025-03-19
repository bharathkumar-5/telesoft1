import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import axios from "axios";
import { showToast } from "../components/Toast";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://telesoftt-1.onrender.com/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      showToast("Login successful", "success");
      navigate("/dashboard");
    } catch (err) {
      showToast("Invalid credentials", "error");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
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
        <button onClick={handleLogin} className="submit-btn">
          Login
        </button>
        <p>
          Not a user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;