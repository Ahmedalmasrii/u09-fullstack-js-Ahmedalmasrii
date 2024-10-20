import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css"; // Importera CSS-filen för styling

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Ny state för framgångsmeddelande
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Rensar eventuella tidigare felmeddelanden
    setSuccess(""); // Rensar eventuella tidigare framgångsmeddelanden

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/register`,
        { name, email, password }
      );
      console.log("User registered:", response.data);

      // Sätt ett framgångsmeddelande
      setSuccess("Registration successful! Redirecting to login...");

      // Omdirigera till inloggningssidan efter 3 sekunder
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Create an Account</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {/* Visa felmeddelande om registrering misslyckas */}
        {error && <p className="error-message">{error}</p>}

        {/* Visa framgångsmeddelande om registrering lyckas */}
        {success && <p className="success-message">{success}</p>}

        <div className="register-footer">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
