const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
  updateBookingMessage,
  markMessageAsRead,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Rutter för bokningar
router.post("/", protect, createBooking); // Skapar en ny bokning
router.get("/mybookings", protect, getUserBookings); // Hämtar användarens bokningar
router.get("/", protect, admin, getAllBookings); // Hämtar alla bokningar för admin
router.put("/:id/status", protect, admin, updateBookingStatus); // Uppdaterar bokningsstatus
router.delete("/:id", protect, admin, deleteBooking);
router.put("/:id/message", protect, admin, updateBookingMessage); // Route för att uppdatera meddelandet
router.put("/:id/markAsRead", protect, markMessageAsRead); // Route för att markera meddelande som läst

module.exports = router;
