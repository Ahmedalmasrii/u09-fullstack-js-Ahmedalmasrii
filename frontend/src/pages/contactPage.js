// src/pages/ContactPage.js
import React from 'react';
import './contactPage.css'; // Importera CSS för ContactPage

function ContactPage() {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We would love to hear from you! Please fill out the form below to get in touch.</p>
      </header>
      
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div>
  );
}

export default ContactPage;
