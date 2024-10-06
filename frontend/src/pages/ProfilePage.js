import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]); // Hanterar bokningar
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data: userData } = await axios.get(
          `${API_URL}/api/users/profile`,
          config
        );
        setUser(userData);
        setEditName(userData.name);
        setProfileImage(userData.profileImage); // Hämtar användarens profilbild
      } catch (err) {
        setMessage(
          `Fel vid hämtning av data: ${
            err.response?.data?.message || err.message
          }`
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
        const { data: bookingsData } = await axios.get(
          `${API_URL}/api/bookings/mybookings`,
          config
        );
        setBookings(bookingsData); // Sparar användarens bokningar
      } catch (err) {
        setMessage(
          `Fel vid hämtning av bokningar: ${
            err.response?.data?.message || err.message
          }`
        );
      }
    };

    fetchUserProfile();
    fetchUserBookings();
  }, [API_URL]);

  // Hanterar namnändring
  const handleNameChange = async () => {
    if (!editName) return;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${API_URL}/api/users/profile/name`,
        { name: editName },
        config
      );
      setUser({ ...user, name: data.name });
      setMessage("Namn uppdaterat!");
    } catch (err) {
      setMessage(
        `Fel vid uppdatering av namn: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  // Hanterar lösenordsändring
  const handlePasswordChange = async () => {
    if (editPassword !== confirmPassword) {
      setMessage("Lösenorden matchar inte!");
      return;
    }
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.put(
        `${API_URL}/api/users/profile/password`,
        { password: editPassword },
        config
      );
      setMessage("Lösenord uppdaterat!");
      setEditPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(
        `Fel vid uppdatering av lösenord: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  // Hanterar bilduppladdning
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
      const { data } = await axios.put(
        `${API_URL}/api/users/profile/image`,
        formData,
        config
      );
      setProfileImage(data.imageUrl); // Uppdaterar profilbildens URL
      setMessage("Profilbild uppdaterad!");
    } catch (err) {
      setMessage(
        `Fel vid uppladdning av bild: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  if (!user) return <div>Laddar...</div>;

  return (
    <div className="profile-container">
      <h1>Välkommen, {user.name}</h1>
      <p>Email: {user.email}</p>

      <div className="profile-image">
        <img
          src={
            profileImage ? `${API_URL}${profileImage}` : "default-image-url.png"
          }
          alt="Profil"
        />
        <input type="file" onChange={handleImageUpload} />
      </div>

      <div className="profile-info">
        <div className="profile-section">
          <h2>Ändra namn</h2>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button onClick={handleNameChange}>Spara namn</button>
        </div>

        <div className="profile-section">
          <h2>Byt lösenord</h2>
          <input
            type="password"
            placeholder="Nytt lösenord"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Bekräfta lösenord"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>Byt lösenord</button>
        </div>
      </div>

      {/* Bokningssektion där man kan se sina bokningar  */}
      <div className="bookings-section">
        <h2>Mina bokningar</h2>
        {bookings.length > 0 ? (
          <ul className="bookings-list">
            {bookings.map((booking) => (
              <li key={booking._id}>
                {booking.service} -{" "}
                {new Date(booking.date).toLocaleDateString()} kl {booking.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>Inga bokningar hittades.</p>
        )}
      </div>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default ProfilePage;
