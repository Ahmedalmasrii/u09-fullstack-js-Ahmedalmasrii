import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const token = localStorage.getItem("token"); // Se till att token hämtas korrekt

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Inkludera token i headers
          "Content-Type": "application/json",
        },
      };

      await axios.put(
        `${API_URL}/api/users/profile/password`,
        { password: newPassword },
        config
      );

      setSuccess("Password updated successfully!");
      setTimeout(() => navigate("/login"), 2000); // Omdirigera till inloggningssidan
    } catch (err) {
      setError(
        `Error updating password: ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Your Password</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
