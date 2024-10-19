import React from "react";
import "./homePage.css";
import "../components/Navbar.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate(); // För att navigera mellan sidor

  const handleBookNowClick = () => {
    navigate("/booking"); // Omdirigerar användaren till bokningssidan
  };

  return (
    <div className="homepage">
      <header className="header">
        <div>
          <img
            src="/images/Cleaning-banner.jpg"
            alt="Cleaning Service Background"
          />
        </div>
        <div className="header-content">
          <h1>Welcome to Clean Master</h1>
          <p>Your trusted partner for all your cleaning needs</p>
          <button className="cta-button" onClick={handleBookNowClick}>
            Book now
          </button>
        </div>
      </header>
      <main className="main-content">
        <section className="about-us">
          <h2>About Our Services</h2>
          <p>
            At Clean Master, we provide top-notch cleaning services to ensure
            your home or office is spotless. Our team of professionals is
            dedicated to delivering exceptional results.
          </p>
        </section>

        <section className="services">
          <h2>Our Services</h2>
          <div className="service-list">
            <div className="service-item">
              <h3>Residential Cleaning</h3>
              <p>
                We offer comprehensive cleaning services for your home,
                including deep cleaning, regular cleaning, and move-in/move-out
                services.
              </p>
            </div>
            <div className="service-item">
              <h3>Commercial Cleaning</h3>
              <p>
                Our commercial cleaning services ensure a clean and healthy
                environment for your office or workplace.
              </p>
            </div>
            <div className="service-item">
              <h3>Specialized Cleaning</h3>
              <p>
                We provide specialized cleaning services, such as carpet
                cleaning, window cleaning, and more.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
