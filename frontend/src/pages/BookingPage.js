import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookingPage.css";

const BookingPage = () => {
  const [service, setService] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const storedDiscountCode = localStorage.getItem("discountCode");
    if (storedDiscountCode) {
      setDiscountCode(storedDiscountCode);
    }
  }, []);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Visa popup för inloggningskrav
      setMessage("Du måste vara inloggad för att kunna göra en bokning.");
      setShowPopup(true);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${API_URL}/api/bookings`,
        {
          service,
          date,
          time,
          name,
          email,
          phone,
          discountCode,
        },
        config
      );
      setMessage("Din bokning har tagits emot! Vi ser fram emot att hjälpa dig.");
      setShowPopup(true);
    } catch (err) {
      setMessage(`Error: ${err.response?.data?.message || err.message}`);
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setService("");
    setDate(new Date());
    setTime("");
    setName("");
    setEmail("");
    setPhone("");
    setDiscountCode("");
    localStorage.removeItem("discountCode");
    setMessage("");
  };

  return (
    <div className="booking-container">
      <h1>Book a Service</h1>
      {discountCode && (
        <div className="discount-code">Discount Applied: {discountCode}</div>
      )}
      <div className="form-group">
        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <Calendar onChange={setDate} value={date} className="form-control" />
      </div>
      <p>Selected Date: {date.toLocaleDateString()}</p>

      <div className="form-group">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control"
        />
      </div>
      <button onClick={handleBooking} className="btn btn-primary">
        Book Now
      </button>
      {message && <div className="success-message">{message}</div>}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{message === "Du måste vara inloggad för att kunna göra en bokning." ? "Inloggning krävs" : "Bokning lyckades!"}</h2>
            <p>{message}</p>
            <button onClick={handlePopupClose} className="btn btn-success">
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
