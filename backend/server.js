// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const { protect } = require('./middlewares/authMiddleware');
// const userRoutes = require('./routes/userRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');

// // routes
// app.use('/api/users', userRoutes);
// app.use('/api/bookings', protect, bookingRoutes);
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// server.js (Backend Configuration)





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3001', // frontend-URL
  credentials: true,
}));

app.use(express.json());

const userRoutes = require('./routes/userRoutes');

// Routes
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
