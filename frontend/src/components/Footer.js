import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            We are a professional cleaning company dedicated to providing
            high-quality cleaning services.
          </p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@cleanmaster.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>
            <a href="https://facebook.com">Facebook</a> |
            <a href="https://twitter.com">Twitter</a> |
            <a href="https://instagram.com">Instagram</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
