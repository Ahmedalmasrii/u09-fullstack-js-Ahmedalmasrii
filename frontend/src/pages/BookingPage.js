// import React, { useState } from 'react';
// import axios from 'axios';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './BookingPage.css';

// const BookingPage = () => {
//   const [service, setService] = useState('');
//   const [date, setDate] = useState(new Date()); // Standarddatum är dagens datum
//   const [time, setTime] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [message, setMessage] = useState('');

//   const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

//   const handleBooking = async () => {
//     const token = localStorage.getItem('token');
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     try {
//       const { data } = await axios.post(`${API_URL}/api/bookings`, {
//         service,
//         date,
//         time,
//         name,
//         email,
//         phone,
//       }, config);
//       setMessage('Bokningen har mottagits! Vi ser fram emot att hjälpa dig.');
//     } catch (err) {
//       setMessage(`Fel: ${err.response?.data?.message || err.message}`);
//     }
//   };

//   return (
//     <div className="booking-container">
//       <h1>Boka en Tjänst</h1>
//       <div className="form-group">
//         <input
//           type="text"
//           placeholder="Tjänst"
//           value={service}
//           onChange={(e) => setService(e.target.value)}
//           className="form-control"
//         />
//       </div>
//       <div className="form-group">
//         <Calendar
//           onChange={setDate}
//           value={date}
//           className="form-control"
//         />
//       </div>
//       <p>Valt datum: {date.toLocaleDateString()}</p> {/* Visar valt datum */}

//       <div className="form-group">
//         <input
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           className="form-control"
//         />
//       </div>
//       <div className="form-group">
//         <input
//           type="text"
//           placeholder="Namn"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="form-control"
//         />
//       </div>
//       <div className="form-group">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="form-control"
//         />
//       </div>
//       <div className="form-group">
//         <input
//           type="tel"
//           placeholder="Telefonnummer"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="form-control"
//         />
//       </div>
//       <button onClick={handleBooking} className="btn btn-primary">
//         Boka Nu
//       </button>
//       {message && <div className="success-message">{message}</div>}
//     </div>
//   );
// };

// export default BookingPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingPage.css';

const BookingPage = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // Hanterar popup-öppning
  const [discountCode, setDiscountCode] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

  useEffect(() => {
    const storedDiscountCode = localStorage.getItem('discountCode');
    if (storedDiscountCode) {
      setDiscountCode(storedDiscountCode);
    }
  }, []);

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(`${API_URL}/api/bookings`, {
        service,
        date,
        time,
        name,
        email,
        phone,
        discountCode, // Skicka med rabattkoden
      }, config);
      setMessage('Your booking has been received! We look forward to serving you.');
      setShowPopup(true); // Visa popup vid lyckad bokning
    } catch (err) {
      setMessage(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  // Hanterar stängning av popup och rensar formuläret
  const handlePopupClose = () => {
    setShowPopup(false);
    setService('');
    setDate(new Date());
    setTime('');
    setName('');
    setEmail('');
    setPhone('');
    setDiscountCode('');
    localStorage.removeItem('discountCode');
    setMessage('');
  };

  return (
    <div className="booking-container">
      <h1>Book a Service</h1>
      {discountCode && <div className="discount-code">Discount Applied: {discountCode}</div>}
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
        <Calendar
          onChange={setDate}
          value={date}
          className="form-control"
        />
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
            <h2>Booking Successful!</h2>
            <p>Your booking has been successfully registered. We look forward to serving you.</p>
            <button onClick={handlePopupClose} className="btn btn-success">Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
