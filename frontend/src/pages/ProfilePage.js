import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";
import { useAuth } from "../components/AuthContext";

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [bookingsWithUnreadMessages, setBookingsWithUnreadMessages] = useState(
    []
  );
  const [allMessages, setAllMessages] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Fetch user profile
        const { data: userData } = await axios.get(
          `${API_URL}/api/users/profile`,
          config
        );
        setUser(userData);
        setEditName(userData.name);
        setProfileImage(userData.profileImage);
      } catch (err) {
        setMessage(
          `Error fetching data: ${err.response?.data?.message || err.message}`
        );
      }
    };

    const fetchUserBookings = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Fetch user bookings
        const { data: bookingsData } = await axios.get(
          `${API_URL}/api/bookings/mybookings`,
          config
        );
        setBookings(bookingsData);

        // Find bookings with unread messages
        const unreadMessages = bookingsData.filter(
          (booking) => booking.message && !booking.messageRead
        );
        setBookingsWithUnreadMessages(unreadMessages);

        // Fetch all messages
        const messages = bookingsData.filter((booking) => booking.message);
        setAllMessages(messages);
      } catch (err) {
        setMessage(
          `Error fetching bookings: ${
            err.response?.data?.message || err.message
          }`
        );
      }
    };

    fetchUserProfile();
    fetchUserBookings();
  }, [API_URL]);

  // Handle name change
  const handleNameChange = async () => {
    if (!editName) return;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      // Update user name
      const { data } = await axios.put(
        `${API_URL}/api/users/profile/name`,
        { name: editName },
        config
      );
      setUser({ ...user, name: data.name });
      setMessage("Name updated successfully!");
    } catch (err) {
      setMessage(
        `Error updating name: ${err.response?.data?.message || err.message}`
      );
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (editPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      // Update user password
      await axios.put(
        `${API_URL}/api/users/profile/password`,
        { password: editPassword },
        config
      );
      setMessage("Password updated successfully!");
      setEditPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(
        `Error updating password: ${err.response?.data?.message || err.message}`
      );
    }
  };

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      // Upload profile image
      const { data } = await axios.put(
        `${API_URL}/api/users/profile/image`,
        formData,
        config
      );
      setProfileImage(data.imageUrl);
      setMessage("Profile image updated successfully!");
    } catch (err) {
      setMessage(
        `Error uploading image: ${err.response?.data?.message || err.message}`
      );
    }
  };

  // Mark message as read
  const markMessageAsRead = async (bookingId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Mark message as read
      await axios.put(
        `${API_URL}/api/bookings/${bookingId}/markAsRead`,
        {},
        config
      );
      // Update state
      setBookingsWithUnreadMessages(
        bookingsWithUnreadMessages.filter(
          (booking) => booking._id !== bookingId
        )
      );
      setAllMessages(
        allMessages.map((booking) =>
          booking._id === bookingId
            ? { ...booking, messageRead: true }
            : booking
        )
      );
    } catch (err) {
      console.error("Could not mark message as read:", err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      {/* Welcome message */}
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>

      {/* Profile image and upload */}
      <div className="profile-image">
        <img
          src={
            profileImage ? `${API_URL}${profileImage}` : "default-image-url.png"
          }
          alt="Profile"
        />
        <input type="file" onChange={handleImageUpload} />
      </div>

      {/* Profile information */}
      <div className="profile-info">
        {/* Change Name Section */}
        <div className="profile-section">
          <h2>Change Name</h2>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button onClick={handleNameChange}>Save Name</button>
        </div>

        {/* Change Password Section */}
        <div className="profile-section">
          <h2>Change Password</h2>
          <input
            type="password"
            placeholder="New Password"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>Change Password</button>
        </div>
      </div>

      {/* Notification for new messages */}
      {bookingsWithUnreadMessages.length > 0 && (
        <div className="notification">
          <h2>You have new messages!</h2>
          {bookingsWithUnreadMessages.map((booking) => (
            <div key={booking._id} className="message">
              <p>
                <strong>From admin:</strong> {booking.message}
              </p>
              <button
                className="lastknapp"
                onClick={() => markMessageAsRead(booking._id)}
              >
                Mark as Read
              </button>
            </div>
          ))}
        </div>
      )}

      {/* All Messages Section */}
      <div className="messages-section">
        <h2>Messages</h2>
        {allMessages.length > 0 ? (
          allMessages.map((booking) => (
            <div
              key={booking._id}
              className={`message ${booking.messageRead ? "read" : "unread"}`}
            >
              <p>
                <strong>Booking:</strong> {booking.service}
              </p>
              <p>
                <strong>Message:</strong> {booking.message}
              </p>
              {!booking.messageRead && (
                <button
                  className="lastknapp"
                  onClick={() => markMessageAsRead(booking._id)}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No messages.</p>
        )}
      </div>

      {/* Bookings Section */}
      <div className="bookings-section">
        <h2>My Bookings</h2>
        {bookings.length > 0 ? (
          <ul className="bookings-list">
            {bookings.map((booking) => (
              <li key={booking._id}>
                {booking.service} -{" "}
                {new Date(booking.date).toLocaleDateString()} at {booking.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>

      {/* Success message */}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default ProfilePage;
