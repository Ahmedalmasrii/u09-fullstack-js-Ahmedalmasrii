const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    service: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: "Received" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    discountCode: { type: String }, // rabattkoden här
    message: { type: String, default: '' },
    messageRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
