const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    service: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: "Mottagen" }, // Standardstatus för bokningar
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
