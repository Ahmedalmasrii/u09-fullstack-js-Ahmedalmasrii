import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";
import { Container, Table, Button, Form, Alert } from "react-bootstrap";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageContent, setMessageContent] = useState({});
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Hämta användare
      try {
        const { data: usersData } = await axios.get(
          `${API_URL}/api/users`,
          config
        );
        setUsers(usersData);
      } catch (err) {
        setMessage(
          `Fel vid hämtning av användare: ${
            err.response?.data?.message || err.message
          }`
        );
      }

      // Hämta bokningar
      try {
        const { data: bookingsData } = await axios.get(
          `${API_URL}/api/bookings`,
          config
        );
        setBookings(bookingsData);
      } catch (err) {
        setMessage(
          `Fel vid hämtning av bokningar: ${
            err.response?.data?.message || err.message
          }`
        );
      }

      // Hämta kontaktmeddelanden
      try {
        const { data: contactData } = await axios.get(
          `${API_URL}/api/contact`,
          config
        );
        setContactMessages(contactData);
      } catch (err) {
        setMessage(
          `Fel vid hämtning av kontaktmeddelanden: ${
            err.response?.data?.message || err.message
          }`
        );
      }
    };

    fetchData();
  }, [API_URL]);

  // Ta bort en användare
  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`${API_URL}/api/users/${userId}`, config);
      setUsers(users.filter((user) => user._id !== userId));
      setMessage("Användare borttagen");
    } catch (err) {
      setMessage(
        `Fel vid borttagning av användare: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  // Ändra status på en bokning
  const handleUpdateBookingStatus = async (bookingId, status) => {
    const token = localStorage.getItem("token");
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
      setMessage("Bokningsstatus uppdaterad");
    } catch (err) {
      setMessage(
        `Fel vid uppdatering av bokningsstatus: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  // Hantera ändring i meddelandefältet
  const handleMessageChange = (bookingId, value) => {
    setMessageContent({ ...messageContent, [bookingId]: value });
  };

  // Skicka meddelande till användaren
  const handleSendMessage = async (bookingId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `${API_URL}/api/bookings/${bookingId}/message`,
        { message: messageContent[bookingId] },
        config
      );
      setMessage("Meddelande skickat");
    } catch (err) {
      console.error(err);
      setMessage(
        `Fel vid skickande av meddelande: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  // Ta bort en bokning
  const handleDeleteBooking = async (bookingId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`${API_URL}/api/bookings/${bookingId}`, config);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      setMessage("Bokning borttagen");
    } catch (err) {
      console.error(err);
      setMessage(
        `Fel vid borttagning av bokning: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  return (
    <Container className="admin-container mt-5">
      <h1 className="mb-4 text-center">Adminpanelen</h1>

      {message && (
        <Alert variant="success" onClose={() => setMessage("")} dismissible>
          {message}
        </Alert>
      )}

      {/* Användarhantering */}
      <div className="admin-section mb-5">
        <h2>Användarhantering</h2>
        {users.length > 0 ? (
          <Table striped bordered hover responsive className="admin-table">
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
                  <td>{user.isAdmin ? "Ja" : "Nej"}</td>
                  <td>
                    <Button
                      onClick={() => handleDeleteUser(user._id)}
                      variant="danger"
                    >
                      Ta bort
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Inga användare hittades.</p>
        )}
      </div>

      {/* Bokningshantering */}
      <div className="admin-section mb-5">
        <h2>Bokningshantering</h2>
        {bookings.length > 0 ? (
          <Table striped bordered hover responsive className="admin-table">
            <thead>
              <tr>
                <th>Tjänst</th>
                <th>Datum</th>
                <th>Tid</th>
                <th>Namn</th>
                <th>Status</th>
                <th>Meddelande</th>
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
                  <td>
                    <Form.Control
                      as="select"
                      value={booking.status}
                      onChange={(e) =>
                        handleUpdateBookingStatus(booking._id, e.target.value)
                      }
                    >
                      <option value="Mottagen">Mottagen</option>
                      <option value="Behandlad">Behandlad</option>
                      <option value="Slutförd">Slutförd</option>
                    </Form.Control>
                  </td>
                  <td>
                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={messageContent[booking._id] || ""}
                        onChange={(e) =>
                          handleMessageChange(booking._id, e.target.value)
                        }
                        placeholder="Skriv ett meddelande"
                      />
                      <Button
                        onClick={() => handleSendMessage(booking._id)}
                        variant="primary"
                        className="mt-2"
                      >
                        Skicka
                      </Button>
                    </Form.Group>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDeleteBooking(booking._id)}
                      variant="danger"
                    >
                      Ta bort
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Inga bokningar hittades.</p>
        )}
      </div>

      {/* Kontaktmeddelanden */}
      <div className="admin-section">
        <h2>Kontaktmeddelanden</h2>
        {contactMessages.length > 0 ? (
          <Table striped bordered hover responsive className="admin-table">
            <thead>
              <tr>
                <th>Namn</th>
                <th>E-post</th>
                <th>Ämne</th>
                <th>Meddelande</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {contactMessages.map((msg) => (
                <tr key={msg._id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject}</td>
                  <td>{msg.message}</td>
                  <td>{new Date(msg.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Inga kontaktmeddelanden hittades.</p>
        )}
      </div>
    </Container>
  );
};

export default AdminPage;
