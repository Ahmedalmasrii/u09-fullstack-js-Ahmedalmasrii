const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// CORS-konfiguration för att hantera flera domäner, inklusive Netlify och Render
const allowedOrigins = [
  "https://cleanmaster12.netlify.app",
  "https://u09-fullstack-js-ahmedalmasrii.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Tillåt endast förfrågningar från de tillåtna domänerna
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Krävs för cookies, auth headers
  })
);

app.use(express.json());

// Tillhandahåller 'uploads' mappen så att bilder kan nås av frontend
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  console.log("Request Headers:", req.headers);
  next();
});
