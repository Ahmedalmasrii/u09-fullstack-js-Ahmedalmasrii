// src/pages/HomePage.js
import React, { useState } from "react";
import "./homePage.css";
import "../components/Navbar.css";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaBroom,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

function HomePage() {
  const navigate = useNavigate(); // För att navigera mellan sidor

  const handleBookNowClick = () => {
    navigate("/booking"); // Omdirigerar användaren till bokningssidan
  };

  // FAQ toggle state
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div>
          <img
            src="/images/Cleaning-banner.jpg"
            alt="Cleaning Service Background"
            className="header-image"
          />
        </div>
        <div className="header-content">
          <h1>Welcome to Clean Master</h1>
          <p>Your trusted partner for all your cleaning needs</p>
          <button className="cta-button" onClick={handleBookNowClick}>
            Book Now
          </button>
        </div>
      </header>

      {/* About Us Section */}
      <main className="main-content">
        <section className="about-us">
          <h2>About Our Services</h2>
          <p>
            At Clean Master, we provide top-notch cleaning services to ensure
            your home or office is spotless. Our team of professionals is
            dedicated to delivering exceptional results with attention to detail
            and a commitment to customer satisfaction.
          </p>
        </section>

        {/* Our Services Section */}
        <section className="services">
          <h2>Our Services</h2>
          <div className="service-list">
            <div className="service-item">
              <FaHome className="service-icon" />
              <h3>Residential Cleaning</h3>
              <p>
                Comprehensive cleaning services for your home, including deep
                cleaning, regular maintenance, and move-in/move-out services.
              </p>
            </div>
            <div className="service-item">
              <FaBuilding className="service-icon" />
              <h3>Commercial Cleaning</h3>
              <p>
                Ensuring a clean and healthy environment for your office or
                workplace with our reliable commercial cleaning solutions.
              </p>
            </div>
            <div className="service-item">
              <FaBroom className="service-icon" />
              <h3>Specialized Cleaning</h3>
              <p>
                Specialized services such as carpet cleaning, window cleaning,
                and more to meet your specific cleaning needs.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <h2>What Our Customers Say</h2>
          <div className="testimonial-list">
            <div className="testimonial-item">
              <p>
                "Clean Master transformed my home! The team was professional and
                thorough. Highly recommend their services."
              </p>
              <h4>- Anna S.</h4>
            </div>
            <div className="testimonial-item">
              <p>
                "Excellent service for our office cleaning needs. Reliable and
                detail-oriented."
              </p>
              <h4>- Johan L.</h4>
            </div>
            <div className="testimonial-item">
              <p>
                "Their specialized cleaning services are top-notch. My carpets
                have never looked better!"
              </p>
              <h4>- Maria K.</h4>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="gallery">
          <h2>Our Work</h2>
          <div className="gallery-container">
            <div className="gallery-list">
              <img
                src="/images/Cleaning-work.jpg"
                alt="Cleaning Work 1"
                className="gallery-image"
              />
              <img
                src="/images/Cleaning-work2.jpg"
                alt="Cleaning Work 2"
                className="gallery-image"
              />
              <img
                src="/images/Cleaning-work3.jpg"
                alt="Cleaning Work 3"
                className="gallery-image"
              />
              <img
                src="/images/Cleaning-work4.jpg"
                alt="Cleaning Work 4"
                className="gallery-image"
              />
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="team">
          <h2>Meet Our Team</h2>
          <div className="team-list">
            <div className="team-member">
              <img
                src="/images/team1.jpg"
                alt="Team Member 1"
                className="team-image"
              />
              <h4>Lisa M.</h4>
              <p>Senior Cleaner</p>
            </div>
            <div className="team-member">
              <img
                src="/images/team2.jpg"
                alt="Team Member 2"
                className="team-image"
              />
              <h4>Peter B.</h4>
              <p>Commercial Specialist</p>
            </div>
            <div className="team-member">
              <img
                src="/images/team3.jpg"
                alt="Team Member 3"
                className="team-image"
              />
              <h4>Emma T.</h4>
              <p>Customer Service Manager</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className={`faq-item ${activeFaq === 0 ? "active" : ""}`}>
              <h4 onClick={() => toggleFaq(0)}>How can I book a service?</h4>
              <p>
                You can book a service by clicking the "Book Now" button on our
                homepage and filling out the booking form.
              </p>
            </div>
            <div className={`faq-item ${activeFaq === 1 ? "active" : ""}`}>
              <h4 onClick={() => toggleFaq(1)}>What areas do you serve?</h4>
              <p>
                We provide cleaning services across the entire city and its
                surrounding areas. Contact us for specific locations.
              </p>
            </div>
            <div className={`faq-item ${activeFaq === 2 ? "active" : ""}`}>
              <h4 onClick={() => toggleFaq(2)}>
                Do you provide all cleaning supplies?
              </h4>
              <p>
                Yes, we bring all necessary cleaning supplies and equipment to
                ensure the job is done efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="contact-us">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <h4>Phone</h4>
              <p>+46 123 456 789</p>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <h4>Email</h4>
              <p>info@cleanmaster.se</p>
            </div>
            <div className="contact-item">
              <FaHome className="contact-icon" />
              <h4>Address</h4>
              <p>Storgatan 1, 123 45 Stockholm</p>
            </div>
          </div>
          <button className="cta-button" onClick={handleBookNowClick}>
            Book Now
          </button>
        </section>
      </main>

      {/* Footer Section */}
      <footer>
        <p>
          &copy; {new Date().getFullYear()} Clean Master. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
