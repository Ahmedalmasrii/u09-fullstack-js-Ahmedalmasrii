// src/pages/ContactPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './contactPage.css';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Skicka data till backend
      await axios.post(`${API_URL}/api/contact`, {
        name,
        email,
        subject,
        message: messageContent,
      });

      // Visa popup
      setShowPopup(true);
    } catch (err) {
      console.error('Fel vid skickande av meddelande:', err);
      // Hantera fel, visa eventuellt ett felmeddelande till användaren
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Töm input-fälten
    setName('');
    setEmail('');
    setSubject('');
    setMessageContent('');
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Kontakta oss</h1>
        <p>Vi skulle gärna vilja höra från dig! Fyll i formuläret nedan för att komma i kontakt.</p>
      </header>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Namn</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-post</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Ämne</label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Meddelande</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Skicka meddelande</button>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Tack för ditt meddelande!</h2>
            <p>Vi har mottagit ditt meddelande och återkommer till dig så snart som möjligt.</p>
            <button onClick={handleClosePopup} className="close-button">Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactPage;
