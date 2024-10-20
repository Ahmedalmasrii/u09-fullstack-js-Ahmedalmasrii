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
  const API_URL = process.env.REACT_APP_API_URL; // Base API URL from environment variables

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Set authorization header
        },
      };

      // Fetch users
      try {
        const { data: usersData } = await axios.get(
          `${API_URL}/api/users`,
          config
        );
        setUsers(usersData);
      } catch (err) {
        setMessage(
          `Error fetching users: ${err.response?.data?.message || err.message}`
        );
      }

      // Fetch bookings
      try {
        const { data: bookingsData } = await axios.get(
          `${API_URL}/api/bookings`,
          config
        );
        setBookings(bookingsData);
      } catch (err) {
        setMessage(
          `Error fetching bookings: ${
            err.response?.data?.message || err.message
          }`
        );
      }

      // Fetch contact messages
      try {
        const { data: contactData } = await axios.get(
          `${API_URL}/api/contact`,
          config
        );
        setContactMessages(contactData);
      } catch (err) {
        setMessage(
          `Error fetching contact messages: ${
            err.response?.data?.message || err.message
          }`
        );
      }
    };

    fetchData();
  }, [API_URL]);

  // Delete a user
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
      setMessage("User removed successfully.");
    } catch (err) {
      setMessage(
        `Error deleting user: ${err.response?.data?.message || err.message}`
      );
    }
  };

  // Update booking status
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

      // Update booking status in state
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );
      setMessage("Booking status updated successfully.");
    } catch (err) {
      setMessage(
        `Error updating booking status: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  // Handle message content change
  const handleMessageChange = (bookingId, value) => {
    setMessageContent({ ...messageContent, [bookingId]: value });
  };

  // Send message to user
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
      setMessage("Message sent successfully.");
    } catch (err) {
      console.error(err);
      setMessage(
        `Error sending message: ${err.response?.data?.message || err.message}`
      );
    }
  };

  // Delete a booking
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
      setMessage("Booking removed successfully.");
    } catch (err) {
      console.error(err);
      setMessage(
        `Error deleting booking: ${err.response?.data?.message || err.message}`
      );
    }
  };

  const handleUnlockUser = async (userId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `${API_URL}/api/users/${userId}/unlock`,
        {},
        config
      );
      setMessage(
        `User account unlocked. Temporary password: ${data.temporaryPassword}`
      );
    } catch (err) {
      setMessage(
        `Error unlocking user: ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <Container className="admin-container mt-5">
      <h1 className="mb-4 text-center">Admin Panel</h1>

      {/* Display success or error messages */}
      {message && (
        <Alert variant="success" onClose={() => setMessage("")} dismissible>
          {message}
        </Alert>
      )}

      {/* User Management Section */}
      <div className="admin-section mb-5">
        <h2>User Management</h2>
        {users.length > 0 ? (
          <Table striped bordered hover responsive className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>
                    <Button
                      onClick={() => handleDeleteUser(user._id)}
                      variant="danger"
                    >
                      Remove
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleUnlockUser(user._id)}
                      variant="warning"
                    >
                      Unlock
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Booking Management Section */}
      <div className="admin-section mb-5">
        <h2>Booking Management</h2>
        {bookings.length > 0 ? (
          <Table striped bordered hover responsive className="admin-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Name</th>
                <th>Status</th>
                <th>Message</th>
                <th>Actions</th>
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
                      <option value="Received">Received</option>
                      <option value="Processed">Processed</option>
                      <option value="Completed">Completed</option>
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
                        placeholder="Write a message"
                      />
                      <Button
                        onClick={() => handleSendMessage(booking._id)}
                        variant="primary"
                        className="mt-2"
                      >
                        Send
                      </Button>
                    </Form.Group>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDeleteBooking(booking._id)}
                      variant="danger"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>

      {/* Contact Messages Section */}
      <div className="admin-section">
        <h2>Contact Messages</h2>
        {contactMessages.length > 0 ? (
          <Table striped bordered hover responsive className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
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
          <p>No contact messages found.</p>
        )}
      </div>
    </Container>
  );
};

export default AdminPage;
