const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

//  ContactMessage-modell
const ContactMessage = require("../models/contactModel");

//  middleware för autentisering och admin-kontroll
const { protect, admin } = require("../middlewares/authMiddleware");

// POST-route för att skicka kontaktmeddelande
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    await contactMessage.save();

    res.status(201).json({ message: "Meddelande mottaget" });
  })
);

// GET-route för att hämta alla kontaktmeddelanden (Endast för admin)
router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  })
);

module.exports = router;
