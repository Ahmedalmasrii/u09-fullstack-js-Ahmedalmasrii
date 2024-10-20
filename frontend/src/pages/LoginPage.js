// src/pages/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const API_URL = process.env.REACT_APP_API_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
      });
  
      console.log("User logged in:", response.data);
  
      // Kolla om användaren har ett temporärt lösenord
      if (response.data.temporaryPassword) {
        setError("You are using a temporary password. Please reset your password.");
        setTimeout(() => navigate("/reset-password"), 2000); // Omdirigera till lösenordsbytes-sidan
      } else {
        login(response.data); // Skicka hela användarobjektet
        setIsLoggedIn(true);
        setTimeout(() => navigate("/profile"), 2000); // Omdirigera efter 2 sekunder
      }
  
    } catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Login Title */}
        <h1 className="login-title">Welcome Back</h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="loading-spinner"></div> : "Login"}
          </button>
        </form>

        {/* Success Message and Firework Animation */}
        {isLoggedIn && (
          <>
            <p className="success-message">Login successful! 🎉💃</p>
            <div className="firework-container">
              <div className="firework"></div>
              <div className="firework"></div>
              <div className="firework"></div>
            </div>
          </>
        )}

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Footer with Register Link */}
        <div className="login-footer">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
