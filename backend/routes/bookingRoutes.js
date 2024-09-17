const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Booking = require("../models/Booking"); 
// Route för att hämta användarens bokningar
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

module.exports = router;
