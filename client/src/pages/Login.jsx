import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://telesoftt-1.onrender.com/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <h1 className="page-title">Login</h1>
      <div className="form-container">
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="form-input" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="form-input" />
        <button onClick={handleLogin} className="submit-btn">Login</button>
      </div>
    </div>
  );
};

export default Login;