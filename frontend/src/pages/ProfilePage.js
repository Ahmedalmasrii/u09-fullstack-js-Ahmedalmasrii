import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Hämtar användarens profil
        const { data: userData } = await axios.get('http://localhost:3000/api/users/profile', config);
        setUser(userData);

        // Hämtar användarens bokningar
        const { data: bookingsData } = await axios.get('http://localhost:3000/api/bookings', config);
        setBookings(bookingsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>

      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              {booking.service} - {booking.date} - {booking.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;
