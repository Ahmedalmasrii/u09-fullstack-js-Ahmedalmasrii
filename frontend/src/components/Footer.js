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
          <p>
            Email:{" "}
            <a href="mailto:info@cleanmaster.com">info@cleanmaster.com</a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890">+123 456 7890</a>
          </p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="social-icon"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="social-icon"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="social-icon"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Clean Master | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
