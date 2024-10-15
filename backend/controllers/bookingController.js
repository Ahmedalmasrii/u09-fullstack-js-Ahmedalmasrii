const Booking = require("../models/Booking");

// Skapar en ny bokning
// const createBooking = async (req, res) => {
//   const { service, date, time, name, email, phone } = req.body;
//   try {
//     const booking = await Booking.create({
//       service,
//       date,
//       time,
//       name,
//       email,
//       phone,
//       user: req.user._id, // Lägger till användar-ID från inloggningen
//     });
//     res.status(201).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const createBooking = async (req, res) => {
  const { service, date, time, name, email, phone, discountCode } = req.body; // Lägg till rabattkoden här
  try {
    const booking = await Booking.create({
      service,
      date,
      time,
      name,
      email,
      phone,
      discountCode, // Spara rabattkoden
      user: req.user._id,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Hämtar alla bokningar för admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// Uppdaterar status på bokning
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Bokning hittades inte" });
    }

    booking.status = req.body.status; // Uppdaterar bokningens status
    await booking.save();

    res.json({ message: "Bokningsstatus uppdaterad", booking });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte uppdatera bokningsstatus" });
  }
};

const updateBookingMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.message = message;
      booking.messageRead = false; // När ett nytt meddelande skickas, markera det som oläst
      await booking.save();
      res.json({ message: "Meddelande uppdaterat" });
    } else {
      res.status(404).json({ message: "Bokning hittades inte" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kunde inte uppdatera meddelandet" });
  }
};

// Hämtar användarens egna bokningar
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      await booking.deleteOne();
      res.json({ message: "Bokning borttagen" });
    } else {
      res.status(404).json({ message: "Bokning hittades inte" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kunde inte ta bort bokning" });
  }
};

// Lägger till funktionen markMessageAsRead
const markMessageAsRead = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      // Kontrollera att bokningen tillhör den inloggade användaren
      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Inte auktoriserad" });
      }

      booking.messageRead = true;
      await booking.save();
      res.json({ message: "Meddelande markerat som läst" });
    } else {
      res.status(404).json({ message: "Bokning hittades inte" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kunde inte markera meddelandet som läst" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
  updateBookingMessage,
  markMessageAsRead, // Se till att denna funktion exporteras
};
