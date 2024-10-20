// src/pages/ContactPage.js
import React, { useState } from "react";
import axios from "axios";
import "./contactPage.css";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to backend
      await axios.post(`${API_URL}/api/contact`, {
        name,
        email,
        subject,
        message: messageContent,
      });

      // Show success popup
      setShowPopup(true);
    } catch (err) {
      console.error("Error sending message:", err);
      // Handle error, possibly show an error message to the user
    }
  };

  // Close popup and reset form fields
  const handleClosePopup = () => {
    setShowPopup(false);
    // Clear input fields
    setName("");
    setEmail("");
    setSubject("");
    setMessageContent("");
  };

  return (
    <div className="contact-page">
      {/* Page Header */}
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We would love to hear from you! Fill out the form below to get in touch.
        </p>
      </header>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Subject Field */}
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Message Field */}
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Thank you for your message!</h2>
            <p>
              We have received your message and will get back to you as soon as possible.
            </p>
            <button
              onClick={handleClosePopup}
              className="close-buttoncontact"
              id="close-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactPage;
