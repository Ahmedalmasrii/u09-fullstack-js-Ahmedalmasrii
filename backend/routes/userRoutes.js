const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Admin routes - only accessible by admin
router.get("/", protect, admin, getAllUsers);
router.delete("/:id", protect, admin, deleteUser);

router.get("/profile", protect, getUserProfile); // Ny Route för User Profile

module.exports = router;
