import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OffersPage.css";

const offersData = [
  {
    title: "10% Off Moving Help",
    description:
      "Get 10% off on our professional moving help services. We assist with packing, transporting, and moving your furniture, ensuring a smooth and stress-free relocation. Book now and make your move hassle-free with our experienced team.",
    validity: "Valid until: November 15, 2024",
    code: "MOVE10",
    image: "/images/moving-help.jpg",
  },
  {
    title: "10% Off Stairs Cleaning",
    description:
      "Get a 10% discount on our professional stairs cleaning services. Ensure spotless, safe, and presentable stairways for your home or business.",
    validity: "Valid until: December 1, 2024",
    code: "STAIR10",
    image: "/images/stair-cleaning.jpg",
  },
  {
    title: "Free Window Cleaning with Every Package",
    description:
      "Enjoy free window cleaning when you book any of our premium cleaning packages. Get your windows sparkling clean at no extra cost. Limited time offer!",
    validity: "Valid until: November 30, 2024",
    code: "WINDOWFREE",
    image: "/images/window-cleaning.jpg",
  },
];

function OffersPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClaimOffer = (offerCode) => {
    const token = localStorage.getItem("token"); // Kontrollerar om användaren är inloggad
    if (!token) {
      // Om användaren inte är inloggad, visa popup-meddelande
      setMessage(
        "You need to log in or create an account to claim this offer."
      );
      return;
    }

    // Spara rabattkoden i localStorage eller i användarens profil
    localStorage.setItem("discountCode", offerCode);

    // Navigera användaren till bokningssidan
    navigate("/booking");
  };

  return (
    <div className="offers-page">
      <header className="offers-header">
        <h1>Exclusive Offers for You</h1>
        <p>
          Check out the best deals and services designed just for you. Save big
          on our professional cleaning services.
        </p>
      </header>
      {message && <div className="alert">{message}</div>}{" "}
      {/* Popup-meddelande */}
      <div className="offers-grid">
        {offersData.map((offer, index) => (
          <div className="offer-card" key={index}>
            <div className="offer-card-image">
              <img src={offer.image} alt={offer.title} />
            </div>
            <div className="offer-card-content">
              <h2>{offer.title}</h2>
              <p>{offer.description}</p>
              <span className="offer-validity">{offer.validity}</span>
              <button
                className="offer-btn"
                onClick={() => handleClaimOffer(offer.code)}
              >
                Claim Offer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OffersPage;
