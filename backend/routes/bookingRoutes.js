
const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, getUserBookings } = require('../controllers/bookingController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/', protect, createBooking);  // Skapar en ny bokning
router.get('/mybookings', protect, getUserBookings);  // Hämtar användarens bokningar
router.get('/', protect, admin, getAllBookings);  // Hämtar alla bokningar för admin

module.exports = router;
