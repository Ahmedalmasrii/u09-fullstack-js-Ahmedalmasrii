import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  useEffect(() => {
    // Hämta användare
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data: usersData } = await axios.get(`${API_URL}/api/users`, config);
        setUsers(usersData);
      } catch (err) {
        setMessage(`Fel vid hämtning av användare: ${err.response?.data?.message || err.message}`);
      }
    };

    // Hämta bokningar
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data: bookingsData } = await axios.get(`${API_URL}/api/bookings`, config);
        setBookings(bookingsData);
      } catch (err) {
        setMessage(`Fel vid hämtning av bokningar: ${err.response?.data?.message || err.message}`);
      }
    };

    fetchUsers();
    fetchBookings();
  }, [API_URL]);

  // Ta bort en användare
  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`${API_URL}/api/users/${userId}`, config);
      setUsers(users.filter((user) => user._id !== userId));
      setMessage('Användare borttagen');
    } catch (err) {
      setMessage(`Fel vid borttagning av användare: ${err.response?.data?.message || err.message}`);
    }
  };

  // Ändra status på en bokning
  const handleUpdateBookingStatus = async (bookingId, status) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.put(
        `${API_URL}/api/bookings/${bookingId}/status`,
        { status },
        config
      );
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );
      setMessage('Bokningsstatus uppdaterad');
    } catch (err) {
      setMessage(`Fel vid uppdatering av bokningsstatus: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="admin-container">
      <h1>Adminpanelen</h1>

      <div className="admin-section">
        <h2>Användarhantering</h2>
        {users.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Namn</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Ja' : 'Nej'}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user._id)} className="btn btn-danger">Ta bort</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Inga användare hittades.</p>
        )}
      </div>

      <div className="admin-section">
        <h2>Bokningshantering</h2>
        {bookings.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tjänst</th>
                <th>Datum</th>
                <th>Tid</th>
                <th>Namn</th>
                <th>Status</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.service}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.time}</td>
                  <td>{booking.name}</td>
                  <td>{booking.status}</td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                      className="form-control"
                    >
                      <option value="Mottagen">Mottagen</option>
                      <option value="Behandlad">Behandlad</option>
                      <option value="Slutförd">Slutförd</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Inga bokningar hittades.</p>
        )}
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminPage;
