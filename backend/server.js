const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); 

dotenv.config();

const app = express();


app.use(
  cors({
    origin: "http://localhost:3001", // frontend-URL
    credentials: true,
  })
);

app.use(express.json());

// Tillhandahåller 'uploads' mappen så att bilder kan nås av frontend
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoutes = require("./routes/userRoutes");

// Routes
app.use("/api/users", userRoutes);

const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
