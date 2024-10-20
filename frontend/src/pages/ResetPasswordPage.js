import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // Hämtar token från localStorage när komponenten laddas
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kontrollera om token finns
    if (!token) {
      setError("Unauthorized. No token available.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Skickar JWT token
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.put(
        `${API_URL}/api/users/profile/password`,
        { password: newPassword },
        config
      );
      setMessage("Password updated successfully");
      setError("");
      setTimeout(() => navigate("/profile"), 2000); // Omdirigerar till profil efter lösenordsändring
    } catch (error) {
      setError(
        `Error updating password: ${error.response?.status || error.message}`
      );
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Your Password</h1>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="reset-button">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
