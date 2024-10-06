const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Rutter för bokningar
router.post("/", protect, createBooking); // Skapar en ny bokning
router.get("/mybookings", protect, getUserBookings); // Hämtar användarens bokningar
router.get("/", protect, admin, getAllBookings); // Hämtar alla bokningar för admin
router.put("/:id/status", protect, admin, updateBookingStatus); // Uppdaterar bokningsstatus

module.exports = router;
