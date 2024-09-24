// const express = require("express");
// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   getAllUsers,
//   deleteUser,
//   getUserProfile,
//   updateUserName, // Lägg till denna rad
//   updatePassword, // Lägg till denna rad
//   updateProfileImage // Lägg till denna rad
// } = require("../controllers/userController");
// const { protect, admin } = require("../middlewares/authMiddleware");

// // Register route
// router.post("/register", registerUser);

// // Login route
// router.post("/login", loginUser);

// // Admin routes - only accessible by admin
// router.get("/", protect, admin, getAllUsers);
// router.delete("/:id", protect, admin, deleteUser);


// router.get("/profile", protect, getUserProfile); // Ny Route för User Profile



// module.exports = router;

// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUserProfile,
  updateUserName,
  updatePassword,
  updateProfileImage,
} = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');
const multer = require('multer');

// Multer-konfiguration för filuppladdning
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Admin routes - only accessible by admin
router.get('/', protect, admin, getAllUsers);
router.delete('/:id', protect, admin, deleteUser);

// User profile route
router.get('/profile', protect, getUserProfile);

// Uppdatera användarnamn
router.put('/profile/name', protect, updateUserName);

// Uppdatera lösenord
router.put('/profile/password', protect, updatePassword);

// Ladda upp profilbild
router.put('/profile/image', protect, upload.single('image'), updateProfileImage);

module.exports = router;
