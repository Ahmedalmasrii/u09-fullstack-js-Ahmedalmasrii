import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate för att omdirigera
  const { login } = useAuth(); // synka login-funktionen från AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password }
      );
      console.log("User logged in:", response.data);

      // login-funktionen från AuthContext istället för att spara direkt i localStorage
      login(response.data.token);

      // Omdirigera användaren till profilsidan vid en lyckad inloggning
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;
