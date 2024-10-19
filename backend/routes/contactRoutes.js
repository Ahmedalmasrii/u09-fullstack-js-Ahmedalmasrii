// routes/contactRoutes.js
const { protect, admin } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

// Importera din ContactMessage-modell
const ContactMessage = require('../models/contactModel');

// Importera middleware för autentisering och admin-kontroll
const { protect, admin } = require('../middleware/authMiddleware');


router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    await contactMessage.save();

    res.status(201).json({ message: 'Meddelande mottaget' });
  })
);


router.get(
  '/',
  protect, // Middleware för autentisering
  admin,   // Middleware för att kontrollera om användaren är admin
  asyncHandler(async (req, res) => {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  })
);

module.exports = router;
