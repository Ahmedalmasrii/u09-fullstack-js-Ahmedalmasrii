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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        {
          email,
          password,
        }
      );
      console.log("User logged in:", response.data);

      login(response.data); // Ändrad här: skickar hela användarobjektet
      setIsLoggedIn(true);
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Ange din email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              id="password"
              placeholder="Ange ditt lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="loading-spinner"></div> : "Login"}
          </button>
        </form>
        {isLoggedIn && (
          <>
            <p className="success-message">Inloggning lyckades! 🎉💃</p>
            <div className="firework-container">
              <div className="firework"></div>
              <div className="firework"></div>
              <div className="firework"></div>
            </div>
          </>
        )}
        {error && <p className="error-message">{error}</p>}
        <div className="login-footer">
          Har du inget konto?{" "}
          <Link to="/register" className="register-link">
            Registrera här
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
