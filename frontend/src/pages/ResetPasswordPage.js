
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";


const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth(); // Auth-context för att hämta inloggad användare
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Skicka nytt lösenord till servern
      await axios.put(`${API_URL}/api/users/profile/password`, { password: newPassword }, config);

      setMessage("Password updated successfully! Redirecting...");
      setTimeout(() => navigate("/profile"), 2000); // Omdirigera till profil
    } catch (err) {
      setMessage(`Error updating password: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Your Password</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? <div className="loading-spinner"></div> : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
